import { EmailTemplate } from "@/components/EmailTemplate";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Resend } from "resend";
import { Webhook } from "svix";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || "";
const resend = new Resend(process.env.RESEND_API_KEY || "");

// Types for payment events
interface PaymentAttemptData {
  status: string;
  payer: {
    email: string;
    user_id: string;
    first_name?: string;
    last_name?: string;
  };
  payment_id: string;
  subscription_items: unknown[];
  totals: {
    grand_total: unknown;
  };
  paid_at: number | null;
  failed_at: number | null;
  failed_reason: string | null;
}

interface PaymentWebhookEvent {
  type: "paymentAttempt.updated";
  data: PaymentAttemptData;
  timestamp?: number;
  instance_id?: string;
}

type ClerkWebhookEvent = WebhookEvent | PaymentWebhookEvent;

// Security: Rate limiting map to prevent abuse
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const MAX_REQUESTS = 100; // Max requests per IP per window
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute window

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const clientData = rateLimitMap.get(ip);

  if (!clientData) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (now > clientData.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (clientData.count >= MAX_REQUESTS) {
    return false;
  }

  clientData.count++;
  return true;
}

async function validateRequest(request: Request): Promise<ClerkWebhookEvent> {
  const payloadString = await request.text();
  const headerPayload = await headers();

  // Security: Validate required headers exist
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    throw new Error("Missing required webhook headers");
  }

  // Security: Validate timestamp to prevent replay attacks
  const timestamp = parseInt(svixTimestamp);
  const now = Math.floor(Date.now() / 1000);
  const tolerance = 300; // 5 minutes tolerance

  if (Math.abs(now - timestamp) > tolerance) {
    throw new Error("Webhook timestamp too old");
  }

  const svixHeaders = {
    "svix-id": svixId,
    "svix-timestamp": svixTimestamp,
    "svix-signature": svixSignature,
  };

  const wh = new Webhook(webhookSecret);
  return wh.verify(payloadString, svixHeaders) as ClerkWebhookEvent;
}

function isPaymentAttemptEvent(
  payload: ClerkWebhookEvent,
): payload is PaymentWebhookEvent {
  return (
    payload.type === "paymentAttempt.updated" &&
    "data" in payload &&
    payload.data &&
    typeof payload.data === "object" &&
    "payer" in payload.data &&
    "status" in payload.data
  );
}

export async function POST(request: Request) {
  const startTime = Date.now();
  const headerPayload = await headers();
  const clientIp =
    headerPayload.get("x-forwarded-for") ||
    headerPayload.get("x-real-ip") ||
    "unknown";

  // Security: Rate limiting
  if (!checkRateLimit(clientIp)) {
    console.warn(`[SECURITY] Rate limit exceeded for IP: ${clientIp}`);
    return Response.json({ message: "Rate limit exceeded" }, { status: 429 });
  }

  console.log(`[WEBHOOK] Incoming request from IP: ${clientIp}`);

  try {
    // Security: Validate webhook secret exists
    if (!webhookSecret) {
      console.error("[SECURITY] CLERK_WEBHOOK_SECRET not configured");
      return Response.json(
        { message: "Server configuration error" },
        { status: 500 },
      );
    }

    // Validate and parse the webhook payload
    const payload = await validateRequest(request);

    console.log(`[WEBHOOK] Event type: ${payload.type}`);
    if ("timestamp" in payload && payload.timestamp) {
      console.log(`[WEBHOOK] Event timestamp: ${payload.timestamp}`);
    }
    if ("instance_id" in payload && payload.instance_id) {
      console.log(`[WEBHOOK] Instance ID: ${payload.instance_id}`);
    }

    // Handle subscription payment events
    if (isPaymentAttemptEvent(payload)) {
      const { data } = payload;

      console.log(`[PAYMENT] Payment attempt status: ${data.status}`);
      console.log(`[PAYMENT] Payment ID: ${data.payment_id}`);
      console.log(`[PAYMENT] User ID: ${data.payer.user_id}`);

      // Check if payment was successful
      if (data.status === "paid" && data.paid_at && !data.failed_at) {
        console.log(
          `[PAYMENT] ✅ Payment successful for user: ${data.payer.user_id}`,
        );
        console.log(`[PAYMENT] 📧 Customer email: ${data.payer.email}`);
        console.log(
          `[PAYMENT] 💰 Payment completed at: ${new Date(data.paid_at).toISOString()}`,
        );

        // Additional payment details
        if (data.payer.first_name || data.payer.last_name) {
          console.log(
            `[PAYMENT] 👤 Customer name: ${data.payer.first_name || ""} ${data.payer.last_name || ""}`.trim(),
          );
        }

        if (data.totals?.grand_total) {
          console.log(
            `[PAYMENT] 💵 Total amount: ${JSON.stringify(data.totals.grand_total)}`,
          );
        }

        if (data.subscription_items?.length > 0) {
          console.log(
            `[PAYMENT] 📋 Subscription items: ${data.subscription_items.length} item(s)`,
          );
        }

        const user = await (
          await clerkClient()
        ).users.getUser(data.payer.user_id);

        if (user.privateMetadata.agreed_to_bubu_ai_terms_of_service) {
          console.log(`[PAYMENT] 🔒 User already agreed to terms of service`);
        } else {
          console.log(`[PAYMENT] 🔒 User has not agreed to terms of service`);
          await (
            await clerkClient()
          ).users.updateUserMetadata(data.payer.user_id, {
            privateMetadata: {
              ...user.privateMetadata, // Preserve existing metadata
              agreed_to_bubu_ai_terms_of_service: true,
            },
          });
          const { data: emailData, error } = await resend.emails.send({
            from: "Bubu AI <info@bubuaimealplanner.com>",
            to: [data.payer.email],
            subject: "Welcome to Bubu AI",
            react: EmailTemplate({
              name: `${data.payer.first_name || ""} ${data.payer.last_name || ""}`.trim(),
            }),
          });

          if (error) {
            console.error(`[PAYMENT] ❌ Error sending email: ${error}`);
          } else {
            console.log(`[PAYMENT] ✅ Email sent successfully: ${emailData}`);
          }
        }
      } else if (data.status === "failed" && data.failed_at) {
        console.warn(
          `[PAYMENT] ❌ Payment failed for user: ${data.payer.user_id}`,
        );
        console.warn(`[PAYMENT] 📧 Customer email: ${data.payer.email}`);
        console.warn(
          `[PAYMENT] 💔 Failed at: ${new Date(data.failed_at).toISOString()}`,
        );

        if (data.failed_reason) {
          console.warn(`[PAYMENT] 🔍 Failure reason: ${data.failed_reason}`);
        }
      } else {
        console.log(
          `[PAYMENT] ⏳ Payment in progress - Status: ${data.status}`,
        );
      }
    } else {
      console.log(`[WEBHOOK] Unhandled event type: ${payload.type}`);
    }

    const processingTime = Date.now() - startTime;
    console.log(
      `[WEBHOOK] ✅ Request processed successfully in ${processingTime}ms`,
    );

    return Response.json(
      {
        message: "Webhook processed successfully",
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    const processingTime = Date.now() - startTime;

    if (error instanceof Error) {
      console.error(`[WEBHOOK] ❌ Error processing webhook: ${error.message}`);
      console.error(`[WEBHOOK] Stack trace: ${error.stack}`);
    } else {
      console.error(`[WEBHOOK] ❌ Unknown error:`, error);
    }

    console.error(
      `[WEBHOOK] Processing time before error: ${processingTime}ms`,
    );
    console.error(`[WEBHOOK] Client IP: ${clientIp}`);

    // Security: Don't expose internal error details
    return Response.json(
      {
        message: "Internal server error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}

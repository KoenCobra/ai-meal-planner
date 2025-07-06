import { EmailTemplate } from "@/components/EmailTemplate";

export default function EmailTemplateTestPage() {
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <h1>Email Template Test</h1>
        <p>
          This is a test page to preview the EmailTemplate component locally.
        </p>
      </div>

      <EmailTemplate name="John Doe" />
    </div>
  );
}

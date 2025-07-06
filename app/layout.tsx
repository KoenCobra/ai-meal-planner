import ConvexClientProvider from "@/components/ConvexClientProvider";
import CookieConsent from "@/components/CookieConsent";
import { CookieConsentProvider } from "@/components/CookieConsentContext";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bubu AI",
    template: "%s | Bubu AI",
  },
  description:
    "Generate, manage, and discover delicious recipes with AI. Create custom menus, sync grocery lists, and explore endless culinary possibilities.",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <ReactScan /> */}
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-svh`}
      >
        <ClerkProvider
          dynamic
          appearance={{
            baseTheme: dark,
          }}
        >
          <ConvexClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <CookieConsentProvider>
                <main>{children}</main>
                <Analytics />
                <Toaster
                  position="top-center"
                  duration={2000}
                  className="md:hidden"
                />
                <Toaster
                  position="bottom-right"
                  duration={2000}
                  className="hidden md:block"
                />
                <CookieConsent />
              </CookieConsentProvider>
            </ThemeProvider>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

export interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  enabled: boolean;
}

export interface CookieConsent {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
  version: string;
}

export const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: "necessary",
    name: "Necessary Cookies",
    description:
      "Essential cookies required for the website to function properly. These cannot be disabled.",
    required: true,
    enabled: true,
  },
  {
    id: "functional",
    name: "Functional Cookies",
    description:
      "Cookies that enhance your experience by remembering your preferences and settings.",
    required: false,
    enabled: false,
  },
  {
    id: "analytics",
    name: "Analytics Cookies",
    description:
      "Cookies that help us understand how visitors interact with our website by collecting anonymous information.",
    required: false,
    enabled: false,
  },
  {
    id: "marketing",
    name: "Marketing Cookies",
    description:
      "Cookies used to track visitors across websites to display relevant advertisements.",
    required: false,
    enabled: false,
  },
];

export const COOKIE_CONSENT_VERSION = "1.0.0";
export const COOKIE_CONSENT_KEY = "cookie-consent";

export function getStoredConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored) as CookieConsent;

    // Check if consent is still valid (not older than 1 year)
    const oneYearAgo = Date.now() - 365 * 24 * 60 * 60 * 1000;
    if (parsed.timestamp < oneYearAgo) {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(
  consent: Omit<CookieConsent, "timestamp" | "version">,
): void {
  if (typeof window === "undefined") return;

  const fullConsent: CookieConsent = {
    ...consent,
    timestamp: Date.now(),
    version: COOKIE_CONSENT_VERSION,
  };

  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(fullConsent));

  // Dispatch custom event for other parts of the app to listen to
  window.dispatchEvent(
    new CustomEvent("cookieConsentUpdated", { detail: fullConsent }),
  );
}

export function hasConsent(): boolean {
  return getStoredConsent() !== null;
}

export function hasCategoryConsent(
  category: keyof Omit<CookieConsent, "timestamp" | "version">,
): boolean {
  const consent = getStoredConsent();
  if (!consent) return false;
  return consent[category];
}

export function clearConsent(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(COOKIE_CONSENT_KEY);
}

// Cookie management functions
export function setCookie(
  name: string,
  value: string,
  days: number = 365,
): void {
  if (typeof document === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure`;
}

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const nameEQ = name + "=";
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
}

export function deleteCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

// Helper function to load analytics scripts based on consent
export function loadAnalyticsScripts(): void {
  if (!hasCategoryConsent("analytics")) return;

  // Add your analytics scripts here
  // Example: Google Analytics
  // gtag('consent', 'update', {
  //   'analytics_storage': 'granted'
  // });
}

// Helper function to load marketing scripts based on consent
export function loadMarketingScripts(): void {
  if (!hasCategoryConsent("marketing")) return;

  // Add your marketing scripts here
  // Example: Facebook Pixel, Google Ads
  // gtag('consent', 'update', {
  //   'ad_storage': 'granted'
  // });
}

# Cookie Consent System Documentation

This document provides comprehensive information about the cookie consent system implemented in your application.

## Overview

The cookie consent system is fully compliant with GDPR and CCPA regulations, providing users with granular control over their cookie preferences. It includes:

- **Cookie Consent Banner**: A non-intrusive banner that appears for new users
- **Cookie Settings Modal**: A detailed modal for managing cookie preferences
- **Cookie Preferences Component**: A standalone component for settings pages
- **Privacy Policy Page**: A comprehensive privacy policy with cookie information

## Files Created

### Core Files

- `lib/cookie-consent.ts` - Utility functions and TypeScript types
- `components/CookieConsentContext.tsx` - React context for global state management
- `components/CookieConsent.tsx` - Main cookie consent UI components
- `components/CookiePreferences.tsx` - Standalone preferences component
- `app/(main)/privacy-policy/page.tsx` - Privacy policy page

### Updated Files

- `app/layout.tsx` - Integrated cookie consent provider and components

## Cookie Categories

The system supports four cookie categories:

1. **Necessary Cookies** (Always Required)
   - Essential for website functionality
   - Cannot be disabled
   - Includes authentication, security, and basic functionality

2. **Functional Cookies** (Optional)
   - Enhance user experience
   - Remember preferences and settings
   - Examples: language settings, theme preferences

3. **Analytics Cookies** (Optional)
   - Track website usage anonymously
   - Help improve website performance
   - Examples: Google Analytics, usage statistics

4. **Marketing Cookies** (Optional)
   - Track users across websites
   - Show relevant advertisements
   - Examples: Google Ads, Facebook Pixel

## Usage Examples

### Basic Usage - Check Cookie Consent

```tsx
import { useCookieCategory } from "@/components/CookieConsent";

function MyComponent() {
  const hasAnalyticsConsent = useCookieCategory("analytics");
  const hasMarketingConsent = useCookieCategory("marketing");

  return (
    <div>
      {hasAnalyticsConsent && (
        <script>// Load analytics scripts only if user consented</script>
      )}
      {hasMarketingConsent && (
        <script>// Load marketing scripts only if user consented</script>
      )}
    </div>
  );
}
```

### Using the Consent Gate Component

```tsx
import { ConsentGate } from "@/components/CookieConsent";

function MyComponent() {
  return (
    <div>
      <ConsentGate
        category="analytics"
        fallback={<div>Analytics disabled</div>}
      >
        <AnalyticsComponent />
      </ConsentGate>

      <ConsentGate category="marketing">
        <MarketingWidget />
      </ConsentGate>
    </div>
  );
}
```

### Access Cookie Consent Context

```tsx
import { useCookieConsent } from "@/components/CookieConsentContext";

function MyComponent() {
  const {
    consent,
    categories,
    openSettings,
    resetConsent,
    acceptAll,
    declineAll,
  } = useCookieConsent();

  return (
    <div>
      <button onClick={openSettings}>Open Cookie Settings</button>

      <button onClick={resetConsent}>Reset Cookie Preferences</button>

      {consent && (
        <div>
          <p>Analytics: {consent.analytics ? "Enabled" : "Disabled"}</p>
          <p>Marketing: {consent.marketing ? "Enabled" : "Disabled"}</p>
        </div>
      )}
    </div>
  );
}
```

### Custom Cookie Management

```tsx
import {
  setCookie,
  getCookie,
  deleteCookie,
  hasCategoryConsent,
} from "@/lib/cookie-consent";

function MyComponent() {
  const handleSavePreference = () => {
    // Only set functional cookies if user consented
    if (hasCategoryConsent("functional")) {
      setCookie("user-preference", "dark-mode", 30); // 30 days
    }
  };

  const handleLoadPreference = () => {
    const preference = getCookie("user-preference");
    return preference;
  };

  return (
    <div>
      <button onClick={handleSavePreference}>Save Preference</button>
    </div>
  );
}
```

## Integration with Analytics Services

### Google Analytics 4

```tsx
// In your analytics setup file
import { hasCategoryConsent } from "@/lib/cookie-consent";

// Initialize GA4 with consent
if (hasCategoryConsent("analytics")) {
  // Initialize Google Analytics
  gtag("consent", "update", {
    analytics_storage: "granted",
  });
}

// Listen for consent changes
window.addEventListener("cookieConsentUpdated", (event) => {
  const consent = event.detail;
  gtag("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
  });
});
```

### Facebook Pixel

```tsx
// In your marketing setup file
import { hasCategoryConsent } from "@/lib/cookie-consent";

if (hasCategoryConsent("marketing")) {
  // Initialize Facebook Pixel
  fbq("init", "YOUR_PIXEL_ID");
}

// Listen for consent changes
window.addEventListener("cookieConsentUpdated", (event) => {
  const consent = event.detail;
  if (consent.marketing) {
    fbq("init", "YOUR_PIXEL_ID");
  }
});
```

## Adding Cookie Preferences to Settings

```tsx
// In your settings page
import CookiePreferences from "@/components/CookiePreferences";

export default function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>

      {/* Other settings components */}

      <CookiePreferences />
    </div>
  );
}
```

## Customization

### Styling

The components use your existing design system (Tailwind CSS + Shadcn/ui). You can customize the appearance by:

1. **Modifying the component classes** in `components/CookieConsent.tsx`
2. **Creating custom CSS** for specific cookie consent elements
3. **Overriding the default styling** using CSS custom properties

### Content

To customize the cookie consent content:

1. **Edit the cookie categories** in `lib/cookie-consent.ts`
2. **Update the banner text** in `components/CookieConsent.tsx`
3. **Modify the privacy policy** in `app/(main)/privacy-policy/page.tsx`

### Example: Custom Cookie Categories

```tsx
// In lib/cookie-consent.ts
export const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: "necessary",
    name: "Essential Cookies",
    description: "Required for basic website functionality",
    required: true,
    enabled: true,
  },
  {
    id: "performance",
    name: "Performance Cookies",
    description: "Help us improve website performance",
    required: false,
    enabled: false,
  },
  // Add your custom categories here
];
```

## API Reference

### Hook: `useCookieConsent()`

Returns an object with:

- `consent: CookieConsent | null` - Current consent state
- `categories: CookieCategory[]` - Available cookie categories
- `showBanner: boolean` - Whether to show the banner
- `showSettings: boolean` - Whether to show settings modal
- `acceptAll: () => void` - Accept all cookies
- `declineAll: () => void` - Decline optional cookies
- `updateConsent: (updates) => void` - Update specific consents
- `openSettings: () => void` - Open settings modal
- `closeSettings: () => void` - Close settings modal
- `resetConsent: () => void` - Reset all consent

### Hook: `useCookieCategory(category)`

Returns `boolean` - Whether user has consented to the category

### Utility Functions

- `getStoredConsent()` - Get stored consent from localStorage
- `saveConsent(consent)` - Save consent to localStorage
- `hasConsent()` - Check if user has made consent choice
- `hasCategoryConsent(category)` - Check consent for specific category
- `clearConsent()` - Clear all stored consent
- `setCookie(name, value, days)` - Set a cookie
- `getCookie(name)` - Get a cookie value
- `deleteCookie(name)` - Delete a cookie

## Compliance Features

### GDPR Compliance

- ✅ Explicit consent required
- ✅ Granular cookie controls
- ✅ Easy withdraw consent
- ✅ Clear privacy information
- ✅ Consent records with timestamps

### CCPA Compliance

- ✅ Opt-out options
- ✅ Clear privacy policy
- ✅ User rights information
- ✅ Data sharing transparency

## Best Practices

1. **Always check consent** before loading third-party scripts
2. **Provide clear descriptions** for each cookie category
3. **Keep the privacy policy updated** with current practices
4. **Test the consent flow** regularly
5. **Monitor consent rates** to optimize user experience
6. **Respect user choices** immediately after consent changes

## Testing

To test the cookie consent system:

1. **Clear localStorage** to see the banner as a new user
2. **Test all consent combinations** (accept all, decline all, custom)
3. **Verify scripts load conditionally** based on consent
4. **Check localStorage** for proper consent storage
5. **Test cross-tab synchronization** of consent changes

## Browser Support

The cookie consent system supports:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This cookie consent system is part of your application and follows the same license terms.

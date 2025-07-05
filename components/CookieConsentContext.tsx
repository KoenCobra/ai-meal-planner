"use client";

import {
  COOKIE_CATEGORIES,
  CookieCategory,
  CookieConsent,
  getStoredConsent,
  hasConsent,
  loadAnalyticsScripts,
  loadMarketingScripts,
  saveConsent,
} from "@/lib/cookie-consent";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface CookieConsentContextType {
  consent: CookieConsent | null;
  categories: CookieCategory[];
  showBanner: boolean;
  showSettings: boolean;
  acceptAll: () => void;
  declineAll: () => void;
  updateConsent: (
    updates: Partial<Omit<CookieConsent, "timestamp" | "version">>,
  ) => void;
  openSettings: () => void;
  closeSettings: () => void;
  closeBanner: () => void;
  resetConsent: () => void;
}

const CookieConsentContext = createContext<
  CookieConsentContextType | undefined
>(undefined);

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider",
    );
  }
  return context;
}

interface CookieConsentProviderProps {
  children: ReactNode;
}

export function CookieConsentProvider({
  children,
}: CookieConsentProviderProps) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [categories, setCategories] =
    useState<CookieCategory[]>(COOKIE_CATEGORIES);

  // Initialize consent state on client-side
  useEffect(() => {
    const storedConsent = getStoredConsent();
    setConsent(storedConsent);
    setShowBanner(!hasConsent());

    // Update categories with stored consent
    if (storedConsent) {
      const updatedCategories = COOKIE_CATEGORIES.map((category) => ({
        ...category,
        enabled:
          category.required ||
          storedConsent[
            category.id as keyof Omit<CookieConsent, "timestamp" | "version">
          ],
      }));
      setCategories(updatedCategories);
    }
  }, []);

  // Listen for consent updates from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cookie-consent") {
        const newConsent = getStoredConsent();
        setConsent(newConsent);
        setShowBanner(!hasConsent());
      }
    };

    const handleConsentUpdate = (e: CustomEvent) => {
      setConsent(e.detail);
      setShowBanner(false);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(
      "cookieConsentUpdated",
      handleConsentUpdate as EventListener,
    );

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "cookieConsentUpdated",
        handleConsentUpdate as EventListener,
      );
    };
  }, []);

  const acceptAll = () => {
    const newConsent = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };

    saveConsent(newConsent);
    setConsent(getStoredConsent());
    setShowBanner(false);
    setShowSettings(false);

    // Update categories
    const updatedCategories = COOKIE_CATEGORIES.map((category) => ({
      ...category,
      enabled: true,
    }));
    setCategories(updatedCategories);

    // Load scripts
    loadAnalyticsScripts();
    loadMarketingScripts();
  };

  const declineAll = () => {
    const newConsent = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };

    saveConsent(newConsent);
    setConsent(getStoredConsent());
    setShowBanner(false);
    setShowSettings(false);

    // Update categories
    const updatedCategories = COOKIE_CATEGORIES.map((category) => ({
      ...category,
      enabled: category.required,
    }));
    setCategories(updatedCategories);
  };

  const updateConsent = (
    updates: Partial<Omit<CookieConsent, "timestamp" | "version">>,
  ) => {
    const currentConsent = consent || {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };

    const newConsent = {
      ...currentConsent,
      ...updates,
      necessary: true, // Always required
    };

    saveConsent(newConsent);
    setConsent(getStoredConsent());
    setShowBanner(false);
    setShowSettings(false);

    // Update categories
    const updatedCategories = COOKIE_CATEGORIES.map((category) => ({
      ...category,
      enabled:
        category.required ||
        newConsent[
          category.id as keyof Omit<CookieConsent, "timestamp" | "version">
        ],
    }));
    setCategories(updatedCategories);

    // Load scripts conditionally
    if (newConsent.analytics) {
      loadAnalyticsScripts();
    }
    if (newConsent.marketing) {
      loadMarketingScripts();
    }
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  const closeBanner = () => {
    setShowBanner(false);
  };

  const resetConsent = () => {
    setConsent(null);
    setShowBanner(true);
    setShowSettings(false);
    setCategories(COOKIE_CATEGORIES);
  };

  const value: CookieConsentContextType = {
    consent,
    categories,
    showBanner,
    showSettings,
    acceptAll,
    declineAll,
    updateConsent,
    openSettings,
    closeSettings,
    closeBanner,
    resetConsent,
  };

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

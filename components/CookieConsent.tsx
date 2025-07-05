"use client";

import { cn } from "@/lib/utils";
import {
  BarChart3,
  Cookie,
  Settings,
  Shield,
  Target,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { useCookieConsent } from "./CookieConsentContext";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

// Cookie consent banner component
function CookieConsentBanner() {
  const { showBanner, acceptAll, declineAll, openSettings, closeBanner } =
    useCookieConsent();

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Cookie className="size-5 text-primary" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Cookie Consent</h3>
              <p className="text-xs text-muted-foreground">
                We use cookies to enhance your experience, analyze site usage,
                and provide personalized content. By continuing to use our site,
                you accept our use of cookies.{" "}
                <Link
                  href="/privacy-policy"
                  className="underline hover:text-foreground"
                  rel="noopener noreferrer"
                >
                  Learn more
                </Link>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={openSettings}
              className="flex items-center gap-2"
            >
              <Settings className="size-4" />
              Customize
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={declineAll}
              className="text-muted-foreground hover:text-foreground"
            >
              Decline All
            </Button>
            <Button size="sm" onClick={acceptAll}>
              Accept All
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeBanner}
            className="absolute top-2 right-2 sm:hidden"
          >
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

// Cookie settings modal component
function CookieSettingsModal() {
  const {
    showSettings,
    closeSettings,
    categories,
    updateConsent,
    updateCategories,
    consent,
  } = useCookieConsent();

  const handleCategoryToggle = (categoryId: string, enabled: boolean) => {
    // Update local categories state without closing the dialog
    const updatedCategories = categories.map((category) =>
      category.id === categoryId ? { ...category, enabled } : category,
    );

    // Update the categories in the context without closing the dialog
    updateCategories(updatedCategories);
  };

  const handleSavePreferences = () => {
    const newConsent = {
      necessary: true,
      functional:
        categories.find((c) => c.id === "functional")?.enabled || false,
      analytics: categories.find((c) => c.id === "analytics")?.enabled || false,
      marketing: categories.find((c) => c.id === "marketing")?.enabled || false,
    };
    updateConsent(newConsent);
  };

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case "necessary":
        return <Shield className="size-5 text-green-600" />;
      case "functional":
        return <Zap className="size-5 text-blue-600" />;
      case "analytics":
        return <BarChart3 className="size-5 text-purple-600" />;
      case "marketing":
        return <Target className="size-5 text-orange-600" />;
      default:
        return <Cookie className="size-5" />;
    }
  };

  return (
    <Dialog open={showSettings} onOpenChange={closeSettings}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Cookie className="size-5" />
            Cookie Settings
          </DialogTitle>
          <DialogDescription>
            Manage your cookie preferences. You can enable or disable different
            types of cookies below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {categories.map((category) => (
            <Card key={category.id} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getCategoryIcon(category.id)}
                    <div>
                      <CardTitle className="text-base">
                        {category.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {category.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={category.id}
                      checked={category.enabled}
                      disabled={category.required}
                      onCheckedChange={(checked) =>
                        handleCategoryToggle(category.id, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={category.id}
                      className={cn(
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                        category.required && "text-muted-foreground",
                      )}
                    >
                      {category.enabled ? "Enabled" : "Disabled"}
                    </label>
                  </div>
                </div>
              </CardHeader>
              {category.required && (
                <div className="absolute top-2 right-2">
                  <div className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                    Required
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="pt-4 border-t">
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={closeSettings}>
              Cancel
            </Button>
            <Button onClick={handleSavePreferences}>Save Preferences</Button>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="text-xs text-muted-foreground space-y-2">
            <p>
              <strong>Last updated:</strong>{" "}
              {consent?.timestamp
                ? new Date(consent.timestamp).toLocaleDateString()
                : "Never"}
            </p>
            <p>
              <strong>Version:</strong> {consent?.version || "N/A"}
            </p>
            <p>
              Your cookie preferences are stored locally in your browser and
              will expire after one year.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Main cookie consent component
export default function CookieConsent() {
  return (
    <>
      <CookieConsentBanner />
      <CookieSettingsModal />
    </>
  );
}

// Hook to check if user has consented to specific cookie categories
export function useCookieCategory(
  category: "necessary" | "functional" | "analytics" | "marketing",
) {
  const { consent } = useCookieConsent();
  return consent?.[category] || false;
}

// Component to wrap content that should only show with consent
interface ConsentGateProps {
  category: "necessary" | "functional" | "analytics" | "marketing";
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ConsentGate({
  category,
  children,
  fallback = null,
}: ConsentGateProps) {
  const hasConsent = useCookieCategory(category);
  return hasConsent ? <>{children}</> : <>{fallback}</>;
}

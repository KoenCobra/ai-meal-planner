"use client";

import { clearConsent } from "@/lib/cookie-consent";
import { Cookie, RefreshCw, Trash2 } from "lucide-react";
import { useCookieConsent } from "./CookieConsentContext";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function CookiePreferences() {
  const { consent, openSettings, resetConsent } = useCookieConsent();

  const handleResetConsent = () => {
    clearConsent();
    resetConsent();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cookie className="size-5" />
          Cookie Preferences
        </CardTitle>
        <CardDescription>
          Manage your cookie consent preferences and view your current settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {consent ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Necessary Cookies:</span>
                <span className="ml-2 text-green-600">Always Active</span>
              </div>
              <div>
                <span className="font-medium">Functional Cookies:</span>
                <span
                  className={`ml-2 ${consent.functional ? "text-green-600" : "text-red-600"}`}
                >
                  {consent.functional ? "Enabled" : "Disabled"}
                </span>
              </div>
              <div>
                <span className="font-medium">Analytics Cookies:</span>
                <span
                  className={`ml-2 ${consent.analytics ? "text-green-600" : "text-red-600"}`}
                >
                  {consent.analytics ? "Enabled" : "Disabled"}
                </span>
              </div>
              <div>
                <span className="font-medium">Marketing Cookies:</span>
                <span
                  className={`ml-2 ${consent.marketing ? "text-green-600" : "text-red-600"}`}
                >
                  {consent.marketing ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>
                <strong>Last updated:</strong>{" "}
                {new Date(consent.timestamp).toLocaleDateString()}
              </p>
              <p>
                <strong>Version:</strong> {consent.version}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Cookie className="size-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              No cookie preferences have been set yet.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button onClick={openSettings} className="flex items-center gap-2">
            <RefreshCw className="size-4" />
            Update Preferences
          </Button>
          {consent && (
            <Button
              variant="outline"
              onClick={handleResetConsent}
              className="flex items-center gap-2"
            >
              <Trash2 className="size-4" />
              Reset All
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

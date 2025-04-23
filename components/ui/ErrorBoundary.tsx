"use client";

import React from "react";
import { ConvexError } from "convex/values";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, info: { componentStack: string }) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, { componentStack: info.componentStack || "" });
    }
    // Optionally log to Sentry or another service here
  }

  render() {
    if (this.state.hasError) {
      let errorMessage =
        "An unexpected error occurred. Please try again later.";
      const { error } = this.state;
      if (error instanceof ConvexError) {
        errorMessage = error.data;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      return (
        this.props.fallback || (
          <div className="fixed bottom-6 right-6 z-50 max-w-sm shadow w-full bg-white border border-red-200 shadow-lg rounded-lg p-4 flex items-start gap-3 text-red-600">
            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1 text-red-600" />
            <div className="flex justify-between items-center gap-8">
              <div>
                <h2 className="text-base font-semibold mb-1">
                  Something went wrong
                </h2>
                <p className="text-sm">{errorMessage}</p>
              </div>
              <Button
                onClick={() => window.location.reload()}
                className="border border-red-600 bg-white text-red-600"
              >
                Refresh
              </Button>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

import { ConvexError } from "convex/values";
import { useCallback } from "react";
import { toast } from "sonner";

interface ErrorHandlerOptions {
  showToast?: boolean;
  defaultMessage?: string;
  onError?: (error: unknown) => void;
}

/**
 * Hook for consistent error handling across the application
 */
export function useErrorHandler({
  showToast = true,
  defaultMessage = "An error occurred",
  onError,
}: ErrorHandlerOptions = {}) {
  const handleError = useCallback(
    (error: unknown, customMessage?: string) => {
      console.error(error);

      // Determine error message
      let errorMessage = customMessage || defaultMessage;

      if (error instanceof ConvexError) {
        errorMessage = error.data || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      // Show toast if enabled
      if (showToast) {
        toast.error(errorMessage);
      }

      // Call custom error handler if provided
      if (onError) {
        onError(error);
      }

      return errorMessage;
    },
    [defaultMessage, showToast, onError],
  );

  return { handleError };
}

/**
 * Hook for handling async operations with loading states and error handling
 */
export function useAsyncOperation<T extends unknown[], R>(
  operation: (...args: T) => Promise<R>,
  options: ErrorHandlerOptions & {
    successMessage?: string;
    onSuccess?: (result: R) => void;
  } = {},
) {
  const { handleError } = useErrorHandler(options);

  const executeOperation = useCallback(
    async (...args: T): Promise<R | null> => {
      try {
        const result = await operation(...args);

        if (options.successMessage) {
          toast.success(options.successMessage);
        }

        if (options.onSuccess) {
          options.onSuccess(result);
        }

        return result;
      } catch (error) {
        handleError(error);
        return null;
      }
    },
    [operation, handleError, options],
  );

  return { executeOperation };
}

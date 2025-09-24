import { useCallback, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { useErrorHandler } from "./useErrorHandler";

interface FormHandlerOptions<T extends FieldValues> {
  onSubmit: (data: T) => Promise<void>;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
  resetOnSuccess?: boolean;
}

/**
 * Hook for handling form submissions with loading states and error handling
 */
export function useFormHandler<T extends FieldValues>(
  form: UseFormReturn<T>,
  options: FormHandlerOptions<T>,
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleError } = useErrorHandler({
    defaultMessage: options.errorMessage || "Failed to submit form",
  });

  const handleSubmit = useCallback(
    async (data: T) => {
      setIsSubmitting(true);

      try {
        await options.onSubmit(data);

        if (options.successMessage) {
          const { toast } = await import("sonner");
          toast.success(options.successMessage);
        }

        if (options.resetOnSuccess !== false) {
          form.reset();
        }

        if (options.onSuccess) {
          options.onSuccess();
        }
      } catch (error) {
        handleError(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, options, handleError],
  );

  return {
    handleSubmit: form.handleSubmit(handleSubmit),
    isSubmitting,
  };
}

/**
 * Hook for managing form dialogs with integrated submission handling
 */
export function useFormDialog<T extends FieldValues>(
  form: UseFormReturn<T>,
  options: FormHandlerOptions<T> & {
    onClose?: () => void;
  },
) {
  const { handleSubmit, isSubmitting } = useFormHandler(form, {
    ...options,
    onSuccess: () => {
      options.onSuccess?.();
      options.onClose?.();
    },
  });

  return {
    handleSubmit,
    isSubmitting,
  };
}

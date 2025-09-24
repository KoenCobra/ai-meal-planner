import { useCallback, useState } from "react";

/**
 * Generic dialog state management hook
 * @param initialOpen - Initial open state (default: false)
 * @returns Dialog state and control functions
 */
export function useDialog<T = undefined>(initialOpen: boolean = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [data, setData] = useState<T | null>(null);

  const openDialog = useCallback((dialogData?: T) => {
    if (dialogData !== undefined) {
      setData(dialogData as T);
    }
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    setData(null);
  }, []);

  const toggleDialog = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    data,
    openDialog,
    closeDialog,
    toggleDialog,
    setIsOpen,
  };
}

/**
 * Hook for managing dialogs that require confirmation
 * @param onConfirm - Function to call when confirmed
 * @param initialOpen - Initial open state
 * @returns Dialog state with confirmation handlers
 */
export function useConfirmationDialog<T = undefined>(
  onConfirm?: (data?: T) => void | Promise<void>,
  initialOpen: boolean = false,
) {
  const dialog = useDialog<T>(initialOpen);

  const confirmAndClose = useCallback(async () => {
    if (onConfirm) {
      await onConfirm(dialog.data || undefined);
    }
    dialog.closeDialog();
  }, [onConfirm, dialog]);

  return {
    ...dialog,
    confirmAndClose,
  };
}

/**
 * Hook for managing form dialogs with loading states
 * @param onSubmit - Function to call when form is submitted
 * @param initialOpen - Initial open state
 * @returns Dialog state with form submission handlers
 */
export function useFormDialog<T = undefined, R = void>(
  onSubmit?: (data: T) => Promise<R>,
  initialOpen: boolean = false,
) {
  const dialog = useDialog<T>(initialOpen);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitAndClose = useCallback(
    async (formData: T) => {
      if (!onSubmit) return;

      setIsSubmitting(true);
      setError(null);

      try {
        await onSubmit(formData);
        dialog.closeDialog();
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSubmit, dialog],
  );

  const closeWithReset = useCallback(() => {
    dialog.closeDialog();
    setError(null);
    setIsSubmitting(false);
  }, [dialog]);

  return {
    ...dialog,
    isSubmitting,
    error,
    submitAndClose,
    closeDialog: closeWithReset,
    clearError: () => setError(null),
  };
}

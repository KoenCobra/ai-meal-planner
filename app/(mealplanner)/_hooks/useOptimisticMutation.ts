import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";
import { useErrorHandler } from "./useErrorHandler";

interface OptimisticUpdateConfig<TData, TVariables> {
  queryKey: QueryKey;
  optimisticUpdate: (oldData: TData, variables: TVariables) => TData;
  errorMessage?: string;
  successMessage?: string;
}

/**
 * Hook for mutations with optimistic updates
 */
export function useOptimisticMutation<TData, TVariables, TResult>(
  mutationFn: (variables: TVariables) => Promise<TResult>,
  config: OptimisticUpdateConfig<TData, TVariables>,
) {
  const queryClient = useQueryClient();
  const { handleError } = useErrorHandler({
    defaultMessage: config.errorMessage || "Operation failed",
  });

  const mutation = useMutation({
    mutationFn,
    onMutate: async (variables: TVariables) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: config.queryKey });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData<TData>(config.queryKey);

      // Optimistically update the cache
      if (previousData) {
        queryClient.setQueryData<TData>(
          config.queryKey,
          config.optimisticUpdate(previousData, variables),
        );
      }

      // Return context for potential rollback
      return { previousData };
    },
    onError: (error, variables, context) => {
      // Roll back the optimistic update on error
      if (context?.previousData) {
        queryClient.setQueryData(config.queryKey, context.previousData);
      }

      handleError(error);
    },
    onSuccess: () => {
      if (config.successMessage) {
        toast.success(config.successMessage);
      }
    },
    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: config.queryKey });
    },
  });

  return mutation;
}

/**
 * Hook for list-based optimistic updates (add, remove, update items)
 */
export function useOptimisticListMutation<TItem, TVariables, TResult>(
  mutationFn: (variables: TVariables) => Promise<TResult>,
  config: {
    queryKey: QueryKey;
    operation: "add" | "remove" | "update";
    getItemId: (item: TItem) => string | number;
    getUpdatedItem?: (oldItem: TItem, variables: TVariables) => TItem;
    getNewItem?: (variables: TVariables) => TItem;
    errorMessage?: string;
    successMessage?: string;
  },
) {
  const optimisticUpdate = useCallback(
    (oldData: TItem[], variables: TVariables): TItem[] => {
      switch (config.operation) {
        case "add":
          if (!config.getNewItem) return oldData;
          return [config.getNewItem(variables), ...oldData];

        case "remove":
          const removeId = (variables as { id: string | number }).id;
          return oldData.filter((item) => config.getItemId(item) !== removeId);

        case "update":
          if (!config.getUpdatedItem) return oldData;
          const updateId = (variables as { id: string | number }).id;
          return oldData.map((item) =>
            config.getItemId(item) === updateId
              ? config.getUpdatedItem!(item, variables)
              : item,
          );

        default:
          return oldData;
      }
    },
    [config],
  );

  return useOptimisticMutation(mutationFn, {
    queryKey: config.queryKey,
    optimisticUpdate,
    errorMessage: config.errorMessage,
    successMessage: config.successMessage,
  });
}

import { useQueryClient } from "@tanstack/react-query";

export const useClearAiCache = () => {
  const queryClient = useQueryClient();

  const clearAiCache = () => {
    queryClient.setQueryData(["generate-recipe"], null);
    queryClient.setQueryData(["generate-image"], null);
  };

  return {
    clearAiCache,
  };
};

interface EmptyStateProps {
  mealType: string;
}

export const EmptyState = ({ mealType }: EmptyStateProps) => (
  <p className="text-muted-foreground text-center py-4">
    No {mealType} recipes yet
  </p>
);

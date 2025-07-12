import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { PreferencesInput, preferencesSchema } from "@/lib/validation";
import { convexQuery } from "@convex-dev/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const Preferences = ({
  showPreferences,
  setShowPreferences,
}: {
  showPreferences: boolean;
  setShowPreferences: (show: boolean) => void;
}) => {
  const { data: preferences } = useQuery({
    ...convexQuery(api.preferences.getPreferences, {}),
  });

  const form = useForm<PreferencesInput>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      diets: preferences?.diets || [],
      allergies: preferences?.allergies || [],
      preferences: preferences?.preferences || [],
      servings: preferences?.servings || 0,
      readyInMinutes: preferences?.readyInMinutes || 0,
      additionalInstructions: preferences?.additionalInstructions || "",
    },
  });

  const onSubmit = async (input: PreferencesInput) => {
    console.log(input);
  };

  return (
    <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Preferences</DialogTitle>
          <DialogDescription>
            Set your preferences for the recipe generation.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="diets"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diets</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Diets" />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Preferences;

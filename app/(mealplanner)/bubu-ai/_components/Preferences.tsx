import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/convex/_generated/api";
import { sanitizeInput } from "@/lib/utils";
import { PreferencesInput, preferencesSchema } from "@/lib/validation";
import { convexQuery } from "@convex-dev/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "convex/react";
import { useForm } from "react-hook-form";
import { diets } from "./diets";

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

  const updatePreferences = useMutation(api.preferences.updatePreferences);

  const form = useForm<PreferencesInput>({
    resolver: zodResolver(preferencesSchema),
    values: {
      diets: preferences?.diets,
      allergies: preferences?.allergies,
      preferences: preferences?.preferences,
      servings: preferences?.servings,
      readyInMinutes: preferences?.readyInMinutes,
      additionalInstructions: preferences?.additionalInstructions,
    },
  });

  const onSubmit = async (input: PreferencesInput) => {
    await updatePreferences({
      diets: input.diets || [],
      allergies: input.allergies || [],
      preferences: input.preferences || [],
      servings: input.servings || 0,
      readyInMinutes: input.readyInMinutes || 0,
      additionalInstructions:
        sanitizeInput(input.additionalInstructions || "") || "",
    });
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
              render={() => (
                <FormItem>
                  <FormLabel className="text-base">Diets</FormLabel>
                  {diets.map((item) => (
                    <FormField
                      key={item}
                      control={form.control}
                      name="diets"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item}
                            className="flex flex-row items-center gap-2"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...(field.value ?? []),
                                        item,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal cursor-pointer">
                              {item}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Preferences;

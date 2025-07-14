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
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { sanitizeInput } from "@/lib/utils";
import { PreferencesInput, preferencesSchema } from "@/lib/validation";
import { convexQuery } from "@convex-dev/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "convex/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { allergies, diets, preferences } from "./diets";

const Preferences = ({
  showPreferences,
  setShowPreferences,
}: {
  showPreferences: boolean;
  setShowPreferences: (show: boolean) => void;
}) => {
  const { data: preferencesData } = useQuery({
    ...convexQuery(api.preferences.getPreferences, {}),
  });

  const updatePreferences = useMutation(api.preferences.updatePreferences);

  const form = useForm<PreferencesInput>({
    resolver: zodResolver(preferencesSchema),
    values: {
      diets: preferencesData?.diets,
      allergies: preferencesData?.allergies,
      preferences: preferencesData?.preferences,
      servings: preferencesData?.servings || 2,
      readyInMinutes: preferencesData?.readyInMinutes || 60,
      additionalInstructions: preferencesData?.additionalInstructions,
    },
  });

  const onSubmit = async (input: PreferencesInput) => {
    try {
      await updatePreferences({
        diets: input.diets || [],
        allergies: input.allergies || [],
        preferences: input.preferences || [],
        servings: input.servings || 2,
        readyInMinutes: input.readyInMinutes || 60,
        additionalInstructions:
          sanitizeInput(input.additionalInstructions || "") || "",
      });

      setShowPreferences(false);
    } catch {
      toast.error("Failed to update preferences");
    }
  };

  const CheckboxSection = ({
    title,
    items,
    fieldName,
  }: {
    title: string;
    items: string[];
    fieldName: "diets" | "preferences" | "allergies";
  }) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <FormField
            key={item}
            control={form.control}
            name={fieldName}
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value?.includes(item)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange([...(field.value ?? []), item])
                        : field.onChange(
                            field.value?.filter((value) => value !== item),
                          );
                    }}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                </FormControl>
                <FormLabel className="text-sm font-medium cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {item}
                </FormLabel>
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );

  return (
    <Dialog open={showPreferences} onOpenChange={setShowPreferences} modal>
      <DialogContent className="w-[95vw] max-w-2xl flex flex-col pb-0">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold">Preferences</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Customize your recipe generation preferences to get personalized
            meal suggestions.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Dietary Preferences Section */}
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="diets"
                  render={() => (
                    <FormItem>
                      <CheckboxSection
                        title="Dietary Restrictions"
                        items={diets}
                        fieldName="diets"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="border-t pt-6">
                  <FormField
                    control={form.control}
                    name="preferences"
                    render={() => (
                      <FormItem>
                        <CheckboxSection
                          title="Food Preferences"
                          items={preferences}
                          fieldName="preferences"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="border-t pt-6">
                  <FormField
                    control={form.control}
                    name="allergies"
                    render={() => (
                      <FormItem>
                        <CheckboxSection
                          title="Allergies & Intolerances"
                          items={allergies}
                          fieldName="allergies"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Recipe Parameters Section */}
              <div className="border-t pt-6 space-y-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Recipe Parameters
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="servings"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-sm font-medium">
                          Number of Servings
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g., 4"
                            type="number"
                            min="1"
                            max="12"
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="readyInMinutes"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-sm font-medium">
                          Cooking Time: {field.value || 60} minutes
                        </FormLabel>
                        <FormControl>
                          <div>
                            <Slider
                              value={[field.value ?? 60]}
                              max={120}
                              min={10}
                              step={5}
                              className="w-full"
                              onValueChange={(value) =>
                                field.onChange(value[0])
                              }
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                              <span>10 min</span>
                              <span>120 min</span>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Additional Instructions Section */}
              <div className="border-t pt-6">
                <FormField
                  control={form.control}
                  name="additionalInstructions"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-medium">
                        Additional Instructions
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Any special dietary requirements, cooking methods, or ingredient preferences..."
                          className="min-h-[100px] resize-none"
                          maxLength={150}
                        />
                      </FormControl>
                      <div className="flex justify-between">
                        <FormMessage />
                        <span className="text-xs text-muted-foreground">
                          {field.value?.length || 0}/150
                        </span>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>

        <DialogFooter className="sticky bottom-0 bg-background py-4 mt-6">
          <div className="flex gap-3 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowPreferences(false)}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              className="flex-1 sm:flex-none"
            >
              Save Preferences
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Preferences;

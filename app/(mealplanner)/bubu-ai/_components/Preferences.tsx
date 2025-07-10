import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Preferences = ({
  showPreferences,
  setShowPreferences,
}: {
  showPreferences: boolean;
  setShowPreferences: (show: boolean) => void;
}) => {
  return (
    <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Preferences</DialogTitle>
          <DialogDescription>
            Set your preferences for the recipe generation.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Preferences;

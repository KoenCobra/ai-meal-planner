import { Heart, Sparkles } from "lucide-react";

const FloatingFeatureBadges = () => {
  return (
    <div className="flex justify-center gap-4 flex-wrap">
      <div className="bg-white/90 dark:bg-zinc-900/90 border-2 border-blue-200/50 dark:border-blue-400/30 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Sparkles className="size-5 text-blue-600 dark:text-blue-400" />
          <span className="font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
            AI Powered Recognition
          </span>
        </div>
      </div>
      <div className="bg-white/90 dark:bg-zinc-900/90 border-2 border-green-200/50 dark:border-green-400/30 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Heart className="size-5 text-green-600 dark:text-green-400" />
          <span className="font-semibold text-green-600 dark:text-green-400">
            Instant Nutrition Analysis
          </span>
        </div>
      </div>
    </div>
  );
};

export default FloatingFeatureBadges;

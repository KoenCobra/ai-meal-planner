import Image from "next/image";

const PreferencesShowcase = () => {
  return (
    <div className="mb-12">
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
            Perfectly Tailored
          </span>{" "}
          to Your Preferences
        </h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Set your dietary preferences, allergies, cooking time, and serving
          size once. Every recipe generated will be perfectly customized to your
          needs.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20 dark:from-blue-400/20 dark:to-blue-300/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
          <div className="relative bg-white/90 dark:bg-zinc-900/90 border-2 border-blue-200/50 dark:border-blue-400/30 rounded-3xl p-6 shadow-2xl backdrop-blur-sm hover:shadow-3xl transition-all duration-500 group-hover:scale-105">
            <div className="mb-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                    Smart Preferences
                  </span>
                </h3>
                <p className="text-sm text-muted-foreground">
                  Set once, customize forever
                </p>
              </div>
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 rounded-2xl overflow-hidden border-2 border-blue-200/30 dark:border-blue-400/20">
                <Image
                  src="/images/preferences.png"
                  alt="Bubu AI preferences interface showing dietary options, allergies, cooking time, serving size, and additional instructions"
                  width={600}
                  height={800}
                  quality={100}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs text-center">
              <div className="bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-3 border border-blue-200/30 dark:border-blue-400/20">
                <div className="font-semibold text-blue-600 dark:text-blue-400 mb-1">
                  Dietary Preferences
                </div>
                <div className="text-muted-foreground">
                  Vegan, Keto, Gluten-free & more
                </div>
              </div>
              <div className="bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-3 border border-blue-200/30 dark:border-blue-400/20">
                <div className="font-semibold text-blue-600 dark:text-blue-400 mb-1">
                  Allergy Management
                </div>
                <div className="text-muted-foreground">
                  Nuts, Shellfish, Dairy & more
                </div>
              </div>
              <div className="bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-3 border border-blue-200/30 dark:border-blue-400/20">
                <div className="font-semibold text-blue-600 dark:text-blue-400 mb-1">
                  Cooking Time
                </div>
                <div className="text-muted-foreground">
                  10-120 minutes range
                </div>
              </div>
              <div className="bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-3 border border-blue-200/30 dark:border-blue-400/20">
                <div className="font-semibold text-blue-600 dark:text-blue-400 mb-1">
                  Serving Size
                </div>
                <div className="text-muted-foreground">Custom portions</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 rounded-xl p-4 border border-blue-200/30 dark:border-blue-400/20">
                <div className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  ✨ Additional Instructions
                </div>
                <div className="text-sm text-muted-foreground">
                  &ldquo;Low sodium, include protein alternatives, make it
                  spicy&rdquo;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesShowcase;

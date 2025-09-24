import Image from "next/image";

const StackedCollage = () => {
  return (
    <div className="relative w-full max-w-md mx-auto min-h-[500px] md:min-h-[600px]">
      {/* Search Layer */}
      <div className="absolute top-0 left-8 z-10">
        <div className="bg-white/95 dark:bg-zinc-900/95 border-2 border-blue-200/60 dark:border-blue-400/40 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden w-56 md:w-64 rotate-[-8deg]">
          <Image
            src="/images/search720x1500.jpeg"
            alt="Recipe search interface with smoothie results"
            width={720}
            height={1500}
            quality={100}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Grocery List Layer */}
      <div className="absolute top-12 right-4 z-20">
        <div className="bg-white/95 dark:bg-zinc-900/95 border-2 border-blue-200/60 dark:border-blue-400/40 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden w-56 md:w-64 rotate-[6deg]">
          <Image
            src="/images/grocery720x1500.jpeg"
            alt="Smart grocery list with ingredient tracking"
            width={720}
            height={1500}
            quality={100}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Menus Layer */}
      <div className="absolute top-24 left-12 z-30">
        <div className="bg-white/95 dark:bg-zinc-900/95 border-2 border-blue-200/70 dark:border-blue-400/50 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden w-52 md:w-60 rotate-[-4deg]">
          <Image
            src="/images/menus720x1500.jpeg"
            alt="Menu planning interface with organized meal categories"
            width={720}
            height={1500}
            quality={100}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Recipes (Dark Theme) Layer */}
      <div className="absolute top-36 right-8 z-40">
        <div className="bg-white/95 dark:bg-zinc-900/95 border-2 border-blue-200/70 dark:border-blue-400/50 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden w-52 md:w-56 rotate-[3deg]">
          <Image
            src="/images/dark720x1500.jpeg"
            alt="Recipe collection with dark theme showing oatmeal cookies"
            width={720}
            height={1500}
            quality={100}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default StackedCollage;

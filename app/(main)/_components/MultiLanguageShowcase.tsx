import Image from "next/image";

const MultiLanguageShowcase = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-blue-50/30 to-transparent dark:from-blue-950/20 dark:to-transparent text-balance rounded-t-lg">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
              Bubu AI
            </span>{" "}
            Works on Any Device,
            <span className="block text-3xl md:text-4xl mt-2">
              Understands Any Language
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto ">
            Type your recipe requests in any language you&apos;re comfortable
            with.{" "}
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
              Bubu AI
            </span>{" "}
            understands any language and works seamlessly across all your
            devices.
          </p>
        </div>

        {/* Multi-Language Showcase Carousel */}
        <div className="flex justify-center items-center">
          <div className="relative w-full max-w-sm mx-auto">
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-blue-200/30 dark:border-blue-400/20 bg-white/10 dark:bg-zinc-900/10 backdrop-blur-sm">
              {/* Carousel Track */}
              <div className="flex animate-carousel">
                {/* English Screenshot */}
                <div className="w-full flex-shrink-0">
                  <div className="relative">
                    <Image
                      src="/images/english720x1500.jpg"
                      alt="Bubu AI generating recipe in English - Avocado and Strawberry Smoothie"
                      width={720}
                      height={1500}
                      quality={100}
                      className="w-full object-cover"
                    />
                  </div>
                </div>

                {/* Italian Screenshot */}
                <div className="w-full flex-shrink-0">
                  <div className="relative">
                    <Image
                      src="/images/italian720x1500.jpg"
                      alt="Bubu AI generating recipe in Italian - Lasagna con Prosciutto e Spinaci"
                      width={720}
                      height={1500}
                      quality={100}
                      className="w-full object-cover"
                    />
                  </div>
                </div>

                {/* Spanish Screenshot */}
                <div className="w-full flex-shrink-0">
                  <div className="relative">
                    <Image
                      src="/images/spanish720x1500.jpg"
                      alt="Bubu AI generating recipe in Spanish - Paella Mixta Tradicional"
                      width={720}
                      height={1500}
                      quality={100}
                      className="w-full object-cover"
                    />
                  </div>
                </div>

                {/* Duplicate first image for seamless loop */}
                <div className="w-full flex-shrink-0">
                  <div className="relative">
                    <Image
                      src="/images/english720x1500.jpg"
                      alt="Bubu AI generating recipe in English - Avocado and Strawberry Smoothie"
                      width={720}
                      height={1500}
                      quality={100}
                      className="w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Gradient Overlays for Smooth Transitions */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-600/5 to-transparent dark:from-blue-400/5 dark:to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-blue-600/5 to-transparent dark:from-blue-400/5 dark:to-transparent"></div>
              </div>
            </div>

            {/* Animated Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-dot-1"></div>
              <div className="w-2 h-2 bg-blue-300 dark:bg-blue-600 rounded-full animate-dot-2"></div>
              <div className="w-2 h-2 bg-blue-300 dark:bg-blue-600 rounded-full animate-dot-3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultiLanguageShowcase;

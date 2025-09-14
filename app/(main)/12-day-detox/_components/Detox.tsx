import Image from "next/image";

const Detox = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gray-100 dark:bg-gray-800 rounded-3xl transform rotate-1"></div>
            <Image
              src="/12-day-detox/woman-bottle.jpg"
              alt="Healthy lifestyle"
              className="relative rounded-2xl shadow-2xl"
              quality={100}
              width={600}
              height={400}
            />
          </div>
          <div className="lg:pl-8">
            <div className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 text-black dark:text-white text-sm font-semibold rounded-full mb-6 border border-green-400 dark:border-green-500">
              The Science
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-black dark:text-white mb-8 leading-tight">
              Why Your Body Needs a
              <span className="text-green-600 dark:text-green-400"> Detox</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                In today&apos;s modern world, our bodies are constantly exposed
                to toxins through processed foods, environmental pollutants, and
                daily stress. These toxins can accumulate over time, leading to
                fatigue, weight gain, digestive issues, and a weakened immune
                system.
              </p>
              <p>
                Our scientifically-designed detox program helps your body&apos;s
                natural cleansing processes work more effectively, allowing you
                to reset your system and optimize your health. By removing
                toxins and providing your body with essential nutrients,
                you&apos;ll experience increased energy, better digestion, and
                improved overall wellbeing.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500 transition-colors duration-300">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  72hrs
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Initial detox benefits
                </div>
              </div>
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500 transition-colors duration-300">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  100%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Natural ingredients
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detox;

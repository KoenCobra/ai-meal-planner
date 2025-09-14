import Image from "next/image";

const Detox = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-emerald-100 rounded-3xl transform rotate-1"></div>
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
            <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 text-sm font-semibold rounded-full mb-6">
              The Science
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
              Why Your Body Needs a
              <span className="text-emerald-600"> Detox</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
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
              <div className="text-center p-6 bg-slate-50 rounded-2xl">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  72hrs
                </div>
                <div className="text-sm text-slate-600">
                  Initial detox benefits
                </div>
              </div>
              <div className="text-center p-6 bg-slate-50 rounded-2xl">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  100%
                </div>
                <div className="text-sm text-slate-600">
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

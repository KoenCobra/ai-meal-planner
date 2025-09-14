import { Check } from "lucide-react";
import Image from "next/image";

const HealthBenefits = () => {
  const benefits = [
    "Boost your immune system naturally",
    "Increase energy levels and mental clarity",
    "Improve digestion and gut health",
    "Enhance skin radiance and natural glow",
    "Reset unhealthy eating patterns",
    "Reduce inflammation throughout the body",
    "Support healthy weight management",
    "Improve sleep quality",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 text-sm font-semibold rounded-full mb-6">
              Health Benefits
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
              Transform Your Health
              <span className="text-emerald-600"> Naturally</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start group">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-4 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-slate-700 font-medium leading-relaxed">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Additional CTA */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mr-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    Fast Results
                  </h3>
                  <p className="text-slate-600">
                    Feel the difference in just 3 days
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="absolute -inset-4 bg-emerald-100 rounded-3xl transform -rotate-1"></div>
            <Image
              src="/12-day-detox/healthy-lifestyle.jpg"
              alt="Healthy lifestyle"
              className="relative rounded-2xl shadow-2xl"
              quality={100}
              width={1600}
              height={1400}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthBenefits;

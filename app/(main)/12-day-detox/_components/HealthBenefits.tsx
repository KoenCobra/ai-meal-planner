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
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 text-black dark:text-white text-sm font-semibold rounded-full mb-6 border border-green-400 dark:border-green-500">
              Health Benefits
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-black dark:text-white mb-8 leading-tight">
              Transform Your Health
              <span className="text-green-600 dark:text-green-400">
                {" "}
                Naturally
              </span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start group">
                  <div className="flex-shrink-0 w-6 h-6 bg-black dark:bg-gray-700 rounded-full flex items-center justify-center mr-4 mt-1 group-hover:scale-110 transition-transform duration-300 group-hover:bg-green-500 dark:group-hover:bg-green-600">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Additional CTA */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-16 h-16 bg-black dark:bg-gray-700 rounded-2xl flex items-center justify-center mr-6 hover:bg-green-500 dark:hover:bg-green-600 transition-colors duration-300">
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
                  <h3 className="text-lg font-bold text-black dark:text-white mb-1">
                    Fast Results
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Feel the difference in just 3 days
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="absolute -inset-4 bg-gray-100 dark:bg-gray-800 rounded-3xl transform -rotate-1"></div>
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

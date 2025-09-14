import { Check } from "lucide-react";
import Image from "next/image";

const HealthBenefits = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Transform Your Health Naturally
            </h2>
            <div className="space-y-4">
              {[
                "Boost your immune system naturally",
                "Increase energy levels and mental clarity",
                "Improve digestion and gut health",
                "Enhance skin radiance and natural glow",
                "Reset unhealthy eating patterns",
                "Reduce inflammation throughout the body",
                "Support healthy weight management",
                "Improve sleep quality",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Image
              src="/12-day-detox/healthy-lifestyle.jpg"
              alt="Healthy lifestyle"
              className="rounded-lg shadow-lg"
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

import { Check } from "lucide-react";
import Image from "next/image";

const ProgramDetails = () => {
  const features = [
    {
      title: "Complete preparation package and starter kit",
      description:
        "Everything you need to begin your wellness journey, carefully curated for maximum results.",
      gifUrl: "/12-day-detox/prepare.gif",
    },
    {
      title: "Daily email support and check-ins",
      description:
        "Stay motivated with consistent support and guidance from our expert team.",
      gifUrl: "/12-day-detox/email.gif",
    },
    {
      title: "Visualization videos and mindfulness exercises",
      description:
        "Access to calming, centering practices that support your mental and physical wellbeing.",
      gifUrl: "/12-day-detox/visual.gif",
    },
    {
      title: "Shopping guides and recipe collection",
      description:
        "Comprehensive guides to help you make smart, healthy choices at the grocery store.",
      gifUrl: "/12-day-detox/recipes.gif",
    },
    {
      title: "Daily step by step guidance",
      description:
        "Detailed instructions on how to implement your daily habits for optimal results.",
      gifUrl: "/12-day-detox/daily.gif",
    },
  ];

  return (
    <section className="pb-16 pt-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          What You Will Get
        </h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          Everything you need for a successful transformation, carefully
          designed to support your journey to better health.
        </p>

        <div className="max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-8 mb-16 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full md:w-1/2">
                <Image
                  src={feature.gifUrl}
                  alt={feature.title}
                  className="rounded-lg shadow-lg w-full"
                  quality={100}
                  height={400}
                  width={400}
                  unoptimized
                />
              </div>

              <div className="w-full md:w-1/2 p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full mt-1">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramDetails;

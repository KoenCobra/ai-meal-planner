import { Check } from "lucide-react";
import Image from "next/image";

const ProgramDetails = () => {
  const features = [
    {
      title: "Complete preparation package and starter kit",
      description:
        "Everything you need to begin your wellness journey, carefully curated for maximum results.",
      gifUrl: "/12-day-detox/prepare.gif",
      icon: "📦",
      shade: "black",
    },
    {
      title: "Daily email support and check-ins",
      description:
        "Stay motivated with consistent support and guidance from our expert team.",
      gifUrl: "/12-day-detox/email.gif",
      icon: "✉️",
      shade: "gray-800",
    },
    {
      title: "Visualization videos and mindfulness exercises",
      description:
        "Access to calming, centering practices that support your mental and physical wellbeing.",
      gifUrl: "/12-day-detox/visual.gif",
      icon: "🧘",
      shade: "gray-900",
    },
    {
      title: "Shopping guides and recipe collection",
      description:
        "Comprehensive guides to help you make smart, healthy choices at the grocery store.",
      gifUrl: "/12-day-detox/recipes.gif",
      icon: "🥗",
      shade: "black",
    },
    {
      title: "Daily step by step guidance",
      description:
        "Detailed instructions on how to implement your daily habits for optimal results.",
      gifUrl: "/12-day-detox/daily.gif",
      icon: "📅",
      shade: "gray-700",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-gray-100 text-black text-sm font-semibold rounded-full mb-6 border border-green-400">
            Program Includes
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight">
            Everything You Need to
            <span className="text-green-600"> Succeed</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive program provides all the tools, guidance, and
            support you need for a successful transformation.
          </p>
        </div>

        {/* Features */}
        <div className="max-w-7xl mx-auto space-y-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-16 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image/GIF */}
              <div className="w-full lg:w-1/2">
                <div className="relative group">
                  <div
                    className={`absolute -inset-4 bg-gray-100 rounded-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 transform rotate-1`}
                  ></div>
                  <Image
                    src={feature.gifUrl}
                    alt={feature.title}
                    className="relative rounded-2xl shadow-2xl w-full hover:shadow-3xl transition-shadow duration-500"
                    quality={100}
                    height={400}
                    width={500}
                    unoptimized
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-lg">
                  {/* Feature number and icon */}
                  <div className="flex items-center gap-4 mb-8">
                    <div
                      className={`w-16 h-16 bg-${feature.shade} rounded-2xl flex items-center justify-center shadow-lg hover:bg-green-500 transition-colors duration-300`}
                    >
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <div className="text-sm font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold text-black mb-6 leading-tight">
                    {feature.title}
                  </h3>

                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {feature.description}
                  </p>

                  {/* Check mark with benefit */}
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 bg-${feature.shade} rounded-full flex items-center justify-center mr-4 flex-shrink-0 hover:bg-green-500 transition-colors duration-300`}
                    >
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-gray-700 font-semibold">
                      Included in your program
                    </span>
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

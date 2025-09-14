import { Clock, Heart, Leaf, Users } from "lucide-react";
import React from "react";

const Benefits = () => {
  const benefits = [
    {
      title: "Natural Cleansing",
      description: "Reset your body with whole foods and natural ingredients",
      Icon: Leaf,
    },
    {
      title: "12 Days to Health",
      description: "Structured program with daily guidance and support",
      Icon: Clock,
    },
    {
      title: "Lasting Results",
      description: "Learn habits that will transform your health forever",
      Icon: Heart,
    },
    {
      title: "Expert Support",
      description: "Personal guidance from certified health coaches",
      Icon: Users,
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
            Why Choose Our Program?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience the difference with our science-backed approach to
            wellness
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <SingleBenefit
              key={benefit.title}
              title={benefit.title}
              description={benefit.description}
              Icon={benefit.Icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;

const SingleBenefit = ({
  title,
  description,
  Icon,
  index,
}: {
  title: string;
  description: string;
  Icon: React.ElementType;
  index: number;
}) => {
  const iconStyles = [
    "bg-black dark:bg-gray-700",
    "bg-gray-800 dark:bg-gray-600",
    "bg-gray-900 dark:bg-gray-500",
    "bg-black dark:bg-gray-700",
  ];

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-lg dark:shadow-gray-900/50 transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500">
      <div
        className={`inline-flex p-4 ${iconStyles[index]} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:bg-green-500 dark:group-hover:bg-green-600`}
      >
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-black dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

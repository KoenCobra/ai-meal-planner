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
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Why Choose Our Program?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
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
  const greenShades = [
    "bg-emerald-500",
    "bg-emerald-600",
    "bg-emerald-400",
    "bg-emerald-700",
  ];

  return (
    <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-slate-100">
      <div
        className={`inline-flex p-4 ${greenShades[index]} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
};

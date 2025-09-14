import React from "react";
import { Leaf, Clock, Heart, Users } from "lucide-react";

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
    <section className='py-16'>
      <div className='container mx-auto px-4'>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {benefits.map((benefit) => (
            <SingleBenefit
              key={benefit.title}
              title={benefit.title}
              description={benefit.description}
              Icon={benefit.Icon}
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
}: {
  title: string;
  description: string;
  Icon: React.ElementType;
}) => {
  return (
    <div className='text-center p-6'>
      <div className='inline-block p-4 bg-green-100 rounded-full mb-4'>
        <Icon className='w-8 h-8 text-green-600' />
      </div>
      <h3 className='text-xl font-semibold mb-2'>{title}</h3>
      <p className='text-gray-600'>{description}</p>
    </div>
  );
};

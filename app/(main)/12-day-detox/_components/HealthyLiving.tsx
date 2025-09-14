import Image from "next/image";

const HealthyLiving = () => {
  const healthyLiving = [
    {
      title: "Natural Whole Foods",
      imgSrc: "/12-day-detox/blueberries.jpg",
      description:
        "Discover the power of natural, unprocessed foods in supporting your body's optimal function. Our program emphasizes fresh, organic ingredients that provide essential nutrients for health and vitality",
    },
    {
      title: "Mindful Living",
      imgSrc: "/12-day-detox/meditation.jpg",
      description:
        "Learn to incorporate mindfulness practices that reduce stress and support your body's natural healing processes. Our program includes daily visualization exercises and stress-reduction techniques.",
    },
    {
      title: "Sustainable Habits",
      imgSrc: "/12-day-detox/glass-bowls.jpg",
      description:
        "Develop lasting habits that support long-term health and wellness. Our program teaches you practical skills for maintaining a healthy lifestyle beyond the 12-day detox.",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">
            The Importance of Healthy Living
          </h2>
          <p className="text-gray-600">
            Your health is your most valuable asset. Making informed choices
            about nutrition and lifestyle can dramatically impact your quality
            of life and longevity.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-12">
          {healthyLiving.map((item, index) => (
            <SingleHealthyLiving
              key={index}
              title={item.title}
              description={item.description}
              imgSrc={item.imgSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthyLiving;

const SingleHealthyLiving = ({
  title,
  description,
  imgSrc,
}: {
  title: string;
  description: string;
  imgSrc: string;
}) => {
  return (
    <div className="rounded-lg shadow-md">
      <Image
        src={imgSrc}
        alt={title}
        className="rounded-lg rounded-b-none h-80 w-full object-cover"
        quality={100}
        width={600}
        height={400}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

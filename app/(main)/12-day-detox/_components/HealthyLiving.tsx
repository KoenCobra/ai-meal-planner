import Image from "next/image";

const HealthyLiving = () => {
  const healthyLiving = [
    {
      title: "Natural Whole Foods",
      imgSrc: "/12-day-detox/blueberries.jpg",
      description:
        "Discover the power of natural, unprocessed foods in supporting your body's optimal function. Our program emphasizes fresh, organic ingredients that provide essential nutrients for health and vitality",
      shade: "black",
    },
    {
      title: "Mindful Living",
      imgSrc: "/12-day-detox/meditation.jpg",
      description:
        "Learn to incorporate mindfulness practices that reduce stress and support your body's natural healing processes. Our program includes daily visualization exercises and stress-reduction techniques.",
      shade: "gray-800",
    },
    {
      title: "Sustainable Habits",
      imgSrc: "/12-day-detox/glass-bowls.jpg",
      description:
        "Develop lasting habits that support long-term health and wellness. Our program teaches you practical skills for maintaining a healthy lifestyle beyond the 12-day detox.",
      shade: "gray-900",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 bg-gray-100 text-black text-sm font-semibold rounded-full mb-6 border border-green-400">
            Our Approach
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight">
            The Foundation of
            <span className="text-green-600"> Healthy Living</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Your health is your most valuable asset. Making informed choices
            about nutrition and lifestyle can dramatically impact your quality
            of life and longevity.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {healthyLiving.map((item, index) => (
            <SingleHealthyLiving
              key={index}
              title={item.title}
              description={item.description}
              imgSrc={item.imgSrc}
              shade={item.shade}
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
  shade,
}: {
  title: string;
  description: string;
  imgSrc: string;
  shade: string;
}) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200 hover:border-green-400">
      <div className="relative overflow-hidden">
        <Image
          src={imgSrc}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          quality={100}
          width={600}
          height={400}
        />
        <div
          className={`absolute inset-0 bg-${shade} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
        ></div>
      </div>
      <div className="p-8">
        <div
          className={`inline-flex items-center justify-center w-12 h-12 bg-${shade} rounded-2xl mb-6 shadow-lg group-hover:bg-green-500 transition-colors duration-300`}
        >
          <div className="w-6 h-6 bg-white rounded-full opacity-80"></div>
        </div>
        <h3 className="text-2xl font-bold text-black mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

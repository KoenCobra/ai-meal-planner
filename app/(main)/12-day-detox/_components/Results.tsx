const Results = () => {
  const stats = [
    {
      value: "5+ lbs",
      label: "Average Weight Release",
      description: "Sustainable weight loss in just 12 days",
      shade: "black",
      icon: "⚖️",
    },
    {
      value: "90%",
      label: "Report Increased Energy",
      description: "Feel more energized throughout the day",
      shade: "gray-800",
      icon: "⚡",
    },
    {
      value: "100%",
      label: "Natural Ingredients",
      description: "No artificial additives or chemicals",
      shade: "gray-900",
      icon: "🌱",
    },
    {
      value: "12 Days",
      label: "To Better Health",
      description: "See real results in under two weeks",
      shade: "black",
      icon: "📅",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 text-black dark:text-white text-sm font-semibold rounded-full mb-6 border border-green-400 dark:border-green-500">
            Proven Results
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">
            Real Results from
            <span className="text-green-600 dark:text-green-400">
              {" "}
              Real People
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Join thousands who have already transformed their health with our
            program
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-500 hover:-translate-y-2 border border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 bg-${stat.shade} dark:bg-gray-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:bg-green-500 dark:group-hover:bg-green-600`}
              >
                <span className="text-2xl">{stat.icon}</span>
              </div>

              {/* Value */}
              <h3
                className={`text-3xl lg:text-4xl font-bold mb-2 text-green-600 dark:text-green-400`}
              >
                {stat.value}
              </h3>

              {/* Label */}
              <p className="text-black dark:text-white font-semibold text-lg mb-2">
                {stat.label}
              </p>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional social proof */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gray-50 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500 transition-colors duration-300">
            <div className="flex -space-x-2 mr-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 bg-black dark:bg-gray-700 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-xs font-bold hover:bg-green-500 dark:hover:bg-green-600 transition-colors duration-300`}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="text-gray-600 dark:text-gray-300 font-medium">
              Join 10,000+ satisfied customers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;

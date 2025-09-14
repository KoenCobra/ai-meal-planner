import CallToActionButton from "./CallToActionButton";

const CallToAction = () => {
  const features = [
    "12-day comprehensive program",
    "Expert guidance & support",
    "Natural whole food recipes",
    "Daily mindfulness exercises",
    "Shopping guides included",
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-black">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800"></div>
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Main content card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header section with gradient */}
            <div className="bg-black px-8 py-12 text-center text-white relative overflow-hidden border-b border-green-400">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
              <div className="relative z-10">
                <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-green-400">
                  <span className="text-sm font-semibold">
                    ✨ Free with Bubu AI
                  </span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Ready to Transform Your Life?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join our 12-Day Detox Program and start your journey to better
                  health today
                </p>
              </div>
            </div>

            {/* Content section */}
            <div className="px-8 lg:px-12 py-12">
              {/* Features list */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center mr-3 flex-shrink-0 hover:bg-green-500 transition-colors duration-300">
                      <svg
                        className="w-3.5 h-3.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Free access section */}
              <div className="text-center mb-12">
                <div className="inline-block bg-gray-50 border border-green-400 px-6 py-3 rounded-2xl mb-6">
                  <p className="text-lg text-green-600 font-semibold">
                    ✨ Completely FREE with Bubu AI
                  </p>
                </div>

                <div className="flex items-center justify-center gap-6 mb-6">
                  <div className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600">
                    FREE
                  </div>
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg">
                    <span className="text-sm font-bold">INCLUDED</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-8">
                  Included in your Bubu AI subscription • 7-day free trial
                  available
                </p>

                <CallToActionButton />
              </div>

              {/* Trust badges */}
              <div className="pt-8 border-t border-gray-200">
                <div className="flex justify-center items-center gap-8 text-gray-400">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span className="text-sm font-medium">Secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                    </svg>
                    <span className="text-sm font-medium">Protected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

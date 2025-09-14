"use client";

const CallToActionButton = () => {
  return (
    <button
      onClick={() => {
        window.location.href = "/bubu-ai";
      }}
      className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-black dark:text-white bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 border border-green-400 hover:border-green-500 dark:border-green-500 dark:hover:border-green-400"
    >
      Access with Bubu AI
      <svg
        className="ml-2 w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
    </button>
  );
};

export default CallToActionButton;

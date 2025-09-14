"use client";

const CallToActionButton = () => {
  return (
    <button
      onClick={() => {
        window.location.href = "/12-day-detox";
      }}
      className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
    >
      Start Your Journey Today
    </button>
  );
};

export default CallToActionButton;

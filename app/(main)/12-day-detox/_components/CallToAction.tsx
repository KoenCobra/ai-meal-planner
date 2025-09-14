import React from "react";
import CallToActionButton from "./CallToActionButton";

const CallToAction = () => {
  return (
    <section className='relative py-20 overflow-hidden'>
      {/* Background with gradient */}
      <div className='absolute inset-0 bg-gradient-to-br from-gray-50 to-teal-50'></div>

      <div className='relative container mx-auto px-4'>
        <div className='max-w-3xl mx-auto'>
          {/* Main content card */}
          <div className='bg-white rounded-2xl shadow-xl p-12 text-center'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-6'>
              Ready to Transform Your Life?
            </h2>

            <p className='text-xl text-gray-600 mb-8'>
              Join our 12-Day Detox Program today and save over $200!
            </p>

            {/* Price display */}
            <div className='space-y-4 mb-8'>
              <div className='inline-block bg-red-50 px-4 py-2 rounded-full'>
                <p className='text-xl text-red-600'>
                  <s>Regular Price: $97</s>
                </p>
              </div>

              <div className='flex items-center justify-center gap-4'>
                <div className='text-4xl md:text-5xl font-bold text-teal-600'>
                  $19
                </div>
                <div className='bg-teal-100 text-teal-800 text-sm font-semibold px-3 py-1 rounded-full'>
                  LIMITED TIME
                </div>
              </div>
            </div>

            <CallToActionButton />

            {/* Trust badges */}
            <div className='mt-8 pt-8 border-t border-gray-100'>
              <div className='flex justify-center items-center gap-6 text-gray-400'>
                <svg
                  className='w-10 h-10'
                  viewBox='0 0 24 24'
                  fill='currentColor'>
                  <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
                </svg>
                <svg
                  className='w-10 h-10'
                  viewBox='0 0 24 24'
                  fill='currentColor'>
                  <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
                </svg>
                <svg
                  className='w-10 h-10'
                  viewBox='0 0 24 24'
                  fill='currentColor'>
                  <path d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z' />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

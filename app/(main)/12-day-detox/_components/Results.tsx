import React from "react";

const Results = () => {
  return (
    <section className='py-16'>
      <div className='container mx-auto px-4'>
        <div className='max-w-3xl mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-8'>
            Transform Your Health In Just 12 Days
          </h2>
          <div className='grid md:grid-cols-3 gap-8 mb-12'>
            <div className='bg-green-50 p-6 rounded-lg'>
              <h3 className='text-2xl font-bold text-green-600 mb-2'>5+ lbs</h3>
              <p className='text-gray-600'>Average Weight Release</p>
            </div>
            <div className='bg-green-50 p-6 rounded-lg'>
              <h3 className='text-2xl font-bold text-green-600 mb-2'>90%</h3>
              <p className='text-gray-600'>Report Increased Energy</p>
            </div>
            <div className='bg-green-50 p-6 rounded-lg'>
              <h3 className='text-2xl font-bold text-green-600 mb-2'>100%</h3>
              <p className='text-gray-600'>Natural Ingredients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;

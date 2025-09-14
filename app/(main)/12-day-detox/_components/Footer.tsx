import React from "react";
import { Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className='py-8 bg-green-600 '>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center text-white text-sm font-semibold'>
          <div className='mb-4 md:mb-0'>
            © 2024 12 Day Detox. All rights reserved.
          </div>

          <div className='flex items-center gap-2'>
            <Mail className='w-4 h-4' />
            <a href='mailto:info@12daydetox.org'>info@12daydetox.org</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

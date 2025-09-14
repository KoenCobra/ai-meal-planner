import { Heart, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 border-b border-gray-800">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold text-green-400 mb-3">
                12 Day Detox
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Transform your health naturally with our science-backed wellness
                program.
              </p>
            </div>

            {/* Contact */}
            <div className="text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors border border-green-400 hover:border-green-300">
                <Mail className="w-5 h-5 text-green-400" />
                <a
                  href="mailto:info@12daydetox.org"
                  className="text-gray-300 hover:text-white transition-colors font-medium"
                >
                  info@12daydetox.org
                </a>
              </div>
            </div>

            {/* Social proof */}
            <div className="text-center md:text-right">
              <div className="inline-flex items-center gap-2 text-gray-400">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-green-400" />
                <span>for your health</span>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Join 10,000+ satisfied customers
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div>© 2024 12 Day Detox. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-green-500 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

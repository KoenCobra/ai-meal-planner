import Image from "next/image";
import CallToActionButton from "./CallToActionButton";

const Hero = () => {
  return (
    <header className="relative min-h-screen overflow-hidden">
      <Image
        src="/12-day-detox/hero.jpg"
        alt="Background image"
        fill
        priority
        className="object-cover object-center"
        quality={100}
        sizes="100vw"
      />
      {/* Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-emerald-900/40"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="text-sm font-medium text-white">
                ✨ Science-Based Wellness Program
              </span>
            </div>

            {/* Main heading with better typography */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Transform Your Health in
              <span className="block text-emerald-400">12 Days</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl sm:text-2xl text-slate-200 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Experience natural rejuvenation through whole foods and expert
              guidance. No pills, no shakes — just pure, natural transformation.
            </p>

            {/* CTA Button */}
            <div className="space-y-4">
              <CallToActionButton />
              <p className="text-sm text-slate-300">
                Join 10,000+ people who transformed their health naturally
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
    </header>
  );
};

export default Hero;

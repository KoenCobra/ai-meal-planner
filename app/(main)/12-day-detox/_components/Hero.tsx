import Image from "next/image";
import CallToActionButton from "./CallToActionButton";

const Hero = () => {
  return (
    <header className="relative min-h-dvh">
      <Image
        src="/12-day-detox/hero.jpg"
        alt="Background image"
        fill
        priority
        className="object-cover object-center fixed"
        quality={100}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container h-full mx-auto px-4">
        <div className="relative text-balance text-center z-10 flex items-center min-h-dvh justify-center flex-col">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Transform Your Health with Our 12-Day Detox Program
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Experience natural rejuvenation through whole foods and expert
              guidance. No pills, no shakes - just pure, natural transformation.
            </p>
          </div>
          <CallToActionButton />
        </div>
      </div>
    </header>
  );
};

export default Hero;

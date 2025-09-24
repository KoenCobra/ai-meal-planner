import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="max-w-6xl mx-auto text-center relative min-h-screen py-20">
      {/* Main Hero Title with Bubu AI Emphasis */}
      <div className="mb-16">
        <h1 className="text-6xl md:text-8xl font-bold mb-4">
          <span className="relative inline-block">
            <span className="text-zinc-900 dark:text-white">Bubu</span>
            <span className="ml-3 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent font-bold">
              AI
            </span>
            {/* Animated underline */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 rounded-full animate-pulse"></div>
          </span>
        </h1>

        <h2 className="text-3xl md:text-5xl font-semibold text-muted-foreground">
          Your Intelligent
          <span className="block bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
            AI-Powered Meal Planner
          </span>
        </h2>
      </div>

      <p className="text-xl md:text-2xl text-muted-foreground mb-20 max-w-4xl mx-auto leading-relaxed text-balance">
        Experience the future of cooking with{" "}
        <span className="font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
          Bubu AI
        </span>
        .<br /> Generate personalized recipes and create intelligent meal plans.{" "}
        <br /> Start your 7-day free trial today!
      </p>

      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
        <Link href="/bubu-ai" className="flex flex-col items-center">
          <Button
            size="lg"
            className="text-lg px-10 py-7 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Zap className="size-6 mr-3" />
            Experience Bubu AI
          </Button>
          <p className="text-sm text-muted-foreground mt-2 opacity-75"></p>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;

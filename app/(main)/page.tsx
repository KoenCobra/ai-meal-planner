import { Metadata } from "next";
import AppFeaturesShowcase from "./_components/AppFeaturesShowcase";
import BackgroundEffects from "./_components/BackgroundEffects";
import CTASection from "./_components/CTASection";
import FeaturesSection from "./_components/FeaturesSection";
import FloatingFeatureBadges from "./_components/FloatingFeatureBadges";
import HeroSection from "./_components/HeroSection";
import HomeFooter from "./_components/HomeFooter";
import MultiLanguageShowcase from "./_components/MultiLanguageShowcase";
import PreferencesShowcase from "./_components/PreferencesShowcase";
import PricingSection from "./_components/PricingSection";
import StackedCollage from "./_components/StackedCollage";

export const metadata: Metadata = {
  title: "Bubu AI - Your AI-Powered Recipe Builder",
  description:
    "Generate, manage, and discover delicious recipes with AI. Create custom menus, sync grocery lists, and explore endless culinary possibilities.",
};

const Home = async () => {
  return (
    <div className="relative overflow-hidden">
      <BackgroundEffects />
      <HeroSection />
      <AppFeaturesShowcase />
      <PreferencesShowcase />
      <FloatingFeatureBadges />
      <StackedCollage />
      <MultiLanguageShowcase />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
      <HomeFooter />
    </div>
  );
};

export default Home;

import Benefits from "./_components/Benefits";
import CallToAction from "./_components/CallToAction";
import Detox from "./_components/Detox";
import Footer from "./_components/Footer";
import HealthBenefits from "./_components/HealthBenefits";
import HealthyLiving from "./_components/HealthyLiving";
import Hero from "./_components/Hero";
import ProgramDetails from "./_components/ProgramDetails";
import Results from "./_components/Results";

const page = () => {
  return (
    <>
      <Hero />
      <Benefits />
      <Detox />
      <HealthyLiving />
      <HealthBenefits />
      <ProgramDetails />
      <Results />
      <CallToAction />
      <Footer />
    </>
  );
};

export default page;

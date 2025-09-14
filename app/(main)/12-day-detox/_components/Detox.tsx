import Image from "next/image";

const Detox = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="/12-day-detox/woman-bottle.jpg"
              alt="Healthy lifestyle"
              className="rounded-lg shadow-lg"
              quality={100}
              width={600}
              height={400}
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Why Your Body Needs a Detox
            </h2>
            <p className="text-gray-600 mb-4">
              In today&apos;s modern world, our bodies are constantly exposed to
              toxins through processed foods, environmental pollutants, and
              daily stress. These toxins can accumulate over time, leading to
              fatigue, weight gain, digestive issues, and a weakened immune
              system.
            </p>
            <p className="text-gray-600 mb-4">
              Our scientifically-designed detox program helps your body&apos;s
              natural cleansing processes work more effectively, allowing you to
              reset your system and optimize your health. By removing toxins and
              providing your body with essential nutrients, you&apos;ll
              experience increased energy, better digestion, and improved
              overall wellbeing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detox;

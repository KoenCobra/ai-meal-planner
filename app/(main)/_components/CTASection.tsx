import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-32 bg-gradient-to-r from-blue-600/10 via-blue-400/5 to-blue-300/10 dark:from-blue-600/20 dark:via-blue-400/10 dark:to-blue-300/20 rounded-t-lg text-balance">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-8">
          Ready to Transform Your
          <span className="block bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-blue-600 dark:text-blue-400">
            Cooking Experience?
          </span>
        </h2>
        <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
          Join the home cooks who are already using{" "}
          <span className="font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
            Bubu AI
          </span>{" "}
          to create amazing meals. Start your intelligent culinary adventure
          today.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/bubu-ai">
            <Button
              size="lg"
              className="text-lg px-10 py-7 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="size-6 mr-3" />
              Start with Bubu AI
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

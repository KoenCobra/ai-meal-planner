import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Zap } from "lucide-react";
import Link from "next/link";

const PricingSection = () => {
  return (
    <section className="py-32">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-8">
          Simple, Transparent
          <span className="block bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-blue-600 dark:text-blue-400">
            Pricing
          </span>
        </h2>
        <p className="text-xl text-muted-foreground mb-16">
          Start your culinary journey with{" "}
          <span className="font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
            Bubu AI
          </span>{" "}
          today
        </p>

        <Card className="border-2 border-blue-200/50 dark:border-blue-400/20 max-w-lg mx-auto bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                Bubu AI
              </span>{" "}
            </CardTitle>
            <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent mb-2">
              $5.99
              <span className="text-lg text-muted-foreground font-normal">
                /month
              </span>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Or $4.99/month billed annually • Cancel anytime
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-muted-foreground flex-shrink-0" />
                <span>Recipe Generation with Images</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-muted-foreground flex-shrink-0" />
                <span>Dynamic Menu Planning</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-muted-foreground flex-shrink-0" />
                <span>Save Your Favorite Recipes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-muted-foreground flex-shrink-0" />
                <span>Smart Grocery List Sync</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-muted-foreground flex-shrink-0" />
                <span>Advanced Recipe Search</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-muted-foreground flex-shrink-0" />
                <span>Nutritional Information</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-muted-foreground flex-shrink-0" />
                <span>Ingredient image recognition</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-muted-foreground flex-shrink-0" />
                <span>7-day free trial</span>
              </div>
            </div>

            <Link href="/bubu-ai" className="block">
              <Button
                className="w-full text-lg py-7 mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                size="lg"
              >
                <Zap className="size-5 mr-2" />
                Get Started with Bubu AI
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PricingSection;

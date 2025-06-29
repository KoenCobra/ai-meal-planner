import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  CheckCircle,
  Heart,
  Search,
  ShoppingCart,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bubu AI - Your AI-Powered Recipe Builder",
  description:
    "Generate, manage, and discover delicious recipes with AI. Create custom menus, sync grocery lists, and explore endless culinary possibilities.",
};

const Home = async () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-4 size-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-float-1"></div>
        <div className="absolute top-0 -right-4 size-72 bg-blue-600/10 rounded-full mix-blend-multiply filter blur-xl animate-float-2"></div>
        <div className="absolute -bottom-8 left-20 size-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl animate-float-3"></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-300/5 rounded-full mix-blend-multiply filter blur-2xl animate-float-1"
          style={{ animationDelay: "10s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 size-80 bg-blue-500/15 rounded-full mix-blend-multiply filter blur-xl animate-float-2"
          style={{ animationDelay: "15s" }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
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
            . Generate personalized recipes, create intelligent meal plans, and
            discover endless culinary possibilities with our advanced AI
            technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Link href="/bubu-ai">
              <Button
                size="lg"
                className="text-lg px-10 py-7 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Zap className="size-6 mr-3" />
                Experience Bubu AI
              </Button>
            </Link>
          </div>

          {/* Enhanced Hero Visual */}
          {/* <div className="relative mx-auto max-w-5xl">
            <div className="aspect-video bg-gradient-to-br from-blue-600/20 via-blue-400/10 to-blue-300/20 rounded-3xl border-2 border-blue-200/50 dark:border-blue-400/30 flex items-center justify-center shadow-2xl backdrop-blur-sm">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 rounded-full blur-lg opacity-50"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 p-6 rounded-full">
                    <Utensils className="size-16 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                    Bubu AI
                  </span>{" "}
                  Recipe Generation
                </h3>
                <p className="text-muted-foreground">
                  Watch AI create your perfect recipe
                </p>
              </div>
            </div>

            <div className="absolute -top-6 -left-6 bg-white/90 dark:bg-zinc-900/90 border-2 border-blue-200/50 dark:border-blue-400/30 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Clock className="size-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold">5 min</span>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white/90 dark:bg-zinc-900/90 border-2 border-blue-200/50 dark:border-blue-400/30 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Users className="size-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold">4 servings</span>
              </div>
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-zinc-900/90 border-2 border-blue-200/50 dark:border-blue-400/30 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Sparkles className="size-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                  AI Generated
                </span>
              </div>
            </div>
          </div>*/}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent rounded-lg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Everything You Need for
              <span className="block bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-blue-600 dark:text-blue-400">
                Smart Cooking
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From AI recipe generation to grocery list management,{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                Bubu AI
              </span>{" "}
              has got your entire culinary journey covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Recipe Generation */}
            <Card className="border-2 border-blue-200/50 dark:border-blue-400/20 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-2xl group bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600/10 to-blue-400/10 dark:from-blue-400/10 dark:to-blue-300/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="size-7" />
                </div>
                <CardTitle className="text-xl">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                    Bubu AI
                  </span>{" "}
                  Recipe Generation
                </CardTitle>
                <CardDescription>
                  Generate detailed recipes with step-by-step instructions,
                  ingredients, and nutritional information using advanced AI.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Detailed instructions</p>
                  <p>• Nutritional breakdown</p>
                  <p>• AI-generated images</p>
                  <p>• Ingredient image recognition</p>
                </div>
              </CardContent>
            </Card>

            {/* Recipe Management */}
            <Card className="border-2 border-blue-200/50 dark:border-blue-400/20 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-2xl group bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600/10 to-blue-400/10 dark:from-blue-400/10 dark:to-blue-300/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="size-7" />
                </div>
                <CardTitle className="text-xl">
                  Smart Recipe Management
                </CardTitle>
                <CardDescription>
                  Save, organize, and access your recipes with intelligent
                  categorization for different meal types and occasions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Breakfast</Badge>
                  <Badge variant="secondary">Lunch</Badge>
                  <Badge variant="secondary">Dinner</Badge>
                  <Badge variant="secondary">Other</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Menu Creation */}
            <Card className="border-2 border-blue-200/50 dark:border-blue-400/20 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-2xl group bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600/10 to-blue-400/10 dark:from-blue-400/10 dark:to-blue-300/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="size-7" />
                </div>
                <CardTitle className="text-xl">Custom Menu Planning</CardTitle>
                <CardDescription>
                  Create personalized menus for different occasions and add your
                  favorite recipes with AI-powered suggestions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Weekly meal planning</p>
                  <p>• Special occasion menus</p>
                  <p>• Family favorites collection</p>
                </div>
              </CardContent>
            </Card>

            {/* Grocery List Sync */}
            <Card className="border-2 border-blue-200/50 dark:border-blue-400/20 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-2xl group bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600/10 to-blue-400/10 dark:from-blue-400/10 dark:to-blue-300/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ShoppingCart className="size-7" />
                </div>
                <CardTitle className="text-xl">
                  Intelligent Grocery Lists
                </CardTitle>
                <CardDescription>
                  Automatically sync ingredients from your recipes to organized
                  grocery lists with smart quantity management.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Auto-ingredient sync</p>
                  <p>• Smart quantity tracking</p>
                  <p>• Completion tracking</p>
                </div>
              </CardContent>
            </Card>

            {/* Recipe Search */}
            <Card className="border-2 border-blue-200/50 dark:border-blue-400/20 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-2xl group bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600/10 to-blue-400/10 dark:from-blue-400/10 dark:to-blue-300/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Search className="size-7" />
                </div>
                <CardTitle className="text-xl">AI-Powered Search</CardTitle>
                <CardDescription>
                  Find recipes intelligently by ingredients, categories, dietary
                  preferences, or cooking time with advanced AI search.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Search by: ingredients, categories, time, diet</p>
                </div>
              </CardContent>
            </Card>

            {/* Theme Customization */}
            <Card className="border-2 border-blue-200/50 dark:border-blue-400/20 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-2xl group bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600/10 to-blue-400/10 dark:from-blue-400/10 dark:to-blue-300/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Star className="size-7" />
                </div>
                <CardTitle className="text-xl">Beautiful Themes</CardTitle>
                <CardDescription>
                  Personalize your cooking experience with stunning dark and
                  light themes that adapt perfectly to your preference.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-background border-2 border-blue-200/50 dark:border-blue-400/30 rounded-xl shadow-sm"></div>
                  <div className="w-10 h-10 bg-foreground border-2 border-blue-200/50 dark:border-blue-400/30 rounded-xl shadow-sm"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-4">
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
              {/* <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 rounded-2xl blur-lg opacity-30"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 rounded-2xl flex items-center justify-center w-full h-full">
                  <ChefHat className="w-10 h-10 text-white" />
                </div>
              </div> */}
              <CardTitle className="text-3xl">
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                  Bubu AI
                </span>{" "}
                Premium
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
                  <span className="text-lg">Recipe Generation with Images</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-lg">Dynamic Menu Planning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-lg">Save Your Favorite Recipes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-lg">Smart Grocery List Sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-lg">Advanced Recipe Search</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-lg">Nutritional Information</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-lg">Ingredient image recognition</span>
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

      {/* CTA Section */}
      <section className="py-32 px-4 bg-gradient-to-r from-blue-600/10 via-blue-400/5 to-blue-300/10 dark:from-blue-600/20 dark:via-blue-400/10 dark:to-blue-300/20 rounded-t-lg text-balance">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
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

      {/* Footer */}
      <footer className="py-16 px-4 bg-gradient-to-b from-blue-50/30 to-transparent dark:from-blue-950/20 dark:to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-bold">
                  <span className="text-zinc-900 dark:text-white">Bubu</span>
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent ml-1">
                    AI
                  </span>
                </h3>
              </div>
              <p className="text-muted-foreground">
                Your AI-powered culinary assistant for endless recipe
                possibilities and intelligent cooking.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-blue-700 dark:text-blue-300">
                Features
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>AI Recipe Generation</p>
                <p>Smart Menu Planning</p>
                <p>Intelligent Grocery Lists</p>
                <p>Advanced Recipe Search</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-blue-700 dark:text-blue-300">
                Support
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Help Center</p>
                <p>Contact Us</p>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-200/50 dark:border-blue-400/20 mt-12 pt-8 text-center text-muted-foreground">
            <p>
              &copy; 2025{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                Bubu AI
              </span>
              . All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

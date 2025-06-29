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
  ChefHat,
  Clock,
  Heart,
  Search,
  ShoppingCart,
  Sparkles,
  Star,
  Users,
  Utensils,
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
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-4">
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
                Culinary Assistant
              </span>
            </h2>
          </div>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed text-balance">
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
                <Zap className="w-6 h-6 mr-3" />
                Experience Bubu AI
              </Button>
            </Link>
          </div>

          {/* Enhanced Hero Visual */}
          <div className="relative mx-auto max-w-5xl">
            <div className="aspect-video bg-gradient-to-br from-blue-600/20 via-blue-400/10 to-blue-300/20 rounded-3xl border-2 border-blue-200/50 dark:border-blue-400/30 flex items-center justify-center shadow-2xl backdrop-blur-sm">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 rounded-full blur-lg opacity-50"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 p-6 rounded-full">
                    <Utensils className="w-16 h-16 text-white" />
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

            {/* Enhanced Floating Cards */}
            <div className="absolute -top-6 -left-6 bg-white/90 dark:bg-zinc-900/90 border-2 border-blue-200/50 dark:border-blue-400/30 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold">5 min</span>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white/90 dark:bg-zinc-900/90 border-2 border-blue-200/50 dark:border-blue-400/30 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold">4 servings</span>
              </div>
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-zinc-900/90 border-2 border-blue-200/50 dark:border-blue-400/30 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                  AI Generated
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Everything You Need for
              <span className="block bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
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
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-blue-600/10 to-blue-400/10 dark:from-blue-400/10 dark:to-blue-300/10 border border-blue-200/50 dark:border-blue-400/20 rounded-full">
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
              Bubu AI Pricing
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Simple, Transparent
            <span className="block bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
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
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 rounded-2xl blur-lg opacity-30"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 rounded-2xl flex items-center justify-center w-full h-full">
                  <ChefHat className="w-10 h-10 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl">
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                  Bubu AI
                </span>{" "}
                Premium
              </CardTitle>
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent mb-2">
                $4.99
                <span className="text-lg text-muted-foreground font-normal">
                  /month
                </span>
              </div>
              <CardDescription className="text-lg">
                Billed annually • Cancel anytime
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-lg">
                    <span className="font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                      Bubu AI
                    </span>{" "}
                    Recipe Generation with Images
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-lg">Dynamic Menu Planning</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-lg">Save Your Favorite Recipes</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-lg">Smart Grocery List Sync</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-lg">Advanced Recipe Search</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-lg">Nutritional Information</span>
                </div>
              </div>

              <Link href="/bubu-ai" className="block">
                <Button
                  className="w-full text-lg py-7 mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  size="lg"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Get Started with Bubu AI
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-gradient-to-r from-blue-600/10 via-blue-400/5 to-blue-300/10 dark:from-blue-600/20 dark:via-blue-400/10 dark:to-blue-300/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
              Cooking Experience?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
            Join thousands of home cooks who are already using{" "}
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
                <Sparkles className="w-6 h-6 mr-3" />
                Start with Bubu AI
              </Button>
            </Link>
            <Link href="/recipes">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 py-7 rounded-2xl border-2 border-blue-200 dark:border-blue-400/30 hover:border-blue-400 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-400/10 transition-all duration-300"
              >
                <Search className="w-6 h-6 mr-3" />
                Browse Recipes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-blue-200/50 dark:border-blue-400/20 bg-gradient-to-b from-blue-50/30 to-transparent dark:from-blue-950/20 dark:to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 rounded-xl blur-md opacity-30"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 p-2 rounded-xl">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                </div>
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
                <p>Community</p>
                <p>API Docs</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-blue-700 dark:text-blue-300">
                Company
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>About Us</p>
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
                <p>Blog</p>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-200/50 dark:border-blue-400/20 mt-12 pt-8 text-center text-muted-foreground">
            <p>
              &copy; 2024{" "}
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

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 rounded-full">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Recipe Generation
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Your AI Culinary
            <br />
            Assistant
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Generate personalized recipes with AI, organize your meal planning,
            and discover new flavors. Transform your cooking experience with
            intelligent recipe recommendations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/bubu-ai">
              <Button size="lg" className="text-lg px-8 py-6 rounded-xl">
                <ChefHat className="w-5 h-5 mr-2" />
                Start Cooking with AI
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 rounded-xl"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Explore Recipes
            </Button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative mx-auto max-w-4xl">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border-2 border-border flex items-center justify-center">
              <div className="text-center">
                <ChefHat className="w-16 h-16 mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Recipe Generation Demo</p>
              </div>
            </div>
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-card border rounded-lg p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">5 min</span>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-card border rounded-lg p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">4 servings</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need for
              <span className="text-primary"> Smart Cooking</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From AI recipe generation to grocery list management, we&apos;ve
              got your culinary journey covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Recipe Generation */}
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">AI Recipe Generation</CardTitle>
                <CardDescription>
                  Generate detailed recipes with step-by-step instructions,
                  ingredients, and nutritional information using AI.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Detailed instructions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Nutritional breakdown</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Image generation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recipe Management */}
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Recipe Management</CardTitle>
                <CardDescription>
                  Save, organize, and access your recipes with categorized
                  sections for different meal types.
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
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Custom Menus</CardTitle>
                <CardDescription>
                  Create personalized menus for different occasions and add your
                  favorite recipes to them.
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
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <ShoppingCart className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Smart Grocery Lists</CardTitle>
                <CardDescription>
                  Automatically sync ingredients from your recipes to organized
                  grocery lists for easy shopping.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Auto-ingredient sync</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Quantity tracking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Completion tracking</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recipe Search */}
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Smart Search</CardTitle>
                <CardDescription>
                  Find recipes by ingredients, categories, dietary preferences,
                  or cooking time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Search by: ingredients, categories, time, diet</p>
                </div>
              </CardContent>
            </Card>

            {/* Theme Customization */}
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Theme Customization</CardTitle>
                <CardDescription>
                  Personalize your experience with beautiful dark and light
                  themes that adapt to your preference.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-background border-2 border-border rounded-md"></div>
                  <div className="w-8 h-8 bg-foreground border-2 border-border rounded-md"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Start your culinary journey with our affordable subscription plan
          </p>

          <Card className="border-2 border-primary/20 max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Bubu AI Premium</CardTitle>
              <div className="text-4xl font-bold text-primary mb-2">
                $4.99
                <span className="text-lg text-muted-foreground font-normal">
                  /month
                </span>
              </div>
              <CardDescription>
                Billed annually • Cancel anytime
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>AI Recipe Generation with Images</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Dynamic Menu Planning</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Save Your Favorite Recipes</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Smart Grocery List Sync</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Advanced Recipe Search</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Nutritional Information</span>
                </div>
              </div>

              <Link href="/bubu-ai" className="block">
                <Button className="w-full text-lg py-6 mt-6" size="lg">
                  Get Started Today
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Cooking?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of home cooks who are already using AI to create
            amazing meals. Start your culinary adventure today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/bubu-ai">
              <Button size="lg" className="text-lg px-8 py-6 rounded-xl">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Your Free Trial
              </Button>
            </Link>
            <Link href="/recipes">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 rounded-xl"
              >
                <Search className="w-5 h-5 mr-2" />
                Browse Recipes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Bubu AI</h3>
              <p className="text-muted-foreground">
                Your AI-powered culinary assistant for endless recipe
                possibilities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Recipe Generation</p>
                <p>Menu Planning</p>
                <p>Grocery Lists</p>
                <p>Recipe Search</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Help Center</p>
                <p>Contact Us</p>
                <p>Community</p>
                <p>API Docs</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>About Us</p>
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
                <p>Blog</p>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Bubu AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

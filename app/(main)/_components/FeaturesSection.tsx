import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Heart,
  Search,
  ShoppingCart,
  Sparkles,
  Star,
} from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent rounded-lg">
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
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600/10 to-blue-400/10 dark:from-blue-400/10 dark:to-blue-300/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
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
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600/10 to-blue-400/10 dark:from-blue-400/10 dark:to-blue-300/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                <BookOpen className="size-7" />
              </div>
              <CardTitle className="text-xl">Smart Recipe Management</CardTitle>
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
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600/10 to-blue-400/10 dark:from-blue-400/10 dark:to-blue-300/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
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
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600/10 to-blue-400/10 dark:from-blue-400/10 dark:to-blue-300/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
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
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600/10 to-blue-400/10 dark:from-blue-400/10 dark:to-blue-300/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
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
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600/10 to-blue-400/10 dark:from-blue-400/10 dark:to-blue-300/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                <Star className="size-7" />
              </div>
              <CardTitle className="text-xl">Beautiful Themes</CardTitle>
              <CardDescription>
                Personalize your cooking experience with stunning dark and light
                themes that adapt perfectly to your preference.
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
  );
};

export default FeaturesSection;

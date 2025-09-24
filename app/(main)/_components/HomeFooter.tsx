const HomeFooter = () => {
  return (
    <footer className="py-16 bg-gradient-to-b from-blue-50/30 to-transparent dark:from-blue-950/20 dark:to-transparent">
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
              <p>
                <a
                  href="mailto:info@bubuaimealplanner.com"
                  className="underline font-semibold"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Contact our support team
                </a>
              </p>
              <p>
                <a
                  href="/privacy-policy"
                  className="underline font-semibold"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Privacy Policy
                </a>
              </p>
              <a
                href="/terms-of-service"
                className="underline font-semibold"
                rel="noopener noreferrer"
                target="_blank"
              >
                Terms of Service
              </a>
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
  );
};

export default HomeFooter;

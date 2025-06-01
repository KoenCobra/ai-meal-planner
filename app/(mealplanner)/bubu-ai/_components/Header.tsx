const Header = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mb-8 md:mb-12">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-4xl font-bold tracking-tight">Ask Bubu</h1>
        </div>
        <p className="text-muted-foreground text-center max-w-md">
          Your AI-powered culinary assistant. Generate delicious recipes from
          text or images.
        </p>
      </div>
    </>
  );
};

export default Header;

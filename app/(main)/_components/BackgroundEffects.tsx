const BackgroundEffects = () => {
  return (
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
  );
};

export default BackgroundEffects;

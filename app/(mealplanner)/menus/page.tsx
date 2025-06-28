import { Metadata } from "next";
import MenusOverview from "./_components/MenusOverview";

export const metadata: Metadata = {
  title: "Menus",
};

const Menus = async () => {
  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold text-center items-center gap-2 mb-4">
        Menus
      </h1>
      <MenusOverview />
    </div>
  );
};

export default Menus;

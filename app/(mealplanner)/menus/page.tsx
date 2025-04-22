import { Metadata } from "next";
import MenusOverview from "./_components/MenusOverview";

export const metadata: Metadata = {
  title: "Menus",
};

const Menus = async () => {
  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold text-center uppercase items-center gap-2 mb-8">
        Menus
      </h1>
      <MenusOverview />
    </div>
  );
};

export default Menus;

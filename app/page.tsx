import ThemeToggle from "@/components/ThemeToggle";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import React from "react";

const Home = () => {
  return (
    <div>
      <ThemeToggle />
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <SignOutButton />
      </SignedIn>
    </div>
  );
};

export default Home;

"use client";

import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import React from "react";

const LoginButton = () => {
  return (
    <SignInButton>
      <Button variant="outline">Login</Button>
    </SignInButton>
  );
};

export default LoginButton;

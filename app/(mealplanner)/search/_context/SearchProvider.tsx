"use client";

import { ReactNode } from "react";
import { SearchProvider as SearchContextProvider } from "./SearchContext";

interface SearchProviderWrapperProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderWrapperProps) => {
  return <SearchContextProvider>{children}</SearchContextProvider>;
};

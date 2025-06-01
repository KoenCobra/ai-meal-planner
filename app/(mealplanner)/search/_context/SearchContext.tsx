"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
  executeSearch: () => void;
  executedQuery: string;
};

const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [executedQuery, setExecutedQuery] = useState<string>("");

  const clearSearch = () => {
    setSearchQuery("");
    setExecutedQuery("");
  };

  const executeSearch = () => {
    setExecutedQuery(searchQuery.trim());
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        clearSearch,
        executeSearch,
        executedQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

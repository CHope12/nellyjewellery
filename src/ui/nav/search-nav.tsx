"use client";

import { SearchInput, SearchInputPlaceholder } from "@/ui/nav/search-input.client";
import { SearchIcon } from "lucide-react";
import { Suspense, useState, useRef, useEffect } from "react";

export const SearchNav = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchContainerRef = useRef<HTMLLabelElement>(null);
  
  const toggleSearch = () => {
    setIsSearchVisible(prev => !prev);
  };

  // Handle clicks outside the search component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSearchVisible &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchVisible(false);
      }
    };

    // Add event listener when search is visible
    if (isSearchVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchVisible]);

  return (
    <label className="flex w-full items-center min-w-52 justify-end relative select-none" ref={searchContainerRef}>
      <span className="sr-only">Search</span>
      {isSearchVisible && (
        <Suspense fallback={<SearchInputPlaceholder placeholder="Search..." />}>
          <SearchInput placeholder="Search..." />
        </Suspense>
      )}
      <SearchIcon 
        className="xs:-ml-7 max-smb:cursor-pointer max-smb:z-10 block h-5 w-5" 
        onClick={toggleSearch}
      />
    </label>
  );
};
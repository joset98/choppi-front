"use client";

import { useState, useTransition, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function StoreSearchAlt() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Sync local state with URL params when they change (e.g., browser back/forward)
    const urlSearch = searchParams.get("search") || "";
    if (urlSearch !== search) {
      setSearch(urlSearch);
    }
  }, [searchParams, search]);

  // Method 1: Using createQueryString helper (Recommended)
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  // Method 2: Using URLSearchParams directly
  const updateSearchParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      // Reset to page 1 on new search
      params.delete("page");

      return params.toString();
    },
    [searchParams]
  );

  // Method 3: Using window.history.replaceState (Alternative approach)
  const handleSearchHistoryAPI = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.delete("page");

    // Use history API instead of Next.js router
    window.history.replaceState(null, "", `${pathname}?${params.toString()}`);

    // Trigger a re-render by updating search params
    // This would need additional logic to trigger the search
    startTransition(() => {
      router.refresh(); // Force re-render
    });
  };

  // Method 4: Using router.replace (Similar to push but doesn't add to history)
  const handleSearchReplace = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.delete("page");

    startTransition(() => {
      router.replace(`/stores?${params.toString()}`);
    });
  };

  // Method 5: Using Next.js 13+ searchParams manipulation
  const handleSearchNextJS13 = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      newSearchParams.set('search', value.trim());
    } else {
      newSearchParams.delete('search');
    }

    newSearchParams.delete('page'); // Reset page on new search

    startTransition(() => {
      router.push(`${pathname}?${newSearchParams.toString()}`);
    });
  };

  const handleSearch = (value: string) => {
    setSearch(value);

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for debounced search
    timeoutRef.current = setTimeout(() => {
      // Choose your preferred method:

      // Method 1: Using helper function
      const queryString = updateSearchParams("search", value);
      startTransition(() => {
        router.push(`/stores?${queryString}`);
      });

      // Method 2: Using router.replace (doesn't add to history)
      // handleSearchReplace(value);

      // Method 3: Using history API
      // handleSearchHistoryAPI(value);

      // Method 4: Next.js 13+ style
      // handleSearchNextJS13(value);
    }, 3000); // Wait 3 seconds after user stops typing before triggering search
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Buscar tiendas por nombre, ciudad..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-9"
        disabled={isPending}
      />
    </div>
  );
}
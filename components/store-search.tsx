"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function StoreSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    // Sync local state with URL params when they change (e.g., browser back/forward)
    const urlSearch = searchParams.get("search") || "";
    if (urlSearch !== search) {
      setSearch(urlSearch);
    }
  }, [searchParams, search]);

  const handleSearch = (value: string) => {
    setSearch(value);

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.delete("page"); // Reset to page 1 on new search

    startTransition(() => {
      router.push(`/stores?${params.toString()}`);
    });
  };

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
        autoFocus={false}
      />
    </div>
  );
}

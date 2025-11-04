// 'use client'

import { Suspense } from "react";
import { StoreList } from "@/components/store-list";
import { StoreSearch } from "@/components/store-search";
import { Skeleton } from "@/components/ui/skeleton";

export default function StoresPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Tiendas</h1>
          <p className="text-muted-foreground text-lg">
            Explora nuestro catálogo de tiendas asociadas
          </p>
        </div>

        <StoreSearch />

        <Suspense fallback={<StoreListSkeleton />}>
          <StoreList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

function StoreListSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}

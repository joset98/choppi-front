import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Store } from "@/lib/types";
import { StoreProductList } from "@/components/store-product-list";
import { MapPin, StoreIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

async function getStore(id: string): Promise<Store> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_INTERNAL_API_URL || 'http://localhost:3000'}/api/stores/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      notFound();
    }

    return res.json();
  } catch (error: any) {
    console.error({ error });
    return {} as Store;
  }
}

export default async function StorePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string; inStock?: string }>;
}) {
  const { id } = await params;

  const store = await getStore(id);

  return (
    <div className="min-h-screen">
      {/* Store Header */}
      <div className="bg-gradient-to-br from-primary/5 to-background border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative h-48 w-full md:w-64 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={store?.imageUrl || "/placeholder.svg"}
                alt={store.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <StoreIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-balance">
                    {store.name}
                  </h1>
                  <p className="text-muted-foreground text-pretty mt-1">
                    {store.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {store.address}, {store.city}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<ProductListSkeleton />}>
          <StoreProductList storeId={id} searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

function ProductListSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-48" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

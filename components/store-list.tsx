import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";
import type { PaginatedResponse, Store } from "@/lib/types";
import { Pagination } from "@/components/pagination";

async function getStores(
  page: number,
  search: string,
): Promise<PaginatedResponse<Store>> {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: "20",
  });

  if (search) {
    params.set("search", search);
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_INTERNAL_API_URL || 'http://localhost:3000'}/api/stores?${params}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch stores");
  }

  return  res.json();
}

export async function StoreList({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = Number.parseInt(params.page || "1");
  const search = params.search || "";

  const { data: stores, pagination } = await getStores(page, search);

  if (stores.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No se encontraron tiendas</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <Link key={store.id} href={`/stores/${store.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={store.imageUrl || "/placeholder.svg"}
                  alt={store.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-balance">{store.name}</CardTitle>
                <CardDescription className="text-pretty line-clamp-2">
                  {store.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{store.city}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
        baseUrl="/stores"
        searchParams={params}
      />
    </div>
  );
}

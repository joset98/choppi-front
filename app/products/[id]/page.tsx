import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Package, Store } from "lucide-react";
import type { ProductWithStores } from "@/lib/types";
import { ProductStoreCard } from "@/components/product-store-card";

async function getProduct(id: string): Promise<ProductWithStores> {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="relative h-96 rounded-lg overflow-hidden bg-muted">
            <Image
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-3">{product.category}</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-balance mb-3">
                {product.name}
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Package className="h-4 w-4" />
              <span>Disponible en {product.stores.length} tiendas</span>
            </div>
          </div>
        </div>

        {/* Available in Stores */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Disponible en estas tiendas</h2>

          {product.stores.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <Store className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Este producto no está disponible en ninguna tienda actualmente
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.stores.map((storeProduct) => (
                <ProductStoreCard
                  key={storeProduct.id}
                  storeProduct={storeProduct}
                  productName={product.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

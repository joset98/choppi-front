"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Package } from "lucide-react";
import type { PaginatedResponse } from "@/lib/types";
import { Pagination } from "@/components/pagination";
import { useCart } from "@/components/cart-provider";
import { useToast } from "@/hooks/use-toast";

interface StoreProductWithProduct {
  id: string;
  storeId: string;
  productId: string;
  price: number;
  stock: number;
  inStock: boolean;
  product: {
    id: string;
    name: string;
    description: string;
    category: string;
    imageUrl?: string;
  };
}

export function StoreProductList({
  storeId,
  searchParams,
}: {
  storeId: string;
  searchParams: Promise<{ page?: string; inStock?: string }>;
}) {
  const [products, setProducts] =
    useState<PaginatedResponse<StoreProductWithProduct> | null>(null);
  const [params, setParams] = useState<{ page?: string; inStock?: string }>({});
  const [inStockOnly, setInStockOnly] = useState(true);
  const [storeName, setStoreName] = useState("");
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    searchParams.then(setParams);
  }, [searchParams]);

  useEffect(() => {
    const page = params.page || "1";
    const inStock = params.inStock === "true";
    setInStockOnly(inStock);

    const fetchProducts = async () => {
      try {
        const queryParams = new URLSearchParams({
          page,
          pageSize: "10",
        });

        if (inStock) {
          queryParams.set("inStock", "true");
        }

        const res = await fetch(
          `/api/stores/${storeId}/products?${queryParams}`,
        );

        if (!res.ok) {
          console.error("Error fetching products:", res.statusText);
          return;
        }
        
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchStore = async () => {
      try {
        const res = await fetch(`/api/stores/${storeId}`);

        if (!res.ok) {
          console.error("Error fetching store:", res.statusText);
          return;
        }

        const store = await res.json();
        setStoreName(store.name);
      } catch (error) {
        console.error("Error fetching store:", error);
      }
    };

    fetchProducts();
    fetchStore();
  }, [storeId, params]);

  const handleInStockToggle = (checked: boolean) => {
    const newParams = new URLSearchParams(params);
    if (checked) {
      newParams.set("inStock", "true");
    } else {
      newParams.delete("inStock");
    }
    newParams.delete("page");
    window.history.pushState({}, "", `?${newParams.toString()}`);
    setParams(Object.fromEntries(newParams));
  };

  const handleAddToCart = (storeProduct: StoreProductWithProduct) => {
    addItem({
      storeProductId: storeProduct.id,
      quantity: 1,
      productName: storeProduct.product.name,
      storeName: storeName,
      price: storeProduct.price,
    });

    toast({
      title: "Producto agregado",
      description: `${storeProduct.product.name} agregado al carrito`,
    });
  };

  if (!products) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Productos</h2>
        <div className="flex items-center gap-2">
          <Switch
            id="inStock"
            checked={inStockOnly}
            onCheckedChange={handleInStockToggle}
          />
          <Label htmlFor="inStock" className="cursor-pointer">
            Solo en stock
          </Label>
        </div>
      </div>

      {products.data.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No hay productos disponibles</p>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.data.map((storeProduct) => (
              <Card key={storeProduct.id} className="flex flex-col">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <Image
                      src={storeProduct.product?.imageUrl || "/placeholder.svg"}
                      alt={storeProduct.product.name}
                      fill
                      className="object-cover"
                    />
                    {storeProduct.inStock && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <Badge variant="secondary">Sin stock</Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex-1 pt-4">
                  <Link href={`/products/${storeProduct.product.id}`}>
                    <CardTitle className="text-base hover:text-primary transition-colors text-balance line-clamp-2">
                      {storeProduct.product.name}
                    </CardTitle>
                  </Link>
                  <Badge variant="outline" className="mt-2">
                    {storeProduct.product.category}
                  </Badge>
                  <p className="text-2xl font-bold mt-3">
                    ${storeProduct.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Stock: {storeProduct.stock} unidades
                  </p>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button
                    className="w-full"
                    disabled={!!storeProduct.inStock}
                    onClick={() => handleAddToCart(storeProduct)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Agregar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Pagination
            currentPage={products.pagination.page}
            totalPages={products.pagination.totalPages}
            baseUrl={`/stores/${storeId}`}
            searchParams={params}
          />
        </>
      )}
    </div>
  );
}

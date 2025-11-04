"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { useToast } from "@/hooks/use-toast";

interface StoreProduct {
  id: string;
  price: number;
  stock: number;
  inStock: boolean;
  store: {
    id: string;
    name: string;
    city: string;
  };
}

interface ProductStoreCardProps {
  storeProduct: StoreProduct;
  productName: string;
}

export function ProductStoreCard({
  storeProduct,
  productName,
}: ProductStoreCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem({
      storeProductId: storeProduct.id,
      quantity: 1,
      productName: productName,
      storeName: storeProduct.store.name,
      price: storeProduct.price,
    });

    toast({
      title: "Producto agregado",
      description: `${productName} de ${storeProduct.store.name} agregado al carrito`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-balance">
          {storeProduct.store.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="text-pretty">{storeProduct.store.city}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">
              ${storeProduct.price.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">
              {storeProduct.inStock
                ? `Stock: ${storeProduct.stock}`
                : "Sin stock"}
            </p>
          </div>
          {storeProduct.inStock && (
            <Badge variant="secondary">Disponible</Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            className="flex-1"
            disabled={!storeProduct.inStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Agregar
          </Button>
          <Button asChild variant="outline">
            <Link href={`/stores/${storeProduct.store.id}`}>Ver tienda</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

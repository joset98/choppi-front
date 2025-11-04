"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil, Plus } from "lucide-react";
import type { Product } from "@/lib/types";

export function ProductManagement() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    // Fetch all products - in real app would paginate
    const res = await fetch("/api/products?pageSize=100");
    const productsData = await res.json();

    setProducts(productsData.data);
  };


  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Productos</h2>
        <Button onClick={() => router.push('/admin/products/create')}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Button>
      </div>

      {products.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Productos del Sistema</CardTitle>
            <CardDescription>
              Los productos se gestionan a través de las relaciones con las
              tiendas. Usa este panel para crear productos base que luego podrás
              asociar a tiendas específicas con precios y stock.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p>Crea un nuevo producto usando el botón "Nuevo Producto"</p>
              <p className="text-sm mt-2">
                Los productos creados estarán disponibles para asociar a tiendas
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle className="text-lg text-balance">
                {product.name}
              </CardTitle>
              <CardDescription className="text-pretty line-clamp-2">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                >
                  <Pencil className="mr-2 h-3 w-3" />
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

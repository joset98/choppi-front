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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Store } from "@/lib/types";

export function StoreManagement() {
  const router = useRouter();
  const [stores, setStores] = useState<Store[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    const res = await fetch("/api/stores?pageSize=100");
    const data = await res.json();
    setStores(data.data);
  };


  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta tienda?")) return;

    const res = await fetch(`/api/admin/stores/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast({ title: "Tienda eliminada exitosamente" });
      fetchStores();
    } else {
      toast({ title: "Error al eliminar tienda", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Tiendas</h2>
        <Button onClick={() => router.push('/admin/stores/create')}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Tienda
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stores.map((store) => (
          <Card key={store.id}>
            <CardHeader>
              <CardTitle className="text-lg text-balance">
                {store.name}
              </CardTitle>
              <CardDescription className="text-pretty line-clamp-2">
                {store.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{store.city}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/admin/stores/${store.id}/edit`)}
                >
                  <Pencil className="mr-2 h-3 w-3" />
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(store.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StoreManagement } from "@/components/admin/store-management";
import { ProductManagement } from "@/components/admin/product-management";
import { Shield } from "lucide-react";

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Panel de Administración
            </h1>
            <p className="text-muted-foreground">
              Gestiona tiendas y productos
            </p>
          </div>
        </div>

        <Tabs defaultValue="stores" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="stores">Tiendas</TabsTrigger>
            <TabsTrigger value="products">Productos</TabsTrigger>
          </TabsList>

          <TabsContent value="stores" className="space-y-4">
            <StoreManagement />
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <ProductManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

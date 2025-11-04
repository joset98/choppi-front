import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Store, Package, ShoppingBag } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl font-bold tracking-tight text-balance">
              Bienvenido a Choppi
            </h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Tu marketplace de confianza. Encuentra productos de múltiples
              tiendas en un solo lugar.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button asChild size="lg">
                <Link href="/stores">
                  <Store className="mr-2 h-5 w-5" />
                  Explorar Tiendas
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Store className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Múltiples Tiendas</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Accede a productos de diferentes tiendas en una sola plataforma
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Amplio Catálogo</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Miles de productos organizados por categorías para tu comodidad
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Compra Fácil</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Carrito inteligente que calcula precios en tiempo real
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h2 className="text-3xl font-bold text-balance">
              Comienza a explorar ahora
            </h2>
            <p className="text-muted-foreground text-pretty">
              Descubre las mejores ofertas y productos de tiendas locales
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link href="/stores">Ver Todas las Tiendas</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

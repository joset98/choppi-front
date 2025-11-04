"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Store, LogOut, User } from "lucide-react";
import { useCart } from "@/components/cart-provider";

export function Header() {
  const { user, logout } = useAuth();
  const { toggleCart, itemCount } = useCart();

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Store className="h-6 w-6 text-primary" />
          <span>Choppi</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/stores"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Tiendas
          </Link>
          {user && (
            <Link
              href="/admin"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCart}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {itemCount}
              </span>
            )}
          </Button>

          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => logout()}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button asChild variant="default" size="sm">
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

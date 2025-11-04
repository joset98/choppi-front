"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { X, Plus, Minus, ShoppingBag, Loader2 } from "lucide-react";
import Image from "next/image";
import type { CartQuoteResponse } from "@/lib/types";

export function CartSidebar() {
  const { items, isOpen, closeCart, updateQuantity, removeItem } = useCart();
  const [quote, setQuote] = useState<CartQuoteResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      setQuote(null);
      return;
    }

    const fetchQuote = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/cart/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            items.map((item) => ({
              storeProductId: item.storeProductId,
              quantity: item.quantity,
            })),
          ),
        });

        if (!response.ok) {
          console.error("Error fetching quote:", response.statusText);
          return;
        }

        const data = await response.json();
        setQuote(data);
      } catch (error) {
        console.error("Error fetching quote:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuote();
  }, [items]);

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Carrito de Compras
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Tu carrito está vacío
            </h3>
            <p className="text-sm text-muted-foreground text-pretty">
              Agrega productos desde las tiendas para comenzar tu compra
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto px-6">
              <div className="space-y-4 py-4">
                {quote?.items.map((item) => {
                  const cartItem = items.find(
                    (i) => i.storeProductId === item.storeProductId,
                  );
                  if (!cartItem) return null;

                  return (
                    <div key={item.storeProductId} className="flex gap-4">
                      <div className="relative h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src="/placeholder.svg?height=80&width=80"
                          alt={item?.product.name || 'product'}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 space-y-1">
                        <h4 className="font-medium text-sm leading-tight text-balance">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {item.store.name}
                        </p>
                        <p className="text-sm font-semibold">
                          ${item.price?.toLocaleString()}
                        </p>

                        <div className="flex items-center gap-2 pt-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 bg-transparent"
                            onClick={() =>
                              updateQuantity(
                                item.storeProductId,
                                item.quantity - 1,
                              )
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 bg-transparent"
                            onClick={() =>
                              updateQuantity(
                                item.storeProductId,
                                item.quantity + 1,
                              )
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => removeItem(item.storeProductId)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <p className="text-sm font-semibold">
                          ${item.subtotal.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              </div>

            <div className="border-t p-6 space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : quote ? (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">
                        ${quote.subtotal?.toLocaleString()}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${quote.total?.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Proceder al Pago
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Los precios incluyen impuestos cuando corresponda
                  </p>
                </>
              ) : null}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";

interface CartItem {
  storeProductId: string;
  quantity: number;
  productName: string;
  storeName: string;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (storeProductId: string) => void;
  updateQuantity: (storeProductId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("choppi_cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("choppi_cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.storeProductId === item.storeProductId,
      );
      if (existing) {
        return prev.map((i) =>
          i.storeProductId === item.storeProductId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        );
      }
      return [...prev, item];
    });
    setIsOpen(true);
  };

  const removeItem = (storeProductId: string) => {
    setItems((prev) => prev.filter((i) => i.storeProductId !== storeProductId));
  };

  const updateQuantity = (storeProductId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(storeProductId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.storeProductId === storeProductId ? { ...i, quantity } : i,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  const itemCount = items?.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

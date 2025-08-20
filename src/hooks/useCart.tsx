import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  size?: string;
  color?: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size?: string, color?: string) => void;
  updateQuantity: (id: string, size: string | undefined, color: string | undefined, quantity: number) => void;
  clearCart: () => void;
  totalQuantity: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const LOCAL_STORAGE_KEY = "luxe_cart_v1";

function makeKey(id: string, size?: string, color?: string) {
  return [id, size ?? "", color ?? ""].join("|");
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const index = prev.findIndex((it) => makeKey(it.id, it.size, it.color) === makeKey(newItem.id, newItem.size, newItem.color));
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { ...updated[index], quantity: updated[index].quantity + newItem.quantity };
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (id: string, size?: string, color?: string) => {
    setItems((prev) => prev.filter((it) => makeKey(it.id, it.size, it.color) !== makeKey(id, size, color)));
  };

  const updateQuantity = (id: string, size: string | undefined, color: string | undefined, quantity: number) => {
    setItems((prev) =>
      prev.map((it) => (makeKey(it.id, it.size, it.color) === makeKey(id, size, color) ? { ...it, quantity: Math.max(1, quantity) } : it))
    );
  };

  const clearCart = () => setItems([]);

  const totalQuantity = useMemo(() => items.reduce((sum, it) => sum + it.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, it) => sum + it.price * it.quantity, 0), [items]);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalQuantity,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};



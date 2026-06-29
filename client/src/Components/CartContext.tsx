import React from "react";

import { createContext, useState, useContext, ReactNode, FC } from "react";
import type { User } from "../models/User";
type AuthResult = {
  success: boolean;
  error?: string;
};

type AuthContextType = {
  user: User | null;
  signUp: (email: string, password: string) => AuthResult;
  login: (email: string, password: string) => AuthResult;
  logout: () => void;
};

const CartContext = createContext(null);

type Props = {
  children: ReactNode;
};

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(productId: number) {
    const existing = cartItems.find((item) => item.id === productId);
    if (existing) {
      const current = -existing.quantity;
      const updated = cartItems.map((item) =>
        item.id === productId ? { id: productId, quantity: current + 1 } : item,
      );

      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart }} x>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  return context;
}

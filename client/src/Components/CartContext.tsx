import {
  createContext,
  useState,
  useContext,
  ReactNode,
  FC,
  useEffect,
} from "react";
import type { User } from "../models/User";
import { ApiProduct } from "../api/product";

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
      const current = existing.quantity;
      const updated = cartItems.map((item) =>
        item.id === productId ? { id: productId, quantity: current + 1 } : item,
      );

      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
  }

  async function getCartItemsWithProducts() {
    const api = new ApiProduct();

    const items = await Promise.all(
      cartItems.map(async (item) => {
        const product = await api.fetchProductById(item.id);

        return {
          ...item,
          product,
        };
      }),
    );
    return items;
  }

  function removeFromCart(productId: number): void {
    setCartItems(cartItems.filter((item) => item.id !== productId));
    return;
  }

  function updateQuantity(productId: number, quantity: number): number {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  }

  async function getCartTotal() {
    const results = await Promise.all(
      cartItems.map(async (item) => {
        const product = await new ApiProduct().fetchProductById(item.id);

        return Number(product.price) * item.quantity;
      }),
    );
    return results.reduce((sum, value) => sum + value, 0);
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        getCartItemsWithProducts,
        removeFromCart,
        updateQuantity,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  return context;
}

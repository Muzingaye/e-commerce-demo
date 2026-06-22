export type CartItem = {
  id: number;
  quantity: number;
};

export type CartContextType = {
  addToCart: (id: number) => void;
  cartItems: CartItem[];
};

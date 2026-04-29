import { create } from "zustand";

export interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) => i.menuItemId === item.menuItemId
      );

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.menuItemId === item.menuItemId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        };
      }

      return {
        items: [...state.items, { ...item, quantity: 1 }]
      };
    }),

  removeFromCart: (menuItemId) =>
    set((state) => ({
      items: state.items.filter((i) => i.menuItemId !== menuItemId)
    })),

  updateQuantity: (menuItemId, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.menuItemId === menuItemId ? { ...i, quantity } : i
      )
    })),

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    const { items } = get();
    return items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
}));
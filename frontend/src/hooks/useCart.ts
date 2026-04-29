import { create } from "zustand";

interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addToCart: (item) =>
    set((state) => {
      const existing = state.items.find(i => i.menuItemId === item.menuItemId);

      if (existing) {
        return {
          items: state.items.map(i =>
            i.menuItemId === item.menuItemId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        };
      }

      return { items: [...state.items, item] };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter(i => i.menuItemId !== id)
    })),

  clearCart: () => set({ items: [] })
}));
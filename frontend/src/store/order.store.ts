import { create } from "zustand";

interface OrderState {
  currentOrder: any;
  setOrder: (order: any) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  currentOrder: null,
  setOrder: (order) => set({ currentOrder: order })
}));
import { create } from 'zustand';
import { Sneaker } from '@/data/sneakers';

interface CartState {
  items: Sneaker[];
  addItem: (item: Sneaker) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => {
    // Only allow adding one of each since it's second-hand
    if (state.items.find((i) => i.id === item.id)) {
      return state;
    }
    return { items: [...state.items, item] };
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id)
  })),
  clearCart: () => set({ items: [] }),
  totalPrice: () => {
    return get().items.reduce((total, item) => total + item.price, 0);
  }
}));

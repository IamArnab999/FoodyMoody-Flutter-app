
'use client';

import type { Meal } from '@/lib/types';
import * as React from 'react';

export type CartItem = {
  meal: Meal;
  quantity: number;
};

type Cart = {
  items: CartItem[];
  addItem: (meal: Meal) => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = React.createContext<Cart | undefined>(undefined);

export function useCart() {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);

  const addItem = (meal: Meal) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.meal.id === meal.id
      );
      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      } else {
        return [...prevItems, { meal, quantity: 1 }];
      }
    });
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.meal.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ items, addItem, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

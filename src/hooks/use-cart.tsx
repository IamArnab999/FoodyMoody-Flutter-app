'use client';
import { CartBloc, CartState } from '@/lib/bloc/cart.bloc';
import { useBloc } from '@/hooks/use-bloc';
import * as React from 'react';
import type { Meal } from '@/lib/types';

export type CartItem = {
  meal: Meal;
  quantity: number;
};

// The BLoC instance
const cartBloc = new CartBloc();

// React Context to provide the BLoC to the component tree
const CartBlocContext = React.createContext<CartBloc | undefined>(undefined);

// Custom hook to access the CartBloc instance
export function useCartBloc() {
  const context = React.useContext(CartBlocContext);
  if (context === undefined) {
    throw new Error('useCartBloc must be used within a CartProvider');
  }
  return context;
}

// Custom hook that combines useCartBloc and useBloc to get the cart state
export function useCart() {
    const cartBloc = useCartBloc();
    const cartState = useBloc(cartBloc);

    return {
        items: cartState.items,
        totalItems: cartState.items.reduce((total, item) => total + item.quantity, 0),
        totalPrice: cartState.items.reduce((total, item) => total + item.meal.price * item.quantity, 0),
        addItem: (meal: Meal) => cartBloc.add(meal),
    }
}


export function CartProvider({ children }: { children: React.ReactNode }) {
  return (
    <CartBlocContext.Provider value={cartBloc}>
      {children}
    </CartBlocContext.Provider>
  );
}

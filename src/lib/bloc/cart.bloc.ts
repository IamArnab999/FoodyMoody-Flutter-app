import type { Meal } from '@/lib/types';
import { Bloc } from './bloc.base';

export type CartItem = {
  meal: Meal;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export class CartBloc extends Bloc<CartState> {
  constructor() {
    super({ items: [] });
  }

  public add(meal: Meal) {
    const currentItems = this.currentState.items;
    const existingItemIndex = currentItems.findIndex(
      (item) => item.meal.id === meal.id
    );

    let newItems: CartItem[];

    if (existingItemIndex > -1) {
      newItems = [...currentItems];
      const existingItem = newItems[existingItemIndex];
      newItems[existingItemIndex] = { ...existingItem, quantity: existingItem.quantity + 1 };
    } else {
      newItems = [...currentItems, { meal, quantity: 1 }];
    }
    
    this.emit({ items: newItems });
  }
}

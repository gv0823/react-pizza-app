import { PizzaDocument } from './Pizza';


export type PizzaSize = "personal" | "regular" | "large" | "extraLarge";

export interface CartItem extends PizzaDocument {
  quantity: number;
  isExtraCheese: boolean;
  size: PizzaSize
}

export interface PizzaPrice {
  size: {[key: string]:number};
  extraCheese: number;
}

export type Cart = CartItem[];
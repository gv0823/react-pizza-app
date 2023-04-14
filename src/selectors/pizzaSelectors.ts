import { createSelector } from '@reduxjs/toolkit';
import { Cart, CartItem } from '../models/Cart';

export const getCart = (state: any) => state.pizza.cart;
export const getAllPizzas = (state: any) => state.pizza.pizzas;
export const getPizzaPrice = (state: any) => state.pizza.pizzaPrice;
export const getServiceMethod = (state: any) => state.pizza.serviceMethod;

export const getCartCount = createSelector([getCart],
    (cart) => cart.reduce((total: any, cartItem: CartItem) => {
        return total + cartItem.quantity;
    }, 0)
);

export const getTotalPrice = createSelector([getCart],
    (cart) => cart.reduce((total: any, cartItem: CartItem) => {
        return total + cartItem.quantity * cartItem.price;
    }, 0));

export const getTotalCartCount = (cart: Cart) => cart.reduce((total: any, cartItem: CartItem) => {
    return total + cartItem.quantity;
}, 0);

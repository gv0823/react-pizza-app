import { render, screen } from '@testing-library/react';
import { Cart, CartItem, PizzaPrice } from '../models/Cart';
import { calculatePrice, compareCartItem } from './pizzaSlice';

describe('Test Pizza Order', () => {
    it("if existing cart with the item return the index else return -1.", () => {
        const expectedIndex = 1;
        const expectedNotFoundIndex = -1;

        const mockCartItem: CartItem = {
            quantity: 1,
            isExtraCheese: false,
            size: 'personal',
            _id: '2',
            __v: 0,
            name: 'veggie pizza',
            price: 10
        };

        const mockNotFoundCartItem: CartItem = {
            quantity: 1,
            isExtraCheese: false,
            size: 'personal',
            _id: '3',
            __v: 0,
            name: 'veggie pizza',
            price: 10
        };

        const mockPreviousCart: Cart = [{
            quantity: 1,
            isExtraCheese: false,
            size: 'personal',
            _id: '1',
            __v: 0,
            name: 'veggie pizza',
            price: 10
        },
        {
            quantity: 1,
            isExtraCheese: false,
            size: 'personal',
            _id: '2',
            __v: 0,
            name: 'veggie pizza',
            price: 10
        }];

        const actualIndex = compareCartItem(mockPreviousCart, mockCartItem);
        expect(actualIndex).toEqual(expectedIndex);
        const actualNotFoundIndex = compareCartItem(mockPreviousCart, mockNotFoundCartItem);
        expect(actualNotFoundIndex).toEqual(expectedNotFoundIndex);
    });

    it("calculate pizza total price.", () => {

        const expectedPrice = 10;
        const expectedLargePizzaPrice = 20;
        const mockLargePizzaWithExtraCheesePrice = 25;
        const mockCartItem: CartItem = {
            quantity: 1,
            isExtraCheese: false,
            size: 'personal',
            _id: '3',
            __v: 0,
            name: 'veggie pizza',
            price: 10
        };
        const pizzaPrice: PizzaPrice = {
            size: {
                "regular": 5,
                "large": 10,
                "extraLarge": 15,
            },
            extraCheese: 5,
        };

        const mockLargePizza: CartItem = {
            quantity: 1,
            isExtraCheese: false,
            size: 'large',
            _id: '3',
            __v: 0,
            name: 'veggie pizza',
            price: 10
        };

        const mockLargePizzaWithExtraCheese: CartItem = {
            quantity: 1,
            isExtraCheese: true,
            size: 'large',
            _id: '3',
            __v: 0,
            name: 'veggie pizza',
            price: 10
        };

        const actualPrice = calculatePrice(mockCartItem, pizzaPrice);
        expect(actualPrice).toEqual(expectedPrice);
        const actualLargePizzaPrice = calculatePrice(mockLargePizza, pizzaPrice);
        expect(actualLargePizzaPrice).toEqual(expectedLargePizzaPrice);
        const actualLargePizzaWithExtraCheesePrice = calculatePrice(mockLargePizzaWithExtraCheese, pizzaPrice);
        expect(actualLargePizzaWithExtraCheesePrice).toEqual(mockLargePizzaWithExtraCheesePrice);
    });
});
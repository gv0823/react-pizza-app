import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, CartItem, PizzaPrice } from '../models/Cart';
import { PizzaDocument } from '../models/Pizza';
import pizzaService from '../services/pizza.service';

export { };

interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export enum ServiceMethod {
  DELIVERY = "Delivery",
  TAKE_AWAY = "Take Away"
}

interface PizzaState extends AsyncState {
  pizzas: PizzaDocument[];
  cart: Cart;
  pizzaPrice: PizzaPrice;
  serviceMethod: string;
  isOrderSuccess: boolean;
}

const pizzaPrice: PizzaPrice = {
  size: {
    "regular": 5,
    "large": 10,
    "extraLarge": 15,
  },
  extraCheese: 5,
};

const initialState: PizzaState = {
  pizzas: [],
  cart: [],
  serviceMethod: '',
  pizzaPrice: pizzaPrice,
  isLoading: false,
  isSuccess: false,
  isError: false,
  isOrderSuccess: false,
};

export const updateCart = (
  cart: Cart,
  cartItem: CartItem,
  pizzaPrice: PizzaPrice
) => {
  let newCart: Cart = [];
  const previousCart = [...cart];
  let newCartItem = Object.assign({}, cartItem);
  let price = calculatePrice(newCartItem, pizzaPrice);
  if (newCartItem.price !== price) {
    newCartItem.price = price;
  }
  if (previousCart.length <= 0) {
    newCart.push(newCartItem);
  } else {
    const index = compareCartItem(previousCart, newCartItem);
    if (index >= 0) {
      previousCart[index].quantity = previousCart[index].quantity + newCartItem.quantity;
      newCart = [...previousCart];
    } else {
      newCart = [...previousCart, newCartItem];
    }
  }
  return newCart;
};

export const calculatePrice = (cartItem: CartItem, pizzaPrice: PizzaPrice): number => {
  let totalPrice = cartItem.price;

  if (cartItem.isExtraCheese) {
    totalPrice += pizzaPrice.extraCheese;
  }

  if (cartItem.size === "regular") {
    totalPrice += pizzaPrice.size.regular;
  }
  if (cartItem.size === "large") {
    totalPrice += pizzaPrice.size.large;
  }
  if (cartItem.size === "extraLarge") {
    totalPrice += pizzaPrice.size.extraLarge;
  }
  return totalPrice;
}

export const compareCartItem = (previousCart: Cart, cartItem: CartItem): number => {
  let index = -1;

  index = previousCart.findIndex((preCart) => (
    preCart._id === cartItem._id &&
    preCart.isExtraCheese === cartItem.isExtraCheese &&
    preCart.size === cartItem.size
  ));

  return index;
}

export const getPizzas = createAsyncThunk('pizza', async () => {
  try {
    return await pizzaService.getPizzas();
  } catch (error) {
    console.log('Error: ', error);
  }
});

export const getPizzaPrice = createAsyncThunk('pizzaPrice', async () => {
  try {
    return await pizzaService.getPizzaPrice();
  } catch (error) {
    console.log('Error: ', error);
  }
});

export const orderPizza = createAsyncThunk('orderPizza', async () => {
  try {
    return await pizzaService.getPizzaPrice();
  } catch (error) {
    console.log('Error: ', error);
  }
});

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    addToCart: (state: any, action: PayloadAction<CartItem>) => {
      const { payload } = action;
      const { cart, pizzaPrice } = state;
      const modifiedCart = updateCart(cart, payload, pizzaPrice);
      state.cart = modifiedCart;
    },
    deleteCartItem: (state, action: PayloadAction<CartItem>) => {
      const { payload } = action;
      const { cart } = state;
      const index = compareCartItem(cart, payload);

      if (index > -1) {
        const modifiedCart = cart.filter((cart, i) => i !== index);
        state.cart = modifiedCart;
      }
    },
    setServiceMethod: (state, action: PayloadAction<ServiceMethod>) => {
      state.serviceMethod = action.payload;
    },
    resetCart: (state) => {
      state.cart = [];
      state.serviceMethod = '';
      state.isOrderSuccess = false;
    },
    resetOrder: (state) => {
      state.isOrderSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPizzas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPizzas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pizzas = action.payload || [];
      })
      .addCase(getPizzas.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.pizzas = [];
      })
      .addCase(getPizzaPrice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPizzaPrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.pizzaPrice = action.payload || pizzaPrice;
      })
      .addCase(getPizzaPrice.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.pizzaPrice = pizzaPrice;
      })
      .addCase(orderPizza.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(orderPizza.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isOrderSuccess = true;
        state.cart = [];
        state.serviceMethod = '';
      })
      .addCase(orderPizza.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export const { addToCart, deleteCartItem, resetCart, resetOrder, setServiceMethod } =
  pizzaSlice.actions;

export default pizzaSlice.reducer;
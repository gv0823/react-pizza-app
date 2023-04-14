import { PizzaPrice } from '../models/Cart';
import { PizzaDocument } from '../models/Pizza';
import chicken from '../resources/images/chicken.jpg';
import beef from '../resources/images/beef.jpg';
import hawaiian from '../resources/images/hawaiian.jpg';
import cheese from '../resources/images/cheese.jpg';
import veggie from '../resources/images/veggie.jpg';

const pizzas: PizzaDocument[] = [{
  _id: "1",
  __v: 1,
  name: 'Chonky Chicken',
  price: 10,
  description: "Loads of delicious roasted chicken, shredded chicken juicy pineapples and fresh mushrooms on our brand new pizza.",
  image: chicken
},
{
  _id: "2",
  __v: 2,
  name: 'Beef Barbeque',
  price: 12,
  description: "The all time favorite with generous portions of beef pepperoni and 100% mozzarella cheese.",
  image: beef
},
{
  _id: "3",
  __v: 3,
  name: 'Hawking Hawaiian',
  price: 10,
  description: "Loads of delicious roasted chicken, shredded chicken juicy pineapples and fresh mushrooms on our brand new pizza.",
  image: hawaiian
},
{
  _id: "4",
  __v: 4,
  name: "Margeret's Margherita",
  price: 8,
  description: "100% mozzarella cheese, Parmesan cheese & Oregano on our Signature Sauce.",
  image: cheese
},
{
  _id: "5",
  __v: 5,
  name: 'Vegan Villa Vista',
  price: 8,
  description: "A delightful mix of fresh onions green pepper, cherry tomatoes, and mushrooms.",
  image: veggie
}
];

const pizzaPrice: PizzaPrice = { 
  size: { 
    "regular": 5,
    "large": 10,
    "extraLarge": 15,
  }, 
  extraCheese: 5,
};


const getPizzas = async () => {
  // const response = await axios.get<PizzaDocument[]>(
  //   `${process.env.REACT_APP_BASE_API}/pizza`
  // );
  return pizzas;
};

const getPizzaPrice = async () => {
  return pizzaPrice;
}

const orderPizza = async () => {
  return true;
}


const pizzaService = {
  getPizzas,
  getPizzaPrice,
  orderPizza
};

export default pizzaService;
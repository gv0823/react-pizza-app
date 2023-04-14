import { useParams } from "react-router-dom";
import PizzaDetailComponent from "../components/PizzaDetail.component";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { CartItem } from "../models/Cart";
import { PizzaDocument } from "../models/Pizza";
import { getAllPizzas, getPizzaPrice } from "../selectors/pizzaSelectors";
import { addToCart } from "../slices/pizzaSlice";

const PizzaDetailPage = () => {
    const dispatch = useAppDispatch();
    const { _id } = useParams(); 
    const pizzas = useAppSelector(getAllPizzas);
    const price = useAppSelector(getPizzaPrice);
  
    const selectedPizza = pizzas.find((pizza: PizzaDocument) => pizza._id === _id);
    const onAddToCartClick = (cartItem: CartItem) => {
        dispatch(addToCart(cartItem));
    }
    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '48px',
            marginTop:'100px',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <PizzaDetailComponent pizza={selectedPizza} pizzaPrice={price} onAddToCartClick={onAddToCartClick} />
        </div>
    );
}

export default PizzaDetailPage;
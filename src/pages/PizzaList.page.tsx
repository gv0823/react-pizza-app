import { useNavigate } from "react-router-dom";
import PizzaComponent from "../components/Pizza.component";
import { useAppSelector } from "../hooks/hooks";
import { PizzaDocument } from "../models/Pizza";

const PizzaListPage = () => {

    const { pizzas } = useAppSelector((state) => state.pizza);
    const navigate = useNavigate();
    const onOrderButtonClick = (_id: string) => {
        navigate(`/pizzaDetailPage/${_id}`);
    };

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '48px',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '100px',
        }}>
            {
                pizzas.map((pizza: PizzaDocument) => (
                    <PizzaComponent onOrderButtonClick={onOrderButtonClick} key={pizza._id} pizza={pizza} />
                ))
            }
        </div>
    );
}

export default PizzaListPage;
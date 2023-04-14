import { useEffect } from "react";
import ServiceMethodView from "../components/ServiceMethodView";
import { useAppDispatch } from "../hooks/hooks";
import { getPizzaPrice, getPizzas, resetOrder } from "../slices/pizzaSlice";

const HomePage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getPizzas());
    }, []);

    useEffect(() => {
        dispatch(getPizzaPrice());
    }, []);

    useEffect(() => {
        dispatch(resetOrder());
    },[]);

    return (
        <div>
            <div className="center">
                <ServiceMethodView />
            </div>
        </div>
    );
}

export default HomePage;
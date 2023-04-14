import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import {  ServiceMethod, setServiceMethod } from "../slices/pizzaSlice";

const ServiceMethodView = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onDeliveryClick = () => {
        dispatch(setServiceMethod(ServiceMethod.DELIVERY));
        navigate('/pizzaListPage');
    };

    const onTakeAwayClick = () => {
        dispatch(setServiceMethod(ServiceMethod.TAKE_AWAY));
        navigate('/pizzaListPage');
    }

    return (
        <div>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={3}
            >
                <div>
                    <Button variant="contained" size="large" onClick={onDeliveryClick}>DELIVERY</Button>
                </div>
                <div>
                    OR
                </div>
                <div>
                    <Button variant="contained" size="large" onClick={onTakeAwayClick}>TAKE AWAY</Button>
                </div>
            </Stack>
        </div>
    );
}

export default ServiceMethodView;
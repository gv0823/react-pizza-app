import { Button, Paper, Stack, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import CheckoutItemComponent from "../components/CheckoutItem.component";
import ConfirmationView from "../components/ConfirmationView.component";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { CartItem } from "../models/Cart";
import { getCart, getTotalPrice, getServiceMethod } from "../selectors/pizzaSelectors";
import { orderPizza, resetCart } from "../slices/pizzaSlice";

const CheckoutPage = () => {
    const cart = useAppSelector(getCart);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    let totalPrice = 0;
    totalPrice = useAppSelector(getTotalPrice);
    const serviceMethod = useAppSelector(getServiceMethod);
    const { isOrderSuccess } = useAppSelector((state) => state.pizza);

    const onConfirmOrderClick = () => {
        dispatch(orderPizza());
    };

    const onCancelOrderClick = () => {
        dispatch(resetCart());
        navigate('/');
    }

    if (isOrderSuccess) {
        setTimeout(function() {
            dispatch(resetCart());
            navigate('/');
         }, 3000);
        return (
            <div className="center">
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}>
                    <ConfirmationView />
                </Stack>
            </div>
        );
    }

    return (
        <div>
            <div style={{
                marginTop: '100px',
                marginBottom: '80px'
            }}>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <div>
                        {
                            cart.length > 0 ? <Typography variant='h5' component='div'>
                                Service Method: {serviceMethod}
                            </Typography> : null
                        }
                    </div>
                    {
                        cart.map((item: CartItem) => (
                            <CheckoutItemComponent key={item._id + item.isExtraCheese + item.size} cart={item} />
                        ))
                    }
                </div>
            </div>
            <footer className="footer">
                <Paper variant="outlined" style={{ height: '50px' }}>
                    <Stack direction="row" justifyContent="flex-end" spacing={1}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant='h5' component='div'>
                                Total Price:
                            </Typography>
                            <Typography variant='h5' component='div'>
                                RM {totalPrice}
                            </Typography>
                        </Stack>
                        <div>
                            <Button
                                sx={{ height: "50px" }}
                                disabled={cart.length === 0}
                                size="medium"
                                color="secondary"
                                variant="contained"
                                onClick={onCancelOrderClick}>
                                Cancel Order
                            </Button>
                        </div>
                        <div>
                            <Button
                                sx={{ height: "50px" }}
                                disabled={cart.length === 0}
                                size="medium"
                                variant="contained"
                                onClick={onConfirmOrderClick}>
                                Confirm Order
                            </Button>
                        </div>
                    </Stack>
                </Paper>
            </footer>
        </div >
    );
}

export default CheckoutPage;
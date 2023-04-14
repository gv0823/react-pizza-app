import { Button, Paper, Stack, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import CartItemComponent from "../components/CartItem.component";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { CartItem } from "../models/Cart";
import { getCart, getTotalPrice } from "../selectors/pizzaSelectors";
import { deleteCartItem } from "../slices/pizzaSlice";

const CartPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const cart = useAppSelector(getCart);

    let totalPrice = 0;
    totalPrice = useAppSelector(getTotalPrice);

    const onDeleteButtonClick = (cartItem: CartItem) => {
        dispatch(deleteCartItem(cartItem));
    };

    const onCheckoutButtonClick = () => {
        navigate('/checkoutPage');
    }

    return (
        <div>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'column',
                gap: '20px',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '100px',
                marginBottom: '80px'
            }}>
                {
                    cart.map((item: CartItem) => (
                        <CartItemComponent onDeleteButtonClick={onDeleteButtonClick} key={item._id+item.isExtraCheese+item.size} cart={item} />
                    ))
                }
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
                            <Button sx={{ height: "50px" }} disabled={cart.length===0} size="large" onClick={onCheckoutButtonClick} variant="contained">Check Out</Button>
                        </div>
                    </Stack>
                </Paper>
            </footer>
        </div>
    );
}

export default CartPage;
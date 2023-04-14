import { FC } from 'react';

import {
    Card,
    CardMedia,
    Button,
    Typography,
    Stack,
} from '@mui/material';
import { CartItem } from '../models/Cart';
import DeleteIcon from '@mui/icons-material/Delete';

interface CartItemComponentProps {
    cart: CartItem;
    onDeleteButtonClick: (cartItem: CartItem) => void;
}

const CartItemComponent: FC<CartItemComponentProps> = (props: CartItemComponentProps) => {
    const { cart } = props;
    const onDeleteButtonClick = () => {
        props.onDeleteButtonClick(cart);
    }
    return (
        <Card style={{ width: "700px" }}>
            <Stack direction="row">
                <CardMedia
                    component='img'
                    height='300'
                    width='300'
                    image={cart.image}
                    alt='image'
                />
                <Stack direction="column" alignItems="end">
                    <Stack spacing={1} pl={2} pt={2} pr={2}>
                        <Typography gutterBottom variant='h5' component='div'>
                            {cart.name}
                        </Typography>
                        <Typography gutterBottom variant='h5' component='div'>
                            $ {cart.price} * {cart.quantity} = RM {cart.price * cart.quantity}
                        </Typography>
                        {cart.size  && (
                            <Typography fontWeight="bold" fontSize={15} color='div'>
                                Size: {cart.size}
                            </Typography>
                        )}
                        {cart.isExtraCheese !== null && (
                            <Typography fontWeight="bold" fontSize={15} color='div'>
                                Extra Cheese: {cart.isExtraCheese ? "Yes" : "No"}
                            </Typography>
                        )}
                        {cart.description && (
                            <Typography variant='body2' color='text.secondary'>
                                {cart.description}
                            </Typography>
                        )}
                    </Stack>
                    <div style={{ marginTop: "auto", marginBottom: "8px" }}>
                        <Button onClick={onDeleteButtonClick}>
                            <DeleteIcon style={{ color: "black" }} />
                        </Button>
                    </div>
                </Stack>
            </Stack>
        </Card>
    );
};

export default CartItemComponent;
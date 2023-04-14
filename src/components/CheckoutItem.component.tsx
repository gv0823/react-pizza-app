import { FC } from 'react';

import {
    Card,
    CardMedia,
    Typography,
    Stack,
} from '@mui/material';
import { CartItem } from '../models/Cart';

interface CheckoutItemComponentProps {
    cart: CartItem;
}

const CheckoutItemComponent: FC<CheckoutItemComponentProps> = (props: CheckoutItemComponentProps) => {
    const { cart } = props;
    return (
        <Card style={{ width: "700px" }}>
            <Stack direction="row">
                <CardMedia
                    component='img'
                    height='250'
                    width='250'
                    image={cart.image}
                    alt='image'
                />
                <Stack style={{ width: "600px" }} direction="column">
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
                    </Stack>
                </Stack>
            </Stack>
        </Card>
    );
};

export default CheckoutItemComponent;
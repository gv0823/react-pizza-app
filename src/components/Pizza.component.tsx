import { FC } from 'react';

import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
} from '@mui/material';




import { PizzaDocument } from '../models/Pizza';

interface PizzaComponentProps {
    pizza: PizzaDocument;
    onOrderButtonClick: (_id: string) => void;
}

const PizzaComponent: FC<PizzaComponentProps> = (props: PizzaComponentProps) => {
    const { pizza } = props;
    const onOrderClick = () => {
        props.onOrderButtonClick(pizza._id);
    }
    return (
        <Card sx={{ width: 300, minWidth: 300 }}>
            <CardMedia
                component='img'
                height='140'
                image={pizza.image}
                alt='image'
            />
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                    {pizza.name}
                </Typography>
                <Typography gutterBottom variant='h5' component='div'>
                    RM {pizza.price}
                </Typography>
                {pizza.description && (
                    <Typography variant='body2' color='text.secondary'>
                        {pizza.description}
                    </Typography>
                )}
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={onOrderClick} variant='contained' fullWidth>
                    Order Now
                </Button>
            </CardActions>
        </Card>
    );
};

export default PizzaComponent;
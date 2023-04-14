import { FC, useState } from 'react';

import {
    Card,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';
import { PizzaDocument } from '../models/Pizza';
import { CartItem, PizzaPrice, PizzaSize } from '../models/Cart';

interface PizzaComponentProps {
    pizza: PizzaDocument;
    pizzaPrice: PizzaPrice;
    onAddToCartClick: (cartItem: CartItem) => void;
}

const PizzaDetailComponent: FC<PizzaComponentProps> = (props: PizzaComponentProps) => {
    const { pizza, pizzaPrice } = props;
    const [quantity, setQuantity] = useState(1);
    const [cheese, setCheese] = useState("no");
    const [size, setSize] = useState<PizzaSize>("personal");

    const cartItem: CartItem = {
        ...pizza,
        quantity,
        size,
        isExtraCheese: cheese === "no" ? false : true,
    };
    const onAddToCartClick = () => {
        props.onAddToCartClick(cartItem);
    }

    const onPizzaSizeChanged = (event: SelectChangeEvent) => {
        setSize(event.target.value as PizzaSize);
    };

    return (
        <Card style={{overflow:"auto"}}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <CardMedia
                    component='img'
                    height='580'
                    image={pizza.image}
                    alt='image'
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', pl: 1, pb: 1 }}>
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
                    <FormControl sx={{margin:"12px"}}>
                        <InputLabel id="demo-simple-select-label">Size</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={size}
                            label="Age"
                            sx={{ mb: 2 }} 
                            onChange={onPizzaSizeChanged}
                        >
                            <MenuItem value={"personal"}>Personal</MenuItem>
                            <MenuItem value={"regular"}>regular (+RM{pizzaPrice.size.regular.toString()})</MenuItem>
                            <MenuItem value={"large"}>large (+RM{pizzaPrice.size.large.toString()})</MenuItem>
                            <MenuItem value={"extraLarge"}>Extra large (+RM{pizzaPrice.size.extraLarge.toString()})</MenuItem>
                        </Select>
                        <RadioGroup
                            row
                            sx={{ mb: 2 }} 
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={(e) => { setCheese(e.target.value); }} value={cheese}
                        >
                            <FormControlLabel value="no" control={<Radio />} label="Normal" />
                            <FormControlLabel value="yes" control={<Radio />} label={`Extra Cheese (+RM ${pizzaPrice.extraCheese})`} />
                        </RadioGroup>
                        <div>
                            <Button color="secondary" variant='outlined'
                                onClick={() => {
                                    setQuantity(quantity - 1)
                                }}
                                disabled={quantity === 1}
                                size='large'
                            >
                                -
                            </Button>
                            <span style={{ padding: "10px" }}>{quantity}</span>
                            <Button color="secondary" variant='outlined'
                                onClick={(e) => {
                                    setQuantity(quantity + 1)
                                }}
                                size='large'
                            >
                                +
                            </Button>
                        </div>
                    </FormControl>
                    <CardContent sx={{ marginTop: 'auto', width: '90%' }}>
                        <Button onClick={onAddToCartClick} variant='contained' fullWidth>
                            Add To Cart
                        </Button>
                    </CardContent>
                </Box>
            </Box>
        </Card>
    );
};

export default PizzaDetailComponent;
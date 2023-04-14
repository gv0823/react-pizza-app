import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { Badge } from '@mui/material';
import { List, ListItem, ListItemText, SwipeableDrawer } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
import { getCartCount } from '../selectors/pizzaSelectors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Header() {
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();
    const totalCount = useAppSelector(getCartCount);
    const pathName = location.pathname;
    const getHeaderName = () => {

        if (pathName === '/') {
            return 'Service method';
        }
        if (pathName === '/pizzaListPage') {
            return 'Pizza';
        }
        if (pathName === '/checkoutPage') {
            return 'Checkout';
        }
        if (pathName === '/cartPage') {
            return 'Cart';
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed"
                sx={{ backgroundColor: '#131921', color: 'white', padding: '4px' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    {location.pathname === '/' ? <></> : <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => navigate(-1)}
                    >
                        <ArrowBackIcon />
                    </IconButton>}
                    <SwipeableDrawer
                        anchor="left"
                        open={open}
                        onClose={() => { setOpen(false) }}
                        onOpen={() => { }}>
                        <Box sx={{ width: 250 }}>
                            <List>
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    <ListItem button onClick={() => { setOpen(false) }}>
                                        <ListItemText primary={'Home'} />
                                    </ListItem>
                                </Link>
                            </List>
                        </Box>
                    </SwipeableDrawer>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {getHeaderName()}
                    </Typography>
                    {
                        pathName !== '/' ?
                            <Button onClick={() => navigate('/cartPage')}>
                                <Badge badgeContent={totalCount} color='primary'>
                                    <ShoppingCartOutlinedIcon fontSize='large' />
                                </Badge>
                                <span>Cart</span>
                            </Button> :
                            null
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}
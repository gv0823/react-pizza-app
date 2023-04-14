import { ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import NotFoundView from './components/NotFoundView.component';
import { useAppDispatch } from './hooks/hooks';
import CartPage from './pages/Cart.page';
import CheckoutPage from './pages/Checkout.page';
import HomePage from './pages/Home.page';
import PizzaDetailPage from './pages/PizzaDetail.page';
import PizzaListPage from './pages/PizzaList.page';
import { resetOrder } from './slices/pizzaSlice';
import { theme } from './utils/theme';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetOrder());
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/pizzaListPage' element={<PizzaListPage />} />
          <Route path='/pizzaDetailPage/:_id' element={<PizzaDetailPage />} />
          <Route path='/cartPage' element={<CartPage />} />
          <Route path='/checkoutPage' element={<CheckoutPage />} />
          <Route path='*' element={<NotFoundView />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

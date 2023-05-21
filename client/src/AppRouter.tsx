import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProfilePage from './views/pages/ProfilePage/ProfilePage';
import ShopPage from './views/pages/ShopPage/ShopPage';
import ProductPage from './views/pages/ProductPage/ProductPage';
import EntryPage from './views/pages/EntryPage/EntryPage';
import ErrorPage from './views/pages/ErrorPage/ErrorPage';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from './store';
import { Navigate } from 'react-router-dom';
import AboutPage from './views/pages/AboutPage/AboutPage';
import basketSlice from './reducers/basket/basketSlice';

const LocalStorage = {
    BasketKey: 'basket_products',
};

function AppRouter() {
    const userState = useSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();
    const basketState = useSelector((state: RootState) => state.basket);

    useEffect(() => {
        const savedBasketItems = localStorage.getItem(LocalStorage.BasketKey);
        const basketItems = savedBasketItems ? JSON.parse(savedBasketItems) : [];
        dispatch(basketSlice.actions.initBasket(basketItems));
    }, []);

    useEffect(() => {
        localStorage.setItem(LocalStorage.BasketKey, JSON.stringify(basketState.products));
    }, [basketState.products]);

    return (
        <Routes>
            {userState.isAuthed && <Route path='/' element={<ProfilePage />} />}
            <Route path='/shop' element={<ShopPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/entry' element={<EntryPage />} />
            <Route path='products/:id' element={<ProductPage />} />
            <Route path='*' element={userState.isAuthed ? <ErrorPage /> : <Navigate to='/entry' />} />
        </Routes>
    );
}

export default AppRouter;

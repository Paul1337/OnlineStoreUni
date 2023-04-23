import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProfilePage from './views/pages/ProfilePage/ProfilePage';
import ShopPage from './views/pages/ShopPage/ShopPage';
import ProductPage from './views/pages/ProductPage/ProductPage';
import EntryPage from './views/pages/EntryPage/EntryPage';
import ErrorPage from './views/pages/ErrorPage/ErrorPage';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { Navigate } from 'react-router-dom';
import AboutPage from './views/pages/AboutPage/AboutPage';

function AppRouter() {
    const userState = useSelector((state: RootState) => state.user);

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

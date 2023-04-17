import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProfilePage from './views/pages/ProfilePage/ProfilePage';
import ShopPage from './views/pages/ShopPage/ShopPage';
import ProductPage from './views/pages/ProductPage/ProductPage';
import EntryPage from './views/pages/EntryPage/EntryPage';

function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<ProfilePage />} />
            <Route path='/shop' element={<ShopPage />} />
            <Route path='/entry' element={<EntryPage />} />
            <Route path='products/:id' element={<ProductPage />} />
        </Routes>
    );
}

export default AppRouter;

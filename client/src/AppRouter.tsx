import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ProfilePage from './views/pages/ProfilePage/ProfilePage';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<ProfilePage />} />
                {/* <Route exact path='products/:id'/> */}
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;

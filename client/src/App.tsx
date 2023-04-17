import { useState } from 'react';
import GlobalNav from './views/components/GlobalNav/GlobalNav';
import AppRouter from './AppRouter';
import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <>
            <BrowserRouter>
                <GlobalNav />
                <AppRouter />
            </BrowserRouter>
        </>
    );
}

export default App;

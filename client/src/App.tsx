import { useState } from 'react';
import GlobalNav from './views/components/GlobalNav/GlobalNav';
import AppRouter from './AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

function App() {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <GlobalNav />
                    <AppRouter />
                </BrowserRouter>
            </Provider>
        </>
    );
}

export default App;

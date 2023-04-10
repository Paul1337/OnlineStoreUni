import { useState } from 'react';
import GlobalNav from './views/components/GlobalNav/globalNav';
import AppRouter from './AppRouter';

function App() {
    return (
        <>
            <GlobalNav />
            <AppRouter />
        </>
    );
}

export default App;

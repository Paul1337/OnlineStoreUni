import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from '../reducers/user/userSlice';
import basketSlice from '../reducers/basket/basketSlice';
import storeSlice from '../reducers/store/storeSlice';

const store = configureStore({
    reducer: combineReducers({
        user: userSlice.reducer,
        basket: basketSlice.reducer,
        store: storeSlice.reducer,
    }),
});

export default store;

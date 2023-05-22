import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice, { getUserData } from '../reducers/user/userSlice';
import basketSlice from '../reducers/basket/basketSlice';
import storeSlice from '../reducers/store/storeSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
    reducer: combineReducers({
        user: userSlice.reducer,
        basket: basketSlice.reducer,
        store: storeSlice.reducer,
    }),
    // middleware: (getDefault) => getDefault(),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// ??
export const useAppDispatch: () => AppDispatch = useDispatch;

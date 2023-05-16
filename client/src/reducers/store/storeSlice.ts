import { createSlice } from '@reduxjs/toolkit';
import { IStoreState } from '../../models/store/store';

const initialState: IStoreState = {
    products: [],
};

// fetchProducts

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {},
    extraReducers: {},
});

export default storeSlice;

import { createSlice } from '@reduxjs/toolkit';
import { IStoreState } from '../../models/store/store';

const initialState: IStoreState = {
    products: [],
};

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {},
});

export default storeSlice;

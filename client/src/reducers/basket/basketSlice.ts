import { createSlice } from '@reduxjs/toolkit';
import { IBasketState } from '../../models/state/basket/basket';

const initialState: IBasketState = {
    products: [],
};

// addItem

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {},
});

export default basketSlice;

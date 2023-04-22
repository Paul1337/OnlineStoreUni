import { createSlice } from '@reduxjs/toolkit';
import { IBasketState } from '../../models/basket/basket';

const initialState: IBasketState = {
    products: [],
};

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {},
});

export default basketSlice;

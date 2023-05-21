import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBasketProductItem, IBasketState } from '../../models/state/basket/basket';

const initialState: IBasketState = {
    products: [],
};

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        initBasket: (state, action: PayloadAction<Array<IBasketProductItem>>) => {
            state.products = action.payload;
        },
        putItem: (state, action: PayloadAction<IBasketProductItem>) => {
            state.products.push(action.payload);
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter((product) => product.id !== action.payload);
        },
        updateItemCount: (state, action: PayloadAction<{ id: number; count: number }>) => {
            const product = state.products.find((product) => product.id === action.payload.id);
            if (product) {
                product.count = action.payload.count;
            }
        },
        emptyBasket: (state, action: PayloadAction) => {
            state.products = [];
        },
    },
});

export default basketSlice;

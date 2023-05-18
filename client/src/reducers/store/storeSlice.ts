import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IStoreState } from '../../models/state/store/store';
import * as api from '../../api/products';
import { AxiosError } from 'axios';

const initialState: IStoreState = {
    products: [],
};

export const fetchProducts = createAsyncThunk('store/fetchProducts', async (_, { rejectWithValue }) => {
    return api.fetchProducts().catch((err: AxiosError) => {
        return rejectWithValue(err?.response?.data);
    });
});

// fetchProducts

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.rejected, (state, action) => {
                console.log('fetchProducts.rejected');
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                console.log('fetch products fulfilled, payload = ', action.payload);
                state.products = action.payload.products.map((product: any) => ({
                    title: product.name,
                    id: product.id,
                    description: product.description,
                    img: product.image_src,
                    price: product.price,
                }));
            });
    },
});

export default storeSlice;

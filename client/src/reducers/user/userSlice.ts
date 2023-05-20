import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUserState } from '../../models/user/user';
import axios, { AxiosError } from 'axios';
import * as api from '../../api/auth';
import { IAuthResponse, ILoginRequest, IRegisterRequest } from '../../models/api/auth';

const initialState: IUserState = {
    isAuthed: false,
};

export const getUserData = createAsyncThunk('user/getData', async (_, { rejectWithValue }) => {
    return api.authUser().catch((err: AxiosError) => {
        return rejectWithValue(err?.response?.data);
    });
});

export const loginUser = createAsyncThunk(
    'user/login',
    async (data: ILoginRequest, { rejectWithValue }) => {
        return api.loginUser(data).catch((err: AxiosError) => {
            return rejectWithValue(err?.response?.data);
        });
    }
);

export const logoutUser = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
    return api.logoutUser().catch((err: AxiosError) => {
        return rejectWithValue(err?.response?.data);
    });
});

export const registerUser = createAsyncThunk(
    'user/register',
    async (data: IRegisterRequest, { rejectWithValue }) => {
        return api.registerUser(data).catch((err: AxiosError) => {
            return rejectWithValue(err?.response?.data);
        });
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserData.rejected, (state, action) => {
                console.log('get user data rejected, payload = ', action.payload);
                state.isAuthed = false;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                console.log('get user data fulfilled, payload = ', action.payload);
                state.isAuthed = true;
                state.data = action.payload.data;
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log('loginUser.rejected, payload = ', action.payload);
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log('loginUser.fulfilled, payload = ', action.payload);
                state.isAuthed = true;
                state.data = action.payload.data;
            })
            .addCase(registerUser.rejected, (state, action) => {
                console.log('registerUser.rejected, payload = ', action.payload);
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log('registerUser.fulfilled, payload = ', action.payload);
            })
            .addCase(logoutUser.rejected, (state, action) => {
                console.log('logoutUser.rejected, payload = ', action.payload);
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isAuthed = false;
            });
    },
});

export default userSlice;

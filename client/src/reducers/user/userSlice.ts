import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUserState } from '../../models/user/user';
import axios from 'axios';
import { authUser } from '../../api/auth';
import { IAuthResponse } from '../../models/api/auth';

const initialState: IUserState = {
    isAuthed: false,
};

export const getUserData = createAsyncThunk('user/getData', async (): Promise<IAuthResponse> => {
    const user = await authUser();
    return user;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserData.rejected, (state, action) => {
                console.log('get user data rejected, action = ', action);
                state = {
                    isAuthed: false,
                };
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                console.log('get user data fulfilled, action = ', action);
                state = {
                    isAuthed: action.payload.isAuthed,
                    data: action.payload.data,
                };
            });
    },
});

export default userSlice;

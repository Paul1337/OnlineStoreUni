import { createSlice } from '@reduxjs/toolkit';
import { IUserState } from '../../models/user/user';

const initialState: IUserState = {
    isAuthed: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
});

export default userSlice;

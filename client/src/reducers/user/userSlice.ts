import { createSlice } from '@reduxjs/toolkit';
import { IUserState } from '../../models/user/user';

const initialState: IUserState = {
    isAuthed: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserData: (state, action) => {},
        login: (state, action) => {},
        register: (state, action) => {},
    },
});

export default userSlice;

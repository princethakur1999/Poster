import { createSlice } from '@reduxjs/toolkit';



const initialState = {

    signupData: null,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    me: localStorage.getItem("me") ? localStorage.getItem("me") : false
}

const authSlice = createSlice({

    name: 'auth',

    initialState: initialState,

    reducers: {

        setSignupData: (state, action) => {

            state.signupData = action.payload;
        },
        setToken: (state, action) => {

            state.token = action.payload;
        },
        setMe: (state, action) => {

            state.me = action.payload;
        }
    }
});

export const { setSignupData, setToken, setMe } = authSlice.actions;

export default authSlice.reducer;

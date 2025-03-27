import {createSlice} from "@reduxjs/toolkit";

const initialToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

const authSlice = createSlice({
    name: 'auth',
    initialState: {token: initialToken},
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload); // Зберігаємо токен у localStorage
        },
        clearToken: (state) => {
            state.token = null;
            localStorage.removeItem("token"); // Видаляємо токен при виході
        },
    }
})

export default authSlice;
export const authSliceActions = authSlice.actions;
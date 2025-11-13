import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");

const initialState = {
    user: null,
    token: token || null,
    isAuthenticated: !!token,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
        (state.token = action.payload.token),
            (state.user = action.payload.user),
            (state.isAuthenticated = true);
        localStorage.setItem("token", state.token);
        },
        logout: (state) => {
        (state.token = null),
            (state.user = null),
            (state.isAuthenticated = false);
        localStorage.setItem("token");
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

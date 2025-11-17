import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cartItems"));

const initialState = {
    items: savedCart || [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
            localStorage.setItem("cartItems",JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
        localStorage.setItem("cartItems",JSON.stringify(state.items));
        },
        clearCart: (state) => {
        state.items = [];
        localStorage.setItem("cartItems",JSON.stringify(state.items));
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
        const item = action.payload;
        const existItem = state.items.find((i) => i._id === item._id);
        if (existItem) {
            existItem.qty += 1;
        } else {
            state.items.push({ ...item, qty: 1 });
        }
        },
        removeFromCart: (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
        },
        clearCart: (state) => {
        state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

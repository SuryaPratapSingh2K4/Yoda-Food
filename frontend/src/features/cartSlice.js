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
            const exists = state.items.find((item) => item._id === action.payload._id);
            if(!exists){
                state.items.push(
                    {
                        ...action.payload,
                        addedAt: new Date().toISOString()
                    }
                );
                localStorage.setItem("cartItems",JSON.stringify(state.items));
            } else {
                alert("Item already in cart");
            }

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

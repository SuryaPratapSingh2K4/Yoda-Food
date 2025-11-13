import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
        state.items = action.payload;
        },
        addProducts: (state, action) => {
        state.items = state.items.push(action.payload);
        },
    },
});

export const { setProducts, addProducts } = productSlice.actions;
export default productSlice.reducer;

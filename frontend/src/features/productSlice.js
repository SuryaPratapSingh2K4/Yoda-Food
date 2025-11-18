import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        // Sort products by createdAt (newest first)
        setProducts: (state, action) => {
            state.items = [...action.payload].sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
        },

        // Insert new product at the top & ensure createdAt exists
        addProducts: (state, action) => {
            const product = {
                ...action.payload,
                createdAt: action.payload.createdAt || new Date().toISOString(),
            };

            state.items.unshift(product);
        },

        // Update an existing product
        setProductsBId: (state, action) => {
            const index = state.items.findIndex(
                (p) => p._id === action.payload._id
            );
            if (index !== -1) {
                state.items[index] = {
                    ...state.items[index],
                    ...action.payload,
                };
            }
        }
    },
});

export const { setProducts, addProducts, setProductsBId } = productSlice.actions;
export default productSlice.reducer;

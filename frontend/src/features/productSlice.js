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
        setProductsBId: (state,action) => {
            const product = state.items.find((i) => i._id === action.payload._id);
            if(product){
                product.title = action.payload.title;
                product.description = action.payload.description;
                product.price = action.payload.price;
                product.category = action.payload.category;
                product.imageUrl = action.payload.imageUrl;
                product.stocks = action.payload.stocks;
            }
        }
    },
});

export const { setProducts, addProducts, setProductsBId } = productSlice.actions;
export default productSlice.reducer;

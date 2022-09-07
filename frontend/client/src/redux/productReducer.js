import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "products",
    initialState: {
      products: null,
      isFetching: false,
      error: false,
    },
    reducers: {
        productFetchStart: (state) => {
            state.isFetching = true;  
        },
        productFetchSuccess: (state, action) => {
            state.isFetching = false;
            state.products = action.payload;
        },
        productFetchFail: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    }
});

export const { productFetchStart, productFetchSuccess, productFetchFail } = productSlice.actions;
export default productSlice.reducer;
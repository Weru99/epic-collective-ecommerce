import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
    product: null,
    isFetching: false,
    error: false,
    },
    reducers: {
        //GET SINGLE 
        getProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getProductSuccess: (state, action) => {
            state.isFetching = false;
            state.product = action.payload;
        },
        getProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const { getProductStart, getProductSuccess, getProductFailure } = productSlice.actions;
export default productSlice.reducer;
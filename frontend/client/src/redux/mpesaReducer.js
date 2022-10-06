import { createSlice } from "@reduxjs/toolkit";

const mpesaSlice = createSlice({
    name: "paymentStatus",
    initialState: {
    payment: null,
    isFetching: false,
    error: false,
    },
    reducers: {
        makePaymentStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
       makePaymentSuccess: (state, action) => {
            state.isFetching = false;
            state.payment = action.payload;
        },
       makePaymentFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const {makePaymentStart,makePaymentSuccess,makePaymentFailure } =  mpesaSlice.actions;
export default  mpesaSlice.reducer;
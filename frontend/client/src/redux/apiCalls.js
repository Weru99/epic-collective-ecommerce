import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "./userRedux";
import {productFetchStart, productFetchSuccess, productFetchFail} from "./productsReducer";
import {makePaymentStart,makePaymentSuccess,makePaymentFailure } from "./mpesaReducer";
import { getProductStart, getProductSuccess, getProductFailure} from "./productReducer";
import { publicRequest, userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const fetchProducts = async(dispatch) => {
  dispatch(productFetchStart);
  try{
    const res = await publicRequest.get("/products");
    dispatch(productFetchSuccess(res.data));
  }catch(err){
    dispatch(productFetchFail());
  }
};

export const fetchProduct = async (dispatch,id) => {
  dispatch(getProductStart);
  try {
    const res = await userRequest.get(`/products/find/${id}`);
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const mpesaPayment = async (dispatch, phoneNumber, amount) => {
  dispatch(makePaymentStart);
  try{
    const res = await userRequest.get(`/mpesa/simulate/${phoneNumber}/${amount}`)
    dispatch(makePaymentSuccess(res.data));
  }catch(error){
    dispatch(makePaymentFailure());
  }
}
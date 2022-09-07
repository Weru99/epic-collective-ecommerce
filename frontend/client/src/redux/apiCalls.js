import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "./userRedux";
import {productFetchStart, productFetchSuccess, productFetchFail} from "./productReducer";
import { publicRequest } from "../requestMethods";

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
}
import {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "./productReducer";
import { userRequest } from "../requestMethod";

export const fetchProducts = async (dispatch) => {
  dispatch(getProductsStart);
  try {
    const res = await userRequest.get("/products");
    dispatch(getProductsSuccess(res.data));
  } catch (err) {
    dispatch(getProductsFailure());
  }
};

export const fetchProduct = async (dispatch,productId) => {
  dispatch(getProductStart);
  try {
    const res = await userRequest.get(`/products/find/${productId}`);
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const addProduct = async (dispatch, formData) => {
  dispatch(addProductStart);
  try {
    const res = await userRequest.post("/products", formData);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

export const updateProduct = async (dispatch, product) => {
  dispatch(updateProductStart);
  try{
    const res = await userRequest.post(`/products/${product._id}`, product);
    dispatch(updateProductSuccess(res.data));
  }catch(err){
    dispatch(updateProductFailure());
  }
}

export const deleteProduct = async (dispatch, product) => {
  dispatch(deleteProductStart);
  try{
    const res = await userRequest.post(`/products/${product._id}`, product);
    dispatch(deleteProductSuccess());
  }catch(err){
    dispatch(deleteProductFailure());
  }
}

// import { loginFailure, loginStart, loginSuccess } from "./userRedux";
// import { publicRequest, userRequest } from "../requestMethod";
// import {
//   getProductFailure,
//   getProductStart,
//   getProductSuccess,
//   deleteProductFailure,
//   deleteProductStart,
//   deleteProductSuccess,
//   updateProductFailure,
//   updateProductStart,
//   updateProductSuccess,
//   addProductFailure,
//   addProductStart,
//   addProductSuccess,
// } from "./productReducer";

// export const login = async (dispatch, user) => {
//   dispatch(loginStart());
//   try {
//     const res = await publicRequest.post("/auth/login", user);
//     dispatch(loginSuccess(res.data));
//   } catch (err) {
//     dispatch(loginFailure());
//   }
// };

// export const fetchProducts = async (dispatch) => {
//   dispatch(getProductStart());
//   try {
//     const res = await publicRequest.get("/products");
//     dispatch(getProductSuccess(res.data));
//   } catch (err) {
//     dispatch(getProductFailure());
//   }
// };

// export const deleteProduct = async (id, dispatch) => {
//   dispatch(deleteProductStart());
//   try {
//     // const res = await userRequest.delete(`/products/${id}`);
//     dispatch(deleteProductSuccess(id));
//   } catch (err) {
//     dispatch(deleteProductFailure());
//   }
// };

// export const updateProduct = async (id, product, dispatch) => {
//   dispatch(updateProductStart());
//   try {
//     // update
//     dispatch(updateProductSuccess({ id, product }));
//   } catch (err) {
//     dispatch(updateProductFailure());
//   }
// };
// export const addProduct = async (product, dispatch) => {
//   dispatch(addProductStart());
//   try {
//     const res = await userRequest.post(`/products`, product);
//     dispatch(addProductSuccess(res.data));
//   } catch (err) {
//     dispatch(addProductFailure());
//   }
// };

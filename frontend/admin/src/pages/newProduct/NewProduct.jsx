import "./newProduct.css";
import React, {useState} from 'react';
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';

export default function NewProduct() {

  const [images, setImages]= useState([]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");

   const dispatch = useDispatch(); 
   const navigate = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('stock', stock);
    formData.append('price', price);
    Object.values(images).forEach(image => {
      formData.append('images', image);
    });

    addProduct(dispatch, formData)
    .then(() => {
      //navigate.push('/products')
    })
    .catch((error) => {
      console.log(error.message)
    })

  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" multiple id="file" onChange={(e) => setImages(pre => [ ...e.target.files ])} />
        </div>
        <div className="addProductItem">
          <label>Product name</label>
          <input type="text" placeholder="Input your product name...." onChange={(e) => setProductName(e.target.value)} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="Input your product description..." onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <input type="text" placeholder="10" onChange={(e) => setStock(e.target.value)} />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input type="text" placeholder="100" onChange={(e) => setPrice(e.target.value)} />
        </div>
        <button className="addProductButton">Create</button>
      </form>
    </div>
  );
}

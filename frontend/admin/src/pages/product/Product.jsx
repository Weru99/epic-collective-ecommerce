import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../../redux/apiCalls";

export default function Product() {
  const { productId } = useParams();
  const [data, setData] = useState([]);
  const [images, setImages]= useState([]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");

  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProduct(dispatch, productId);
    setData(products);
    setProductName(data.productName);
    setDescription(data.description);
    setStock(data.stock);
    setPrice(data.price);
  }, [dispatch, productId, products, data]);


  console.log(data);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productData} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="productInfoImg"
            />
            <span className="productName">{data.productName}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">price:</span>
              <span className="productInfoValue">ksh. {data.price}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">stock:</span>
              <span className="productInfoValue">{data.stock} items</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Stock</label>
            <input type="text" value={stock} onChange={(e) => setStock(e.target.value)} />
            <label>Price</label>
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="productUploadImg"
              />
              <label for="file">
                <Publish />
              </label>
              <input type="file" multiple id="file" style={{ display: "none" }} />
            </div>
            <button type="submit" className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

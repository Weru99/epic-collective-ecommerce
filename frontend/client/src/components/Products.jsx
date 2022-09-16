import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "../redux/apiCalls";


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = () => {
  const [productsItems, setProducts] = useState([]);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts(dispatch);
    setProducts(products)
  },[dispatch]);
  
  return (
    <Container>
      {productsItems && productsItems.map((item, index) => (
        <Product item={item} key={index} />
      ))}
    </Container>
  );
};

export default Products;

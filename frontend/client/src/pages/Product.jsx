import { useState, useEffect } from "react";
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../redux/apiCalls";
import {addItem} from "../redux/cartRedux";
import swal from "sweetalert"

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {
  const [productItems, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const {id} =useParams();

  useEffect(() => {
    fetchProduct(dispatch, id);
    setProduct(product);
  }, [product, dispatch, id]);

  const updateQuantity = (type) => {
    if(type === "plus") {
      setQuantity(quantity + 1);
    }
    else if(type === "minus"){
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
    }
  }

  const addToCart = () => {
    let newItem = {
      productName: productItems.productName,
      price: productItems.price,
      quantity: quantity
    }
    if(dispatch(addItem(newItem))){
      swal("Success","Product added to cart successfully", "success");
    }
    else {
      swal("Fail", "There was error while you were adding to cart!, Please, try again", "fail");
    }

  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src="https://i.ibb.co/S6qMxwr/jean.jpg" />
        </ImgContainer>
        <InfoContainer>
          <Title>{productItems.productName}</Title>
          <Desc>
           {productItems.description}
          </Desc>
          <Price>ksh {productItems.price}</Price>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={()=> updateQuantity("minus")} />
              <Amount>{quantity}</Amount>
              <Add onClick={()=> updateQuantity("plus")} />
            </AmountContainer>
            <Button onClick={() => addToCart()}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;


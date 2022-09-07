import styled from "styled-components"; //imported material ui
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex; //to make horizontal
  padding: 20px;
  justify-content: space-between; //to separate
  ${mobile({ padding: "0px", flexDirection:"column" })}

`;

const Categories = () => {
  return (
    <Container>
      {categories?.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;

import styled from "styled-components";

const Container = styled.div`
  height: 25px;
  background-color:  rgb(48, 42, 9);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 600;
`;

const Announcement = () => {
  return <Container>Super Deal! Get free shipping for goods worth ksh.2500 and above.</Container>;
};

export default Announcement;

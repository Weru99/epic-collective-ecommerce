import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { BiX } from "react-icons/bi";
import mpesaLogo from '../assets/images/mpesalogo.png';
import { useDispatch } from "react-redux";
import { mpesaPayment } from "../redux/apiCalls";

const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  overflow-y: hidden;
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: #dddd;
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background: #fff;
  padding: 14px 28px;
  border-radius: 3px;
  max-width: 800px;
  min-width: 300px;
`;

const FormContent = styled.div`

`;

const Title = styled.div`
  text-align: center;
`;

const TitleImage = styled.img`

`;

const Inputs = styled.div`
  display: block;
`;
const FormInput = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1.2rem;
  color: #000;
  padding-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  font-size: 1.0rem;
  outline: none;
`;

const FormButton = styled.div`
  margin: 20px 0;
`;

const Button = styled.button`
  padding: 8px 20px;
  font-size: 1.2rem;
  color: #fff;
  background-color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Close = styled.div`
  position: absolute;
  cursor pointer;
  top: 10px;
  right: 10px;
  padding: 5px 7px;
  font-size: 2rem;
  color: #000;
`;

const MpesaPaymentModal = props => {

  const [phoneNumber, setPhoneNumber] =useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    mpesaPayment(dispatch, phoneNumber, props.amount)
    .then(() => {
       // Close modal
      props.closeModal();
      setLoading(false);
    })
    .catch((error)=>{ 
      console.log(error.message);
      setLoading(false);
    } )
  }

  return (
    <Modal>
      <Overlay />
      <Content>
        <form onSubmit={handleSubmit}>
          <FormContent>
            {/* mpesa payment title */}
            <Title>
              <TitleImage src={mpesaLogo} alt="Mpesa payment" width="200" height="100"/>
            </Title>
            <Inputs>
              {/* Phone number input */}
              <FormInput>
                <Label htmlFor="phoneNumber">Phone number</Label>
                <Input
                  id="phoneNumber"
                  type="text"
                  placeholder="Input your payment number eg 254722000000"
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </FormInput>

              {/* Add task button */}
              <FormButton>
               { loading ? <Button disabled >Processing ...</Button>
                  : <Button type="submit">Pay now</Button>
                }
              </FormButton>
            </Inputs>
          </FormContent>
        </form>

        <Close>
          <BiX onClick={props.closeModal ? () => props.closeModal() : null} />
        </Close>
      </Content>
    </Modal>
  );
};

MpesaPaymentModal.propTypes = {
  amount: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default MpesaPaymentModal;

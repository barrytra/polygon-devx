import React from "react";
import { useState } from 'react';
import styled from "styled-components";
import Background from "../images/840843081452.jpg"
import ContractABI from "../ABI.json"
import { ethers } from "ethers";
import { Link } from "react-router-dom"


const Div = styled.div`
    background-image: url(${Background});
    height:100vh;
    background-size: cover;
    background-repeat: no-repeat;

`
const Div1 = styled.div`
  margin-bottom: 5px;
`
const Heading = styled.div`
    font-size: 5rem;
    font-family: "McLaren", cursive;
    color: aqua;
    font-weight: bold;
    text-decoration-line: none;
    margin: 10rem 10%;
    position: absolute;
`
const FormDiv = styled.div`
    width: 350px;
    margin: 20rem 15%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #000b24;
    position: absolute;
`
const Label = styled.label`
    color: aliceblue;
    font-family: "McLaren", cursive;
`
const DashBoard = styled(Link)`
    margin: 3vh 10% auto 90% ;
    font-size: large;
    color: aqua;
    font-weight: bold;
    text-decoration-line: none;
    font-family: "Euclid Circular A", "Poppins";
    font-weight: 600;
    position: absolute;
    justify-self: end;
    cursor: pointer;
`
const Input = styled.input`
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
`
const Submit = styled.input`
    background-color: blueviolet;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    :hover{
    color: #000000;
    background-color: #c7f4ff;
}
`
export default function MyForm() {
  const [inputs, setInputs] = useState({});

  const [isAutomaticWithdraw, setIsAutomaticWithdraw] = useState(false);
  const onChangeCheckBox = (e) => {
    setIsAutomaticWithdraw(e.target.checked);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const contractAddress = "0x037d942fC7074Fb3d46CDDCF13BA035d0246b7BD";

  const func = async (e) => {
    e.preventDefault()
    // console.log(inputs)

    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ContractABI, signer);

      if(isAutomaticWithdraw){
        await contract.deposit(inputs.amount, inputs.withdrawAmount, 0, true);
      }
      else{
        await contract.deposit(inputs.amount, 0, 0, true);
      }
      
    }
  
    else console.log("HEERE")
  }

  return (
    <Div>
      <DashBoard to="/Dashboard"> Dashboard </DashBoard>
        <Heading>Dynamic Deposit</Heading>
        <FormDiv>
        <form >
      <Label>enter the Amount to be deposited(VTEST):
      <Input 
        type="number" 
        name="amount" 
        value={inputs.amount || ""} 
        onChange={handleChange}
      />
      </Label>
      <Div1>
      <input type="checkbox" value={isAutomaticWithdraw} onChange={onChangeCheckBox} />
      {(!isAutomaticWithdraw) && <Label for="vehicle1">automatic withdrawal</Label>}
      {isAutomaticWithdraw && (
          <Label> Amount for automatic withdrawal(VTEST):
          <Input 
            type="number" 
            name="withdrawAmount" 
            value={inputs.withdrawAmount || ""} 
            onChange={handleChange}
          />
          </Label>
        )}
      </Div1>
     
        <Submit type="submit" onClick={func} />
    </form>
        </FormDiv>
    </Div>
    
  )
}
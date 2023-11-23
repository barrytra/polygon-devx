import React from "react";
import styled from "styled-components";
import Background from "../images/840843081452.jpg"
import { Link } from "react-router-dom"
import ConnectWallet from "../utils/ConnectWallet";


const Div = styled.div`
    background-image: url(${Background});
    height: 85vh;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    
`
const Title = styled.div`
    margin-top: 20vh;
    margin-left: 10%;
    font-size: 50px;
    color: aqua;
    font-family: "Euclid Circular A", "Poppins";
    font-weight: 600;
    position: absolute;
`
const Description = styled.div`
    font-size: large;
    color: aqua;
    font-family: "Euclid Circular A", "Poppins";
    font-weight: 400;
    position: absolute;
    margin-top: 40vh;
    margin-left: 10%;
    margin-right: 40%;
`
const Wallet = styled.div`
margin-top: 70vh;
    margin-left: 10%;
    
font-weight: bold;
text-decoration-line: none;
color: black;
font-family: "McLaren", cursive;
background-color: white;
/* border: 2px solid #4CAF50; */
border-radius: 5px;
transition-duration: 0.4s;
text-align: center;
display: inline-block;
font-size: 16px;
cursor: pointer;
:hover{
    color: white;
    background-color: #080025;
}
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
const P = styled.pre`
    margin-top: 10px;
    font-size: 30px; 
`
const Desc2 = styled.div`
    font-size: 25px;
    color: aqua;
    font-family: "Euclid Circular A", "Poppins";
    font-weight: 400;
    position: absolute;
    margin-top: 30vh;
    margin-left: 80%;
    margin-right: 5%;
`
const A = styled.a`
    text-decoration: none;
    color: wheat;
`
export default function Header() {

    return(
        <Div>
            <DashBoard to="/Dashboard"> Dashboard </DashBoard>
            <Title>
                dVest
            </Title>
            <Description>
                <P>A decentralised Investing platform</P>
                <br/>
                <P>Now Inflation won't destroy your Money</P>
                <P>Invest your Money and get amazing returns</P>
            </Description>
            <Desc2>**500 VERSE tokens for new users <br/><br/> You can also buy tokens from <A href="https://www.bitcoin.com/">bitcoin.com</A></Desc2>
            <Wallet><ConnectWallet/></Wallet>
        </Div>
    )
}
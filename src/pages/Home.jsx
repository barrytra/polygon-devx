import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import FixedDepositIcon from "../utils/FixedDepositIcon"
import DynamicDepositIcon from "../utils/DynamicDepositIcon"
import ContractABI from "../ABI.json"
import { ethers } from "ethers";


const Div = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 8rem 5%;
`
const Fixed = styled.div`
    background-color: aliceblue;
    border: 2px solid;
    width: 40%;
    height: 30rem;
    position: relative;
    :hover{
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    }
`
const Dynamic = styled.div`
    background-color: aliceblue;
    border: 2px solid;
    width: 40%;
    position: relative;
    height: 30rem;
    :hover{
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    }
`
const Desc1 = styled.p`
    text-align: center;
    text-decoration: blueviolet;
    font-family: "McLaren", cursive;
    position: absolute;
    top: 20%;
    padding: 20px;
    margin: auto 15px;
    font-size: larger;
`
const Desc2 = styled.p`
    text-align: center;
    text-decoration: blueviolet;
    font-family: "McLaren", cursive;
    position: absolute;
    padding: 20px;
    margin: auto 15px;
    font-size: larger;
    top: 20%;    
`
const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20rem;
`
const P = styled.p`
    text-align: center;
    font-family: 'Poppins', sans-serif;
    font-size: 40px;
`
const CpiDiv = styled.div`
    background-color: white;
    width: 100%;
    height: 10rem;
    margin-top: 6rem;
    padding: 3rem;
`

export default function Home() {

    const contractAddress = "0x037d942fC7074Fb3d46CDDCF13BA035d0246b7BD";
    const [cpi, setCpi] = useState("")

    const func = async () => {

        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, ContractABI, signer);

            let CPI = await contract.interestRate();
            console.log(CPI)
            CPI = Number(CPI);
            CPI = CPI.toString();
            CPI = CPI.slice(0, 3);
            CPI = CPI[0] + "." + CPI[1] + CPI[2]
            setCpi(CPI);
        }
        else console.log("HEERE")
    }


    useEffect(() => {
        func();
    }, [])


    return (
        <div>
            <Header />
            <CpiDiv>
                <P> Today's USA inflation rate by Truflation is {cpi}</P>
            </CpiDiv>

            <Div>
                <Fixed>
                    <Desc1>Invest for a fixed period of time. U will only be able to withdraw your money only after the maturity period</Desc1>
                    <Button><FixedDepositIcon /></Button>
                </Fixed>
                <Dynamic>
                    <Desc2>Invest your money and withdraw it anytime. Get an interest rate equal to the daily interest rate provided by Truflation</Desc2>
                    <Button><DynamicDepositIcon /></Button>
                </Dynamic>
            </Div>
        </div>

    )
}

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Chart } from "../components/chart";
import { ethers } from "ethers";
import ContractABI from "../ABI.json"
import moment from "moment"


const Div = styled.div`
width: auto;
height: auto;
position: relative;
border-radius: 10px;
flex: 0 0 auto;        
display: flex;          
flex-direction: column;
overflow: hidden;
text-decoration: none;
font-weight: bold;
text-decoration-line: none;
color: #11004d;
font-family: "McLaren", cursive;
`

const WholeDiv = styled.div`
width: auto;

height: auto;
min-width: 300px;
min-height: 300px;
max-width: 100%;
max-height: 450px;
border: solid black;
margin: 0.5rem;
padding: 10px;
border-radius: 10px;
cursor: pointer;
text-decoration: none;
background-color: white;
box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    
`
const Title = styled.h1`
margin: 0.5rem;
margin-bottom: 1rem;
font-size: 1.6rem;
font-weight: 500;
color: #0c0c0c;
text-decoration: none;
    
`
const Text =styled.p`
color: #0c0c0c;
text-decoration: none;
margin: 0.5rem;
`
const Div1 = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
border-bottom: solid black ;
`
const Type = styled.div`
    color: #0c0c0c;
text-decoration: none;
margin: 0.5rem;
`
const Button = styled.button`
margin-left: 5px;
font-weight: bold;
text-decoration-line: none;
color: #11004d;
font-family: "McLaren", cursive;
background-color: white;
padding: 5px 12px;
text-align: center;
display: inline-block;
font-size: 16px;
cursor: pointer;
:hover{
    color: white;
    background-color: #11004d;
}
`

export default function Card(props) {

    const contractText = "0x037d942fC7074Fb3d46CDDCF13BA035d0246b7BD";
    const [data, setData] = useState([])
    const [amountData, setAmountData] = useState([]);
    const [timeData, setTimeData] = useState([]);
    const func = async () => {
        // e.preventDefault()
        // console.log(inputs)

        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractText, ContractABI, signer);
            let temp
            let test =[]
            console.log("twdwemp", props._id)

            temp = await contract.getHistory(props._id);
            console.log("temp", (Number(temp[0].amount._hex)))

            for(let i=0;i < temp.length;i++){
                let obj = {
                    "amount": Number(temp[i].amount._hex),
                    "time": moment(Number(temp[i].time._hex)*1000).format('DD-MM-YYYY HH:mm:ss')
                }
                console.log("obj", obj)
               
                // setData(prev => [...prev, obj])
                test.push(obj)
                
            }
            setData(test)
            console.log("data", data)
            //  setData([{"amount":"123","time":"20"},{"amount":"130","time":"40"}])
            // setData(temp)
        }
        else console.log("HEERE")
    }
    useEffect(() => {
        func();
    }, [])

    const temp = () => {
        var amt = [], amt2 = []
    for(let i=0;i<data.length;i++){
        amt.push( data[i].amount)
        amt2.push( data[i].time)
        // setAmountData(prev => [...prev, data[i].amount])
        // setTimeData(prev => [...prev, data[i].time])
    }
    setAmountData(amt)
    setTimeData(amt2)
    }
    
    
    const [showChart, setShowChart] = useState(false)
    const handleclick = async () => {
        await temp();

        if(showChart){
            setShowChart(false);
            console.log("data", data[0])
            console.log("fetched data", amountData)  
            console.log("fetched data", timeData) 
        }
        else{
            //fetch the data
            // func();
            console.log("data", data[0])
console.log("fetched data", amountData)  
console.log("fetched data", timeData)  
            
            setShowChart(true);
        }
    }
    return (
        <Div>
            <WholeDiv>
                <Div1>
                <Title>ID : {props._id}</Title>
                {props.canWithdrawAnyTime ? <Type>Dynamic Deposit</Type> : <Type>Fixed Deposit</Type>}
                </Div1>
                <Text>Deposit Amount: {props.depositAmount} VTEST</Text>
                <Text>Current Amount: {props.currentAmount} VTEST</Text>
                <Text>Deposit Time: {props.depositTime} VTEST</Text>

                {props.canWithdrawAnyTime ? (props.withdrawAmount ? <Text>Automatic withdraw Amount: {props.withdrawAmount} VTEST</Text>:<Text>Automatic withdraw amount: --</Text>) :<Text>Maturity Date: {props.maturityPeriod}</Text>}
                {/* <Text>Deposit Time {props.depositTime}</Text> */}
               
                {/* {(props.canWithdrawAnyTime) ? <Text> Maturity period {props.maturityPeriod} </Text> : null} */}
                {showChart ? <Button onClick={handleclick}>Hide chart</Button> : <Button onClick={handleclick}>Show chart</Button>}
                
                 {/* <Button onClick={handleclick}>Show chart</Button> */}
                {showChart && <Chart amountData={amountData}  timeData={timeData}/>}
            </WholeDiv>

        </Div>
    )
}
import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
import ContractABI from "../ABI.json"
import Card from "../utils/Card"
import styled from "styled-components"
import moment from "moment"
const Div = styled.div`
    margin-top: 5rem;
    width: 60%;
`

export default function DashboardData() {

    const [data2, setData2] = useState([]);
 


    const contractAddress = "0x037d942fC7074Fb3d46CDDCF13BA035d0246b7BD";
    
    const func = async () => {

        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, ContractABI, signer);


            let temp = await contract.getIDs();

            //   console.log("temp", temp);

            for (let i = 0; i < Object.keys(await contract.getIDs()).length; i++) {
                let temp2;
                
                    temp2 = await contract.getDeposit(temp[i]);
                    let depositDate = moment(Number(temp2[3]._hex)*1000).format('DD-MM-YYYY HH:mm:ss')
                    let maturityDate = moment(Number(temp2[4]._hex)*1000).format('DD-MM-YYYY HH:mm:ss')
                // console.log(temp2)

                let obj = {
                    "_id": Number(temp[i]._hex),
                    "depositAmount": Number(temp2[0]._hex),
                    "currentAmount": Number(temp2[1]._hex),
                    "withdrawAmount": Number(temp2[2]._hex),
                    "depositTime": depositDate,
                    "maturityPeriod": maturityDate,
                    "canWithdrawAnyTime": temp2[5]
                }

                if(obj._id > Number("0"))
                {

                    setData2(prev => [...prev, obj]);

                }

            }


        }
        else console.log("HEERE")
    }


    useEffect(() => {
        func();

    }, [])
   
    return (
        <Div>
            
            {
                data2.map(item => {
                    return (
                        <div>
                            <Card
                                _id={item._id}
                                depositAmount={item.depositAmount}
                                depositTime={item.depositTime}
                                currentAmount={item.currentAmount}
                                withdrawAmount={item.withdrawAmount}
                                maturityPeriod={item.maturityPeriod}
                                canWithdrawAnyTime={item.canWithdrawAnyTime}
                            />
                        </div>)

                })
            }

            
        </Div>

    )
}
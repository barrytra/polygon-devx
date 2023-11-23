import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"
import ContractABI2 from "../ABI2.json"
import { ethers } from "ethers";

const Wallet = styled(Link)`
font-weight: bold;
text-decoration-line: none;
color: #11004d;
font-family: "McLaren", cursive;
background-color: white;
padding: 15px 32px;
text-align: center;
display: inline-block;
font-size: 16px;
cursor: pointer;
:hover{
    color: white;
    background-color: #11004d;
}
`

export default function ConnectWallet(){
  const [currentAccount, setCurrentAccount] = useState("");

    const connectWallet = async () => {
      try {
        const { ethereum } = window;
  
        if (!ethereum) {
          alert("Get MetaMask!");
          return;
        }
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected", accounts[0]);
        setCurrentAccount(accounts[0]);
        console.log(currentAccount);
    
      } catch (error) {
        console.log(error);
      }

      const mintContract = "0xA3A8F2B4DcCB6c9a9Ff60A205aD8A142B31a5c88"

      const { ethereum } = window;
      if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(mintContract, ContractABI2, signer);

          await contract.newUser(currentAccount);
      }
    };
  
    const checkIfWalletIsConnected = async () => {
      const { ethereum } = window;
  
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
  
      const accounts = await ethereum.request({ method: "eth_accounts" });
      const chain = await window.ethereum.request({ method: "eth_chainId" });
      let chainId = chain;
      console.log("chain ID:", chain);
      console.log("global Chain Id:", chainId);
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }

    //   const mintAddress = "0x5e74e338F76fa60fD91081010564080B8932DEe7"

    //   if (ethereum) {
    //       const provider = new ethers.providers.Web3Provider(ethereum);
    //       const signer = provider.getSigner();
    //       const contract = new ethers.Contract(mintAddress, ContractABI2, signer);

    //       await contract.newUser(currentAccount);
    //   }
    };
  
    useEffect(() => {
      checkIfWalletIsConnected();
    }, []);


    return(
        <div>
        {currentAccount === "" ? <Wallet to="/" onClick={connectWallet}> Connect Wallet</Wallet> : <h3>{currentAccount}</h3>}
        </div>
    )
}

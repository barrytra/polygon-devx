import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = styled(Link)`
font-weight: bold;
text-decoration-line: none;
color: #11004d;
font-family: "McLaren", cursive;
background-color: white;
grid-column-start: 1;
  grid-column-end: 3;
border: 2px solid #11004d;
border-radius: 5px;
transition-duration: 0.4s;
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

export default function FixedDepositIcon() {
    return(
        <Button to="/FDForm"> Make Fixed Deposit </Button>
    )
}
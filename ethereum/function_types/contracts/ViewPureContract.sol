// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ViewPureContract {
    uint private fund;
    
    constructor(){
        fund  = 100;
    }

    function projectedFunds(uint incomingFunds) public view returns (uint){
        return fund + incomingFunds;
    }

    function projectTax(uint funds, uint taxRate) public pure returns (uint){
        return funds * taxRate/100;
    }

}
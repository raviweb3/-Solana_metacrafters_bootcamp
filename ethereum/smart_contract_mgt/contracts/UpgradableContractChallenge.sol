// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract FixedDeposit {
    uint private interestRate;

    constructor(){
        interestRate = 2;
    }

    function computeInterest(uint amount, uint noOfDays) public view returns(uint){
        return (amount * interestRate * noOfDays)/365;
    }
}

contract RevisedFixedDeposit {
    uint private interestRate;

    constructor(uint _interestRate){
        interestRate = _interestRate;
    }

    function computeInterest(address fdContract, uint amount, uint noOfDays) public returns(bytes memory){
         (bool success, bytes memory data) = fdContract.delegatecall(
            abi.encodeWithSignature("computeInterest(uint,uint)",amount, noOfDays)
        );
        
        return data;
    }
}
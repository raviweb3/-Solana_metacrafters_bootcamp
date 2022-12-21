// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract FunctionTypeChallenge{
    uint256 private s_salary;
    address[] private s_charity;
      uint256 private s_totalCharity;

    function netSalary(uint256 tax) view public returns(uint256){
        return (s_salary - (s_salary * tax/100));
    }

    function taxProjection(uint256 gross,uint256 taxRate) pure public returns(uint256){
          return (gross - (gross * taxRate/100));
    }

    function deposit() public payable{
       s_charity.push(msg.sender);
       s_totalCharity = s_totalCharity + msg.value;
    }

}



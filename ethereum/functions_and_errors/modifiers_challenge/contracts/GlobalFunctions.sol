// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract GlobalFunctions{
    uint public totalFunds;


    function receiveMoney() public payable {
        totalFunds += msg.value;
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    function sendMoneyTo(address payable _to) public {
        _to.transfer(this.getBalance());    
    }
}
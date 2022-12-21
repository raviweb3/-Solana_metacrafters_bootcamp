// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract PRODUCTLIFECYCLE {
    address private designer;

    constructor(){
        designer = msg.sender;
    }
  
    event Concept(address indexed sender, string message);
    event Design(address indexed sender, string message);
    event Release(address indexed sender, string message);

    function verify() public {
        emit Concept(msg.sender, "Great Ideas, proof of concept works!");
        emit Design(msg.sender, "Real development for the product will complete on 10 dec!");
        emit Release(msg.sender, "Product available for sale.");
    }
}
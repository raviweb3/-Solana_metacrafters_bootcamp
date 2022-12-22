// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MemoryChallenge {
   uint private numberOfCalls;

   function CallCounter(string calldata caller) public view returns(string memory){
    string memory result = string(abi.encodePacked(caller,", You are the ", numberOfCalls, "Caller of this function")); 
    return result;
   }
}
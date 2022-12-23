// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract MembershipValidation {
    // Max number of members
    uint private s_maxMembers;
    // Owner of the Club
    address private s_owner;

    // Existing member list
    address[] private members;

    constructor(){
        // Initialized on deployment
        s_owner = msg.sender;
        s_maxMembers = 10;
    }

    // Modifier to check ownership
    modifier isOwner(){
        require(msg.sender == s_owner);
        _;
    }

    // Increase the number of members by a number
    function increaseMembers(uint moreNumber) public isOwner {
        assert(moreNumber > 0);
        s_maxMembers = s_maxMembers + moreNumber;
    }

    // decrease the number of members by a number
    function decreaseMembers(uint lessNumber) public isOwner {
         assert(lessNumber > 0);
        s_maxMembers = s_maxMembers - lessNumber;
    }

    // add a new member
    function addMember(address newMember) public isOwner {
         bool exists = false;
         for (uint i=0; i < members.length; i++) {
           if (newMember == members[i]) {
             exists = true;
             break;
           }
        }

        if(exists){
            revert("Member already exist.");
        }

        members.push(newMember);
    }

     // Increase the number of members by a number
    function getMaxMembers() public view returns(uint) {
        return s_maxMembers;
    }
}
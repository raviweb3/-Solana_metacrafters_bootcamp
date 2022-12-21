// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract ModifierChallenge{
    address[] private s_allowedUsers;

    address private s_owner;

    constructor(){
        s_owner = msg.sender;
    }

    modifier OwnerOnly {
        require(msg.sender== s_owner,"Only owner can do this");
        _;
    }

    function addUser(address user) public OwnerOnly {
        s_allowedUsers.push(user);
    }

}
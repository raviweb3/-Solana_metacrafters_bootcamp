// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract CohortProgram{
    uint private s_maxParticipants;
    uint private s_NoOfParticipants;

    enum Level{
        Beginner,
        Intermediate,
        Expert
    }

    struct Participant {
        uint256 dateOfJoining;
        string name;
        string summary;
        Level  knowledgeLevel;
        uint   rollNo;
    }
   
    mapping(address=>Participant) s_participants;
   

    Participant[] s_allParticipants;

    constructor(){
        s_maxParticipants = 30;
    }

    function register(string memory name, string memory summary, Level knowLevel) public returns(uint) {
       require(s_NoOfParticipants < s_maxParticipants,"Registration is closed");
       
       s_NoOfParticipants = s_NoOfParticipants + 1;
       Participant memory p = Participant(block.timestamp,name,summary,knowLevel,s_NoOfParticipants);
    
       s_participants[msg.sender] = p;
       s_allParticipants.push(p);
    
       return s_NoOfParticipants;
    }

    // Returns all participants
    function getAllParticipants() public view returns(Participant[] memory){
        return s_allParticipants;
    }
   
    // Get details of the current user
    function getParticipant() public view returns(Participant memory){
        return s_participants[msg.sender];
    } 

    function availableSpots() public view returns(uint){
        return s_maxParticipants - s_NoOfParticipants;
    }
}
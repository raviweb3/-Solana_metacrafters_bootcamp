export const COHORT_CONTRACT_ADDRESS = "0xABD2888971be81Ca62dF56F57d7e826D402d78AB";
export const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "availableSpots",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllParticipants",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "dateOfJoining",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "summary",
              "type": "string"
            },
            {
              "internalType": "enum CohortProgram.Level",
              "name": "knowledgeLevel",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "rollNo",
              "type": "uint256"
            }
          ],
          "internalType": "struct CohortProgram.Participant[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getParticipant",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "dateOfJoining",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "summary",
              "type": "string"
            },
            {
              "internalType": "enum CohortProgram.Level",
              "name": "knowledgeLevel",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "rollNo",
              "type": "uint256"
            }
          ],
          "internalType": "struct CohortProgram.Participant",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "summary",
          "type": "string"
        },
        {
          "internalType": "enum CohortProgram.Level",
          "name": "knowLevel",
          "type": "uint8"
        }
      ],
      "name": "register",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
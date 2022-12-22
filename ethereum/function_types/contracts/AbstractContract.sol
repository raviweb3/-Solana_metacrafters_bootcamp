// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


abstract contract  AbstractCar{
    function getSeating() virtual external returns (uint);
    function getSpeed() virtual external returns (uint);
    function getPower() virtual external returns (uint);
}

contract SportUtilityVehicle is AbstractCar{
    function getSeating() override external pure returns (uint){
        return 6;
    }
    function getSpeed() override external pure returns (uint){
        return 100;
    }
    function getPower() override external pure returns (uint){
        return 500;
    }


}

contract Sedan is AbstractCar{
    function getSeating() override external pure returns (uint){
        return 4;
    }
    function getSpeed() override external pure returns (uint){
        return 125;
    }
    function getPower() override external pure returns (uint){
        return 250;
    }
}
    



contract SportsCar is AbstractCar{
   function getSeating() override external pure returns (uint){
        return 2;
    }
    function getSpeed() override external pure returns (uint){
        return 289;
    }
    function getPower() override external pure returns (uint){
        return 555;
    }
}
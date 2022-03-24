// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;
pragma experimental ABIEncoderV2;

contract SimpleStorage {
  uint storedData;
  uint256 atharva = 7;
  string[] candy;
  uint256[] votes;

  function set(uint x) public {
    storedData = x;
  }

  function setmap(string memory name, uint256 _votes) public {
    candy.push(name);
    votes.push(_votes);
  }

  function get() public view returns (uint) {
    
    return storedData;
  }

  function getMap() public view returns(string[] memory, uint256[] memory) {
    return (candy, votes);
  }
}


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

struct Admin{
    string name;
    string mobileNo;
    string walletKey;
}

contract TmpBlockVote{
    uint t;
    Admin[] public Admins;

    function setT(uint n) public{
        t=n;
    }
    function getT() public view returns(uint){
        return t;
    }
    
    function addAdmin(string memory adName, string memory adMoNo, string memory adEthKey) public {
        Admin memory newAdmin = Admin({
            name:adName, 
            mobileNo:adMoNo,
            walletKey:adEthKey
        });
        Admins.push(newAdmin);
    }

    function adminLength() public view returns(uint){
        return Admins.length;
    }

    function getAllAdmins() public view returns(Admin[] memory){
        return Admins;
    }
}

contract TmpEciContract is TmpBlockVote {
    function getTmp() public view returns(uint){
        return t;
    }
}
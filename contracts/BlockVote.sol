// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;

struct Admin {
    string name;
    string mobileNo;
    string walletKey;
}

struct ECI {
    string name;
    string mobileNo;
    string walletKey;
}

struct Voter {
    string name;
    string mobileNo;
    string homeAddress;
    string aadharCardNo;
    string voterId;
    string walletKey;
    bool isVoted;

}

struct Candidate {
    string name; string mobileNo;
    string homeAddress; string aadharCardNo; string voterId;
    string walletKey; string politicalParty;
    uint256 votes;
}

contract BlockVote {
    uint transactionHelper = 0;
    string voterId_main="";
    Voter[] public voters;
    Admin[] public admins;
    Candidate[] public candidates;
    string votingPhase = "preVoting"; // Voting, Result

    function areStringsEqual(string memory s1, string memory s2) public pure returns(bool){
        if(keccak256(abi.encodePacked(s1)) == keccak256(abi.encodePacked((s2)))) return true;
        else return false;
    }
    
    // walletKey : voterId
    mapping(string=>string) public map_walletKey_voterid;

    // voterid : Voter;
    mapping(string=>Voter) public map_voterid_details;
    function setMapVoterDetails(string memory _voterid, Voter memory v) public {
        map_voterid_details[_voterid] = v;
        map_walletKey_voterid[v.walletKey] = v.voterId;
    }

    function hasVoted(string memory _voterid) public view returns(bool){
        return map_voterid_details[_voterid].isVoted;
    }

    // Voter ////////////////////////////////////////// 
    function isVoterRegistered(Voter memory item) public view returns(bool) {
        if(keccak256(abi.encodePacked((map_voterid_details[item.voterId].name))) != keccak256(abi.encodePacked(("")))) return true;
        else return false;
    }
    function addVoter(Voter memory item) public returns(string memory) {
        if(!isVoterRegistered(item) && !areStringsEqual(votingPhase,"Result")) {
            voters.push(item);
            return "user added";
        }
        else return "user already exists";
            
    }

    function getVoterId(string memory _walletKey) public returns(string memory) {
        voterId_main = map_walletKey_voterid[_walletKey];
        return voterId_main;
    }

    function setVoterId(string memory _voterid) public {
        voterId_main = _voterid;
    }

    function voterLength() public view returns(uint) {
        return voters.length;
    }
    /////////////////////////////////////////////////

    // Admin /////////////////////////////////////////
    
    function addAdmin(Admin memory item) public {
        if(!isAdminRegistered(item.walletKey) && !areStringsEqual(votingPhase,"Result"))
            admins.push(item);
            addToAdminsMap(item.walletKey, item);
    }

    mapping(string=>Admin) public adminsMap;
    function addToAdminsMap(string memory walletKey, Admin memory a) public {
        adminsMap[walletKey] = a;
    }

    function isAdminRegistered(string memory _walletKey) public view returns(bool){
        if(keccak256(abi.encodePacked((adminsMap[_walletKey].name))) != keccak256(abi.encodePacked(("")))) return true;
        else return false;
    }

    function authenticateAdmin(string memory _walletKey) public view returns(bool){
        if(isAdminRegistered(_walletKey)) return true;
        else return false;
    }

    function adminLength() public view returns(uint) {
        return admins.length;
    }
    ////////////////////////////////////////////////////


    // Candidate ///////////////////////////////////////

    function isCandidateRegistered(string memory _walletKey) public view returns(bool){
        if(keccak256(abi.encodePacked((candidatesMap[_walletKey].name))) != keccak256(abi.encodePacked(("")))) return true;
        else return false;
    }

    function addCandidate(Candidate memory item) public {
        if(!isCandidateRegistered(item.walletKey) && areStringsEqual(votingPhase,"preVoting"))
            candidates.push(item);
    }

    mapping(string=>Candidate) public candidatesMap;
    function addToCandidatesMap(string memory walletKey, Candidate memory c) public {
        candidatesMap[walletKey] = c;
    }
    string[] public candidate_names;
    function getCandidates() public returns(string[] memory) {
        for(uint256 i=0;i<candidates.length;i++) {
        candidate_names.push(candidates[i].name);
        }
        return candidate_names;
    }

    ////////////////////////////////////////////////////


    // Results ////////////////////////////////////////////////////////
    /* returns (candidates, votes), receives object with 2 keys (0 : candidates array, 1 : votes array)
    */
    string[] public _candidates;
    uint256[] public _votes;
    function getResults() public returns(string[] memory, uint256[] memory) {
        if(areStringsEqual(votingPhase, "Result")){
            for(uint256 i=0;i<candidates.length;i++) {
                _candidates.push(candidates[i].name);
                _votes.push(candidates[i].votes);
            }    
        }
        return (_candidates, _votes);
    }
    ////////////////////////////////////////////////////////////////////
    // Vote /////////////////////////////////////////////////////////////
    function vote(string memory _voterId, string memory _walletKey, uint256 choice) public returns(bool) {
        if(areStringsEqual(map_voterid_details[_voterId].walletKey, _walletKey)) {
            if(!map_voterid_details[_voterId].isVoted) {
                candidates[choice].votes++;
                map_voterid_details[_voterId].isVoted = true;
                for(uint256 i=0;i<voters.length;i++) {
                    if(areStringsEqual(voters[i].voterId, _voterId)){
                        voters[i].isVoted = true;
                        break;
                    }
                }
                return true;
            }
            return false;
        }
        return false;
    }

    function voteThroughAdmin(string memory _voterId, uint256 choice) public returns(bool) {
        if(!map_voterid_details[_voterId].isVoted) {
            candidates[choice].votes++;
            map_voterid_details[_voterId].isVoted = true;
            for(uint256 i=0;i<voters.length;i++) {
                if(areStringsEqual(voters[i].voterId, _voterId)){
                    voters[i].isVoted = true;
                    break;
                }
            }
            return true;
        }
        return false;
    }

    /////////////////////////////////////////////////////////////////////
}

contract AdminCon is BlockVote{
    Admin public a;

    constructor(string memory _name, string memory _mobileNo, string memory  _walletKey) {
        a.name = _name;
        a.mobileNo = _mobileNo;
        a.walletKey = _walletKey;
        addAdmin(a);
        addToAdminsMap(_walletKey,a);
    }

}

contract ECICon is BlockVote {
    Admin public e;

    constructor() {
        e.name = "ECI";
        e.mobileNo = "9876543210";
        e.walletKey = "0xB663Fde35c596E597A5660de6728b4bC302cb677";
    }

    function getECI() public view returns(string memory) {
       return e.walletKey;
    }

    function authenticateECI(string memory _walletKey) public pure returns(bool) {
        if(keccak256(abi.encodePacked(_walletKey)) == keccak256(abi.encodePacked(("0xB663Fde35c596E597A5660de6728b4bC302cb677")))) return true;
        else return false;
    }

    function setAdmin(string memory _name, string memory _mobileNo, string memory _walletKey) public {
        Admin memory newAdmin = Admin({
            name:_name, 
            mobileNo:_mobileNo,
            walletKey:_walletKey
        });
        addAdmin(newAdmin);

    }

    function startVoting() public {
        votingPhase = "Voting";
    }

    function endVoting() public {
        votingPhase = "Result";
    }
}

contract VoterCon is BlockVote {
    Voter public v;
    
    constructor(string memory _name, string memory _mobileNo, string memory _homeAddress,
     string memory _aadharCardNo, string memory _voterId, string memory _walletKey) {
        v.name = _name;
        v.mobileNo = _mobileNo;
        v.homeAddress = _homeAddress;
        v.aadharCardNo = _aadharCardNo;
        v.voterId = _voterId;
        v.walletKey = _walletKey;
        v.isVoted = false;
        addVoter(v);
        setMapVoterDetails(_voterId, v);
     }
}

contract CandidateCon is BlockVote {
    Candidate public c;

    constructor(string memory _name, string memory _mobileNo, string memory _homeAddress,
     string memory _aadharCardNo, string memory _voterId, string memory _walletKey, string memory _politicalParty) {
        c.name = _name;
        c.mobileNo = _mobileNo;
        c.homeAddress = _homeAddress;
        c.aadharCardNo = _aadharCardNo;
        c.voterId = _voterId;
        c.walletKey = _walletKey;
        c.politicalParty = _politicalParty;
        c.votes = 0;
        addCandidate(c);
        addToCandidatesMap(_walletKey, c);
    }
}
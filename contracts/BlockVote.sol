// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

struct Admin{
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
    string name;
    string mobileNo;
    string homeAddress;
    string aadharCardNo;
    string voterId;
    string walletKey;
    string politicalParty;
    uint256 votes;
}

contract BlockVote{
    /* Global Variables START. */
    Admin public ECI = Admin({name:"ECI_Official", mobileNo:"1234567890", walletKey:"0xB663Fde35c596E597A5660de6728b4bC302cb677"});
    string voterId_main="";
    Admin[] public Admins;
    Voter[] public Voters;
    mapping (string=>Admin) public mapWalletKey2Admin;
    // walletKey : voterId
    mapping(string=>string) public map_walletKey_voterid;
    // voterid : Voter;
    mapping(string=>Voter) public map_voterid_details;
    string votingPhase = "preVoting";
    /* Global Variables END. */

    /* ECI Functions START. */
    uint addAdminState;     // 0 -> Not added, 1 -> Added succesfully, 2 -> Admin already exist, 3 -> Invalid ECI.
    
    function startVoting() public {
        votingPhase = "Voting";
    }

    function endVoting() public {
        votingPhase = "Result";
    }

    // Set addAdminState = 0.
    function resetAddAdminState() private{
        addAdminState = 0;
    }

    // Returns state of the last addAdmin call.
    function getAddAdminState() public view returns(uint){
        return addAdminState;
    }

    // Add an admin to the blockchain.
    function addAdmin(string memory ECI_Key,string memory adName, string memory adMoNo, string memory adEthKey) public{
        resetAddAdminState();
        if(areStringsEqual(ECI_Key, ECI.walletKey)){
            if(!areStringsEqual(mapWalletKey2Admin[adEthKey].walletKey, adEthKey)) {
                Admin memory newAdmin = Admin({
                    name:adName, 
                    mobileNo:adMoNo,
                    walletKey:adEthKey
                });
                Admins.push(newAdmin);
                mapWalletKey2Admin[adEthKey] = newAdmin;
                addAdminState = 1;
            }
            else
                addAdminState = 2;
        }
        else
            addAdminState = 3;   
    }

    // Returns total number of admins in the blockchain.
    function adminLength() public view returns(uint){
        return Admins.length;
    }

    // Returns all admins in the blockchain.
    function getAllAdmins() public view returns(Admin[] memory){
        return Admins;
    }

    /* ECI Functions END. */

    /* Admin Functions START. */
    /* Admin Functions END. */

    /* Voter Functions START. */
    
    function addVoter(string memory _name, string memory _mobileNo, string memory _homeAddress,
     string memory _aadharCardNo, string memory _voterId, string memory _walletKey) public {
        Voter memory newVoter = Voter({
                    name:_name, 
                    mobileNo:_mobileNo,
                    homeAddress:_homeAddress,
                    aadharCardNo:_aadharCardNo,
                    voterId:_voterId,
                    walletKey:_walletKey,
                    isVoted:false
        });
        if(!isVoterRegistered(newVoter)) {
            Voters.push(newVoter);
            map_voterid_details[_walletKey] = newVoter;
            map_walletKey_voterid[_walletKey] = _voterId;
        }
        
    }

    function hasVoted(string memory _voterid) public view returns(bool){
        return map_voterid_details[_voterid].isVoted;
    }

    function isVoterRegistered(Voter memory item) public view returns(bool) {
        if(!areStringsEqual(map_voterid_details[item.voterId].name,"")) return true;
        else return false;
    }

    function authenticateVoter(string memory _walletKey) public returns(bool) {
        if(!areStringsEqual(map_voterid_details[getVoterId(_walletKey)].name,"")) return true;
        else return false;
    }

    function getVoterId(string memory _walletKey) public returns(string memory) {
        voterId_main = map_walletKey_voterid[_walletKey];
        return voterId_main;
    }

    function setVoterId(string memory _voterid) public {
        voterId_main = _voterid;
    }

    function voterLength() public view returns(uint) {
        return Voters.length;
    }

    /* Voter Functions END. */
    
    /* Candidate Functions START. */

    

    /* Candidate Functions END. */

    /* Utility Functions START. */
    function areStringsEqual(string memory S1, string memory S2) public pure returns(bool){
        return keccak256(bytes(S1)) == keccak256(bytes(S2));
    }
    /* Utility Functions END. */
}

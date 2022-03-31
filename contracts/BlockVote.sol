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
    string symbolUrl;
}

contract BlockVote{
    /* Global Variables START. */
    Admin public ECI = Admin({name:"ECI_Official", mobileNo:"1234567890", walletKey:"0xB663Fde35c596E597A5660de6728b4bC302cb677"});
    string voterId_main="";
    Admin[] public Admins;
    Voter[] public Voters;
    Candidate[] public Candidates;
    string[] public candidate_names;
    mapping (string=>Admin) public mapWalletKey2Admin;
    // walletKey : voterId
    mapping(string=>string) public map_walletKey_voterid;
    // voterid : Voter;
    mapping(string=>Voter) public map_voterid_details;
    // wallet address : Candidate
    mapping(string=>Candidate) public candidatesMap;
    string votingPhase = "preVoting"; // Voting, Result
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

    function authenticateECI(string memory _walletKey) public view returns(bool) {
        return areStringsEqual(_walletKey, ECI.walletKey);
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

    function getVoterMobileNumber(string memory _voterid) public view returns(string memory) {
        return map_voterid_details[_voterid].mobileNo;
    }

    /* Voter Functions END. */
    
    /* Candidate Functions START. */
    function addCandidate(string memory _name, string memory _mobileNo, string memory _homeAddress,
     string memory _aadharCardNo, string memory _voterId, string memory _walletKey, string memory _politicalParty, string memory _symbolUrl) public {
        Candidate memory newCandidate = Candidate({
                    name:_name, 
                    mobileNo:_mobileNo,
                    homeAddress:_homeAddress,
                    aadharCardNo:_aadharCardNo,
                    voterId:_voterId,
                    walletKey:_walletKey,
                    politicalParty:_politicalParty,
                    votes: 0,
                    symbolUrl: _symbolUrl
        });
        if(!isCandidateRegistered(_walletKey)) {
            Candidates.push(newCandidate);
            candidatesMap[_walletKey] = newCandidate;
            addVoter( _name, _mobileNo,  _homeAddress,
                _aadharCardNo, _voterId,  _walletKey);
        }   
    }

    function isCandidateRegistered(string memory _walletKey) public view returns(bool){
        if(!areStringsEqual(candidatesMap[_walletKey].name,""))return true;
        else return false;
    }

    function getCandidates() public returns(string[] memory) {
        for(uint256 i=0;i<Candidates.length;i++) {
        candidate_names.push(Candidates[i].name);
        }
        return candidate_names;
    }
    

    /* Candidate Functions END. */

    /* Results Functions START */
    /* returns (candidates, votes, symbolUrls), receives object with 3 keys (0 : candidates array, 1 : votes array, 2: symbolUrls array) */
    
    string[] public _candidates;
    uint256[] public _votes;
    string[] public _symbolUrls;
    function getResults() public returns(string[] memory, uint256[] memory, string[] memory) {
        if(areStringsEqual(votingPhase, "Result")){
            for(uint256 i=0;i<Candidates.length;i++) {
                _candidates.push(Candidates[i].name);
                _votes.push(Candidates[i].votes);
                _symbolUrls.push(Candidates[i].symbolUrl);
            }    
        }
        return (_candidates, _votes, _symbolUrls);
    }
    /* Results Functions END */

    /* Voting Functions START */ 
    
    function vote(string memory _voterId, string memory _walletKey, uint256 choice) public returns(string memory) {
        if(areStringsEqual(map_voterid_details[_voterId].walletKey, _walletKey)) {
            if(!map_voterid_details[_voterId].isVoted) {
                Candidates[choice].votes++;
                string memory temp_walletKey = Candidates[choice].walletKey;
                candidatesMap[temp_walletKey].votes++;
                map_voterid_details[_voterId].isVoted = true;
                for(uint256 i=0;i<Voters.length;i++) {
                    if(areStringsEqual(Voters[i].voterId, _voterId)){
                        Voters[i].isVoted = true;
                        break;
                    }
                }
                return "Vote casted successfully!";
            }
            return "Voter has already voted!";
        }
        return "Could not cast a vote, Voter not registered! (try changing account on metamask)";
    }

    function voteThroughAdmin(string memory _voterId, uint256 choice) public returns(string memory) {
        if(!map_voterid_details[_voterId].isVoted) {
            Candidates[choice].votes++;
            string memory temp_walletKey = Candidates[choice].walletKey;
            candidatesMap[temp_walletKey].votes++;
            map_voterid_details[_voterId].isVoted = true;
            for(uint256 i=0;i<Voters.length;i++) {
                if(areStringsEqual(Voters[i].voterId, _voterId)){
                    Voters[i].isVoted = true;
                    break;
                }
            }
            return "Vote casted successfully!";
        }
        return "Voter has already voted!";
    }
    /* Voting Functions END */ 

    /* Utility Functions START. */
    function areStringsEqual(string memory S1, string memory S2) public pure returns(bool){
        return keccak256(bytes(S1)) == keccak256(bytes(S2));
    }

    function sampleValue() public pure returns(uint){
        return 5;
    }
    /* Utility Functions END. */
}

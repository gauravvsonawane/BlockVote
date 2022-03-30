// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

struct Admin{
    string name;
    string mobileNo;
    string walletKey;
}

contract BlockVote{
    /* Global Variables START. */
    Admin public  ECI = Admin({name:"ECI_Official", mobileNo:"1234567890", walletKey:"0xDb29b8896B08f58c5e3487c3EC4CfCb576b4F983"});
    
    Admin[] public Admins;
    mapping (string=>Admin) public mapWalletKey2Admin;
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
    /* Voter Functions END. */
    
    /* Candidate Functions START. */
    /* Candidate Functions END. */

    /* Utility Functions START. */
    function areStringsEqual(string memory S1, string memory S2) public pure returns(bool){
        return keccak256(bytes(S1)) == keccak256(bytes(S2));
    }
    /* Utility Functions END. */
}

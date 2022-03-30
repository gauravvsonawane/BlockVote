var BlockVote = artifacts.require("./BlockVote.sol");

module.exports = function(deployer) {
  deployer.deploy(BlockVote);
};

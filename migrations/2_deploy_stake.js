// ++++++++++++++++ Define Contracts ++++++++++++++++ 

//Token First
const ETH = artifacts.require("./TokenMintERC20Token.sol");

// ++++++++++++++++  Main Migration ++++++++++++++++ 

const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployToken(deployer, network),
  ]);
};

module.exports = migration;

// ++++++++++++++++  Deploy Functions ++++++++++++++++ 
async function deployToken(deployer, network) {
  await deployer.deploy(ETH, "ETH", "ETH", 18, "100000000000000000000000", "0xeca31d9e2a932aa38345e3d35ab9b30cce800144", "0xeca31d9e2a932aa38345e3d35ab9b30cce800144" );
}
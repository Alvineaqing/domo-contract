// ++++++++++++++++ Define Contracts ++++++++++++++++ 

//Deploy Token First
const DOMO = artifacts.require("./DOMO.sol");

//Deploy Pool
const DEFIPool = artifacts.require("./DEFIPool.sol");


// ++++++++++++++++  Main Migration ++++++++++++++++ 

const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployPool(deployer, network, accounts),
  ]);
};

module.exports = migration;

// ++++++++++++++++  Deploy Functions ++++++++++++++++ 
async function deployPool(deployer, network, accounts) {

  let defi = new web3.eth.Contract(DOMO.abi, '0x1A99Cc6A028f55800f866463Cc7708BDEFd4fB2C');
  let reward_account = accounts[0];
  let gas_price = 165000000000;

  console.log("1.Start deploy pool on Network= " + network);

  await deployer.deploy(DEFIPool, accounts[0]);
  
  console.log("2.Start add minter acl for pool");
  defi.methods.addMinter(DEFIPool.address).send({ from: reward_account, gasPrice: gas_price, gas: 100000});

  console.log("3.Start set reward distributor");

  let defi_pool = new web3.eth.Contract(DEFIPool.abi, DEFIPool.address);

  await Promise.all([
    defi_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account, gasPrice: gas_price, gas: 100000}),
  ]);

  console.log("4.Start reward DEMO to pool");

  let init_quota = web3.utils.toBN(10 ** 18).mul(web3.utils.toBN(10000));

  await Promise.all([
    defi_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gasPrice: gas_price, gas:150000}),
  ]);

}
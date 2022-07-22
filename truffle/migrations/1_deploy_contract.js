const MyToken = artifacts.require("MyToken");
const MyTokenSale = artifacts.require("MyTokenSale");
require("dotenv").config({path: "../.env"});


module.exports = async function (deployer) {
  const addr = await web3.eth.getAccounts();

  await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
  await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address);

  //transfer tokens to the tokenSale contract
  const instance = await MyToken.deployed();
  instance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS);
};

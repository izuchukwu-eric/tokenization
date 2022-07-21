const MyToken = artifacts.require("MyToken");
const MyTokenSale = artifacts.require("MyTokenSale");


module.exports = async function (deployer) {
  const addr = web3.eth.getAccounts();

  await deployer.deploy(MyToken, 1000000);
  await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address);

  //transfer tokens to the tokenSale contract
  const instance = await MyToken.deployed();
  instance.transfer(MyTokenSale.address, 1000000);
};

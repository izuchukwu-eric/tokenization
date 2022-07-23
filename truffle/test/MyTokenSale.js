const Token = artifacts.require("MyToken");
const TokenSale = artifacts.require("MyTokenSale");
const KycContract = artifacts.require("KycContract");

const chai = require("./SetupChai.js");
const BN = web3.utils.BN;
const expect  = chai.expect;

require("dotenv").config({path: "../.env"});


contract("TokenSale Test", function (accounts) {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    it("should not have any token in my deployerAccount", async () => {
        const instance = await Token.deployed();

        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    })

    it("all tokens should be in the tokensale contract by default", async () => {
        let instance =  await Token.deployed();

        let balanceOfTokenSaleContract = await instance.balanceOf(TokenSale.address);
        let totalSupply = await instance.totalSupply();

        await expect(balanceOfTokenSaleContract).to.be.a.bignumber.equal(totalSupply);

    })

    it("should be able to buy tokens", async () => {
        const tokenInstance = await Token.deployed();
        const tokenSaleInstance = await TokenSale.deployed();
        const KycContractInstance = await KycContract.deployed();
        const balanceBefore = await tokenInstance.balanceOf(deployerAccount);

        await KycContractInstance.setKycCompleted(deployerAccount, {from: deployerAccount});
        await expect(tokenSaleInstance.sendTransaction({to: deployerAccount, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        await expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(1)));
    })

})   
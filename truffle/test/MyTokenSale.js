const TokenSale = artifacts.require("MyTokenSale");
const Token = artifacts.require("MyToken");

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

})   
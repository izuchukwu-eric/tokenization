const Token = artifacts.require("MyToken");

const chai = require("./SetupChai.js");
const BN = web3.utils.BN;
const expect  = chai.expect;

require("dotenv").config({path: "../.env"});



contract("Token Test", function (accounts) {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    beforeEach(async () => {
        this.myToken = await Token.new(process.env.INITIAL_TOKENS);
    })

    it("all tokens should be in my account", async () => {
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        //let balance = await instance.balanceOf(accounts[0]);
        //assert.equal(balance.valueOf(), initialSupply.valueOf(), "The balance was not the same");
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    })
    

    it("is possible to send tokens between accounts", async () => {
        const sendToken = 1;
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();

       await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
       await expect(instance.transfer(recipient, sendToken)).to.eventually.be.fulfilled;
       await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendToken)));
       await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendToken));
    })


    it("is not possible to send more token than available in total", async () => {
        let instance = this.myToken;
        let balanceOfDeployer = await instance.balanceOf(deployerAccount);

       await expect(instance.transfer(recipient, new BN(balanceOfDeployer+1))).to.eventually.be.rejected
       await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    })



})
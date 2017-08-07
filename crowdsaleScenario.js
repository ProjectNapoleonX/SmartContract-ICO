const fs = require("fs");
//const solc = require('solc');
var Web3 = require('web3');
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
if (!web3.isConnected()) {
    console.error("Ethereum - no conection to RPC server");
} else {
    console.log("Ethereum - connected to RPC server");
}
web3.eth.getTransactionReceiptMined = require("./getTransactionReceiptMined.js");

const account = web3.eth.accounts[0];
const account_sidekick = web3.eth.accounts[1];
const recipient = web3.eth.accounts[2];
web3.personal.unlockAccount(account,unlockingPassword, 1000);
console.log(account);

var crowdSaleContractAddress = "0x6d79f29c0d54512d16bacef196404f2bee433729";
var napoleonxcrowdsaleAbi = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"investedAmountOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ETHER_MIN_CAP","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"endTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"weiRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"tokensSold","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"napoleonXToken","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"weiRefunded","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"halt","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newAddress","type":"address"}],"name":"changeNapoleonXAddress","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"MIN_OWNABLE_TOKEN_FRACTION_NUMERATOR","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ETHER_MAX_CAP","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"amountInWei","type":"uint256"}],"name":"calculateTokenAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"halted","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"unhalt","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"discountInPercent","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ONE_NPX_TOKEN_PRICE","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"MAX_CONTRIBUTION_DURATION","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"MIN_OWNABLE_TOKEN_FRACTION_DENOMINATOR","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"safeWithdrawal","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"napoleonXTokenAddress","type":"address"},{"name":"napoleonXMultiSigWalletAddress","type":"address"},{"name":"setStartTime","type":"uint256"},{"name":"greenlistAddress","type":"address"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"investor","type":"address"},{"indexed":false,"name":"weiAmount","type":"uint256"}],"name":"Refund","type":"event"}];
var napoleonxcrowdsaleContract = web3.eth.contract(napoleonxcrowdsaleAbi);
var napoleonxcrowdsale = napoleonxcrowdsaleContract.at(crowdSaleContractAddress);


// in this scenario all users vote for the change
console.log("Getting the portfolio owners")
var owners = napoleonXmultiSigWallet.getOwners();
console.log(owners);

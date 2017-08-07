
const fs = require("fs");
const solc = require('solc');
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

var multisigAddress = "0xf1565df2b02ac6d756a1a594b180d34ee3438be8";
var browser_untitled_sol_multisigwalletContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"owners","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"}],"name":"removeOwner","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"transactionId","type":"uint256"}],"name":"revokeConfirmation","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"address"}],"name":"confirmations","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"pending","type":"bool"},{"name":"executed","type":"bool"}],"name":"getTransactionCount","outputs":[{"name":"count","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"}],"name":"addOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"transactionId","type":"uint256"}],"name":"isConfirmed","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"transactionId","type":"uint256"}],"name":"getConfirmationCount","outputs":[{"name":"count","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"transactions","outputs":[{"name":"destination","type":"address"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"},{"name":"executed","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getOwners","outputs":[{"name":"","type":"address[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"from","type":"uint256"},{"name":"to","type":"uint256"},{"name":"pending","type":"bool"},{"name":"executed","type":"bool"}],"name":"getTransactionIds","outputs":[{"name":"_transactionIds","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"transactionId","type":"uint256"}],"name":"getConfirmations","outputs":[{"name":"_confirmations","type":"address[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"transactionCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_required","type":"uint256"}],"name":"changeRequirement","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getLastTransactionId","outputs":[{"name":"count","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"transactionId","type":"uint256"}],"name":"confirmTransaction","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"destination","type":"address"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"}],"name":"submitTransaction","outputs":[{"name":"transactionId","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"MAX_OWNER_COUNT","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"required","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"},{"name":"newOwner","type":"address"}],"name":"replaceOwner","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"transactionId","type":"uint256"}],"name":"executeTransaction","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_owners","type":"address[]"},{"name":"_required","type":"uint256"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"transactionId","type":"uint256"}],"name":"Confirmation","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"transactionId","type":"uint256"}],"name":"Revocation","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"transactionId","type":"uint256"}],"name":"Submission","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"transactionId","type":"uint256"}],"name":"Execution","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"transactionId","type":"uint256"}],"name":"ExecutionFailure","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"OwnerAddition","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"OwnerRemoval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"required","type":"uint256"}],"name":"RequirementChange","type":"event"}]);

var napoleonXmultiSigWallet = browser_untitled_sol_multisigwalletContract.at(multisigAddress);
// in this scenario all users vote for the change
console.log("Getting the portfolio owners")
var owners = napoleonXmultiSigWallet.getOwners();
console.log(owners);
console.log("NapoleonX MultiSig Balance");
console.log(web3.eth.getBalance(napoleonXmultiSigWallet.address));
web3.personal.unlockAccount(account,unlockingPassword,1000);
console.log("Principal account balance");
console.log(web3.eth.getBalance(web3.eth.coinbase));
var creditContract = false;
if (creditContract){
    var amount = web3.toWei(1.5, "ether");
    //var success = napoleonXmultiSigWallet.address.send(amount);
    //console.log(success);
    var fillingTxHash = web3.eth.sendTransaction({from:web3.eth.coinbase, to:napoleonXmultiSigWallet.address, value: amount});
    console.log("NapoleonX MultiSig Balance");
    web3.eth.getBalance(napoleonXmultiSigWallet.address);
}

var desc = "Hello from NapoleonX ICO wallet";
var transactions_pending = napoleonXmultiSigWallet.getTransactionCount(true, false);
console.log("Number of pending transactions : '" + transactions_pending + "'");
var ether_amount = web3.toWei(0.5, "ether");
var initiation_transaction = napoleonXmultiSigWallet.submitTransaction.sendTransaction(
recipient,
ether_amount,
web3.toHex(desc),
 {
        from: account,
        gas: 1000000
 });

var MyInitiationTransactionReceipt = web3.eth.getTransactionReceiptMined(initiation_transaction);

var transactions_pending_now = napoleonXmultiSigWallet.getTransactionCount(true, false);
console.log("Number of pending transactions after: '" + transactions_pending_now + "'");

var transactions_executed = napoleonXmultiSigWallet.getTransactionCount(false, true);
console.log("Number of executed transactions : '" + transactions_executed + "'");

var transactionId = napoleonXmultiSigWallet.getLastTransactionId();
console.log("Transaction id " + transactionId);
var confirmationCount = napoleonXmultiSigWallet.getConfirmationCount(transactionId);
console.log("Confirmation count " + confirmationCount);
web3.personal.unlockAccount(account_sidekick,unlockingPassword);
var confirmation_transaction = napoleonXmultiSigWallet.confirmTransaction.sendTransaction(
transactionId,
 {
        from: account_sidekick,
        gas: 1000000
 });
var MySecondSigningTransactionReceipt = web3.eth.getTransactionReceiptMined(confirmation_transaction);

var success = napoleonXmultiSigWallet.isConfirmed(transactionId);

var confirmationCountBis = napoleonXmultiSigWallet.getConfirmationCount(transactionId);
console.log("Confirmation count after " + confirmationCountBis);
var transactions_executed_now = napoleonXmultiSigWallet.getTransactionCount(false, true);
console.log("Number of executed transactions after: '" + transactions_executed_now + "'");

var execution_transaction = napoleonXmultiSigWallet.executeTransaction.sendTransaction(
transactionId,
 {
        from: account,
        gas: 1000000
 });

var MyExecutionReceipt = web3.eth.getTransactionReceiptMined(execution_transaction);


//var failedEvent = napoleonXmultiSigWallet.ExecutionFailure({_from:account},{fromBlock: 0, toBlock: 'latest'});
//event.watch(function(error, result){
//    if (!error)
//        alert("wait for a while, check for block Synchronization or block creation");
//        console.log(result);
//});

var failedEvent = napoleonXmultiSigWallet.ExecutionFailure({_from:account});
failedEvent.watch(function(error, result){
  if (error) {
    console.log("Failed event");
    console.log(error);
    return;
  }
  console.log("Failed event");
  console.log(result.args.transactionId);
});

var failedEvent = napoleonXmultiSigWallet.ExecutionFailure();
failedEvent.watch(function(error, result){
  if (error) {
    console.log("Failed event");
    console.log(error);
    return;
  }
  console.log("Failed event");
  console.log(result.args.transactionId);
});
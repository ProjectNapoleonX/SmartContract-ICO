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
const account = web3.eth.accounts[0];

let napxMulitSigWalletSource = fs.readFileSync('./contracts/MultiSigWallet.sol', 'utf8');
let napxMulitSigWalletArtifacts = solc.compile(napxMulitSigWalletSource, 1);
let napxMulitSigWalletAbi = napxMulitSigWalletArtifacts.contracts[':MultiSigWallet'].interface;
let napxMulitSigWalletBytecode = "0x"+napxMulitSigWalletArtifacts.contracts[':MultiSigWallet'].bytecode;
let napxMulitSigWalletGasEstimate = web3.eth.estimateGas({
    data: napxMulitSigWalletBytecode
});
console.log(napxMulitSigWalletGasEstimate);
web3.personal.unlockAccount(account,"paul9lucien6", 1000);
console.log(account);

let napxMulitSigWalletContract = web3.eth.contract(JSON.parse(napxMulitSigWalletAbi));

var napXMultiSigOwners = [web3.eth.accounts[0],web3.eth.accounts[1]];


var napxMulitSigWalletContractInstance = napxMulitSigWalletContract.new(
     napXMultiSigOwners,
     2,
     {
       from: account,
       data: napxMulitSigWalletBytecode,
       gas:  napxMulitSigWalletGasEstimate
     }, function(err, myContract) {
    if (!err) {
        // NOTE: The callback will fire twice!
        // Once the contract has the transactionHash property set and once its deployed on an address.

        // e.g. check tx hash on the first call (transaction send)
        if (!myContract.address) {
            console.log("TransactionHash")
            console.log(myContract.transactionHash) // The hash of the transaction, which deploys the contract

            // check address on the second call (contract deployed)
        } else {
            console.log("Contract deployed at :"+myContract.address);
            //console.log(myContract.address) // the contract address
            //exports.contractAddress = myContract.address;
        }

        // Note that the returned "myContractReturned" === "myContract",
        // so the returned "myContractReturned" object will also get the address set.
    }
    else{
      console.log(err);
    }
});

web3.eth.getTransactionReceiptMined = require("getTransactionReceiptMined.js");
web3.eth.getTransactionReceiptMined(napxMulitSigWalletContractInstance.transactionHash);

// Transaction has entered to geth memory pool
console.log("Your contract is being deployed in transaction at http://ropsten.etherscan.io/tx/" + napxMulitSigWalletContractInstance.transactionHash);

//// http://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
//function sleep(ms) {
//  return new Promise(resolve => setTimeout(resolve, ms));
//}
//
//var async = require('asyncawait/async');
//var await = require('asyncawait/await');
//// We need to wait until any miner has included the transaction
//// in a block to get the address of the contract
//async(function waitBlock() {
//  while (true) {
//    let receipt = web3.eth.getTransactionReceipt(napxMulitSigWalletContractInstance.transactionHash);
//    if (receipt && receipt.contractAddress) {
//      console.log("Your contract has been deployed at http://testnet.etherscan.io/address/" + receipt.contractAddress);
//      console.log("Note that it might take 30 - 90 sceonds for the block to propagate befor it's visible in etherscan.io");
//      break;
//    }
//    console.log("Waiting a mined block to include your contract... currently in block " + web3.eth.blockNumber);
//    await(sleep(4000));
//  }
//});
//
//waitBlock();
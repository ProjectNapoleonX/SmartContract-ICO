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
var napxGreenlistAbi =[{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"committer","type":"address"},{"name":"value","type":"uint256"}],"name":"registerCommitment","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_committer","type":"address"}],"name":"commitmentOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"}];
var napxGreenlistBytecode = '0x6060604052341561000f57600080fd5b5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b610398806100616000396000f30060606040523615610060576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806318160ddd1461006457806341c0e1b51461008d5780639f19bc2f146100a2578063f662b881146100e4575b5b5b005b341561006f57600080fd5b610077610131565b6040518082815260200191505060405180910390f35b341561009857600080fd5b6100a0610137565b005b34156100ad57600080fd5b6100e2600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506101cf565b005b34156100ef57600080fd5b61011b600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506102dd565b6040518082815260200191505060405180910390f35b60025481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561019257600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561022c57600080fd5b600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905061027a60025483610327565b60028190555061028c60025482610352565b60028190555081600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b5b505050565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b919050565b600080828401905083811015801561033f5750828110155b151561034757fe5b8091505b5092915050565b600082821115151561036057fe5b81830390505b929150505600a165627a7a723058200710d485494e04c7710697788751d99f44e2f5d2caabb58dfa3611409c82924c0029';

//let napxGreenlistSource = fs.readFileSync('./contracts/Greenlist.sol', 'utf8');
//let napxGreenlistArtifacts = solc.compile(napxGreenlistSource, 1);
//let napxGreenlistAbi = napxGreenlistArtifacts.contracts[':Greenlist'].interface;
//let napxGreenlistBytecode = "0x"+napxGreenlistArtifacts.contracts[':Greenlist'].bytecode;
let napxGreenlistGasEstimate = web3.eth.estimateGas({
    data: napxGreenlistBytecode
});
console.log(napxGreenlistGasEstimate);
web3.personal.unlockAccount(account,unlockingPassword, 1000);
console.log(account);

var napxGreenlistContract = web3.eth.contract(napxGreenlistAbi);

var napxGreenlistContractInstance = napxGreenlistContract.new(
     {
       from: account,
       data: napxGreenlistBytecode,
       gas:  napxGreenlistGasEstimate
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

web3.eth.getTransactionReceiptMined = require("./getTransactionReceiptMined.js");
var MyReceipt = web3.eth.getTransactionReceiptMined(napxGreenlistContractInstance.transactionHash);

// Transaction has entered to geth memory pool
console.log("Your contract is being deployed in transaction at http://ropsten.etherscan.io/tx/" + napxGreenlistContractInstance.transactionHash);

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
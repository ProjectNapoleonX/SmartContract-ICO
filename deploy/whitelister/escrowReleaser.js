var fs = require("fs");
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

var account = web3.eth.accounts[0];

console.log(account);

var napoleonxEscrowAbi =
[
    {
      "constant": true,
      "inputs": [],
      "name": "gateway",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "contributor",
          "type": "address"
        }
      ],
      "name": "fund",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "contributions",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "contributor",
          "type": "address"
        }
      ],
      "name": "retry",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_gateway",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "contributor",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "PendingContributionReceived",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "contributor",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "PendingContributionAccepted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "contributor",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "PendingContributionWithdrawn",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    }
  ];

var napoleonXEscrowAddress ="0xf058ee35f381a12b3a0f504025419dcaf047ce7f";

web3.personal.unlockAccount(account, unlockingPassword,"0x3e8");


var napoleonxEscrowContract = web3.eth.contract(napoleonxEscrowAbi);
var napoleonxEscrow = napoleonxEscrowContract.at(napoleonXEscrowAddress);



var transferEvent = napoleonxEscrow.PendingContributionReceived({}, {fromBlock: 0, toBlock: 'latest'})
transferEvent.get((error, logs) => {
  // we have the logs, now print them
  logs.forEach(log => console.log(log.args))
});

var toRetry = [
'0x11fda9ababe598bf10912fbcae6a4b025772db16',
'0xf8a52f76a426c5efb4e65f0853155caa9d03fd9e',
'0x673841812783da867e9df8d11ca35a1a7b663920',
'0x0b0c8836a1db2cc12a4552661031520dff5ce412',
'0x305407ce74a59a21d6ec5b8f73dc1922e500022c',
'0x0a3718b77a0336254705f78fb562cf42fca371b6',
'0x47e8d8302c138920ba60918c9aac395c5893226c',
'0x3906aa88f8f6e12b3d16d117ec5cb90b30465ae9',
'0x578c62ce31d6b86fccba350aba707794ef1b1418',
'0x3d0e59fe8010553776d42bbc585576968e9426d1'];



for (var i = 1; i < toRetry.length; i++) {
  var fields = toRetry[i].split(',');
	var myAddress = fields[0];
  console.log("Retrying");
  console.log(myAddress);
  //var napoleonXEscrowPopulateData = napoleonxEscrow.retry.getData(myAddress);
  //var napoleonXEscrowPopulateDataEstimate = web3.eth.estimateGas({from : account, to : napoleonXEscrowAddress, data: napoleonXEscrowPopulateData});

  //console.log(napoleonXWhitelistPopulateData);
  var napoleonXEscrowPopulateDataEstimate = Math.max(web3.eth.getBlock("latest").gasLimit,200000);
  console.log(napoleonXEscrowPopulateDataEstimate);

  var unstuckEscrow_transaction = napoleonxEscrow.retry.sendTransaction(myAddress, {
      from: account,
      gas: napoleonXEscrowPopulateDataEstimate
  });
  console.log("@bcTransaction@"+unstuckEscrow_transaction);
  var MyPopulateWhiteListReceipt = web3.eth.getTransactionReceiptMined(unstuckEscrow_transaction);
}

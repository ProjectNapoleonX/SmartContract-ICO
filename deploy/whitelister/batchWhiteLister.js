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

var napoleonxWhitelistAbi =
[
    {
      "constant": true,
      "inputs": [
        {
          "name": "candidate",
          "type": "address"
        }
      ],
      "name": "isWhitelisted",
      "outputs": [
        {
          "name": "",
          "type": "bool"
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
          "name": "candidate",
          "type": "address"
        }
      ],
      "name": "revoke",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "candidates",
          "type": "address[50]"
        }
      ],
      "name": "authorizeMany",
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
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "whitelist",
      "outputs": [
        {
          "name": "",
          "type": "bool"
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
          "name": "candidate",
          "type": "address"
        }
      ],
      "name": "authorize",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
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
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "candidate",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "Authorized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "candidate",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "Revoked",
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

var napoleonXWhitelistAddress ="0x45f0f40297df736fe33efbf703d6ff287cb29cf7";

web3.personal.unlockAccount(account, unlockingPassword,"0x3e8");


var napoleonXWhitelistContract = web3.eth.contract(napoleonxWhitelistAbi);
var napoleonXWhitelist = napoleonXWhitelistContract.at(napoleonXWhitelistAddress);


// Synchronous read
var data = fs.readFileSync('./data/whitelisted.csv').toString().split('\n');


// Looping and batch sending
var whitelisted = [];
var batchSize = 50;
var counter = 0;
var napoleonXWhitelistPopulateDataEstimate;

for (var i = 1; i < data.length; i++) {
  var fields = data[i].split(',');
	var myAmount = parseInt(fields[1]);
	var myAddress = fields[0];
	whitelisted.push(myAddress);
	console.log(myAddress);
	counter = counter + 1;
	if (counter  == batchSize){
		console.log("Handling@Whitelisted@"+whitelisted.length);
		console.log("Sending populating batch");
		console.log("Batch gas estimation");
		var napoleonXWhitelistPopulateData = napoleonXWhitelist.authorizeMany.getData(whitelisted);
		var napoleonXWhitelistPopulateDataEstimate = web3.eth.estimateGas({from : account, to : napoleonXWhitelistAddress, data: napoleonXWhitelistPopulateData});
		//console.log(napoleonXWhitelistPopulateData);
		var napoleonXWhitelistPopulateDataEstimate = Math.min(web3.eth.getBlock("latest").gasLimit,napoleonXWhitelistPopulateDataEstimate+10000);
		console.log(napoleonXWhitelistPopulateDataEstimate);

		var populateWhiteList_transaction = napoleonXWhitelist.authorizeMany.sendTransaction(whitelisted, {
				from: account,
				gas: napoleonXWhitelistPopulateDataEstimate
		});
		console.log("@bcTransaction@"+populateWhiteList_transaction);
		var MyPopulateWhiteListReceipt = web3.eth.getTransactionReceiptMined(populateWhiteList_transaction);


		tokenAmount = [];
		whitelisted = [];
		counter = 0;
	}
}
console.log("Handling@Whitelisted@"+whitelisted.length);
console.log("Sending populating batch");
console.log("Batch gas estimation");
var napoleonXWhitelistPopulateData = napoleonXWhitelist.authorizeMany.getData(whitelisted);
var napoleonXWhitelistPopulateDataEstimate = web3.eth.estimateGas({from : account, to : napoleonXWhitelistAddress, data: napoleonXWhitelistPopulateData});
//console.log(napoleonXWhitelistPopulateData);
var napoleonXWhitelistPopulateDataEstimate = Math.min(web3.eth.getBlock("latest").gasLimit,napoleonXWhitelistPopulateDataEstimate+10000);
console.log(napoleonXWhitelistPopulateDataEstimate);

var populateWhiteList_transaction = napoleonXWhitelist.authorizeMany.sendTransaction(whitelisted, {
    from: account,
    gas: napoleonXWhitelistPopulateDataEstimate
});
console.log("@bcTransaction@"+populateWhiteList_transaction);
var MyPopulateWhiteListReceipt = web3.eth.getTransactionReceiptMined(populateWhiteList_transaction);

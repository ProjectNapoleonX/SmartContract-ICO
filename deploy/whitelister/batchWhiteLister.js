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

var napoleonxGatewayAbi =
[
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "owners",
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
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "addOwner",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "whitelist",
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
      "inputs": [],
      "name": "vault",
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
      "inputs": [
        {
          "name": "_whitelist",
          "type": "address"
        },
        {
          "name": "_vault",
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
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "NewContribution",
      "type": "event"
    }
  ];

var napoleonXGatewayAddress ="0x09555d2ffc533fbec4e086c1f791b75296aa0973";

web3.personal.unlockAccount(account, unlockingPassword,"0x3e8");


var napoleonXGatewayContract = web3.eth.contract(napoleonxGatewayAbi);
var napoleonXGateway = napoleonXGatewayContract.at(napoleonXGatewayAddress);


// Synchronous read
var data = fs.readFileSync('./data/final_reconciliation.csv').toString().split('\n');


// Looping and batch sending
var whitelisted = [];
var tokenAmount = [];
var batchSize = 5;
var counter = 0;
var napoleonXtokenPopulateDataEstimate;

for (var i = 0; i < data.length; i++) {
    var fields = data[i].split(',');
	var myAmount = parseInt(fields[1]);
	var myAddress = fields[0];
	tokenAmount.push(myAmount);
	whitelisted.push(myAddress);
	console.log(myAddress);
	console.log(myAmount);
	counter = counter + 1;
	if (counter  == batchSize){
		console.log("Handling@Whitelisted@"+whitelisted.length+"@tokenAmount@"+whitelisted.length);
		console.log("Sending populating batch");
		console.log("Batch gas estimation");
		var napoleonXtokenPopulateData=napoleonXToken.populateWhitelisted.getData(whitelisted,tokenAmount);
		var napoleonXtokenPopulateDataEstimate = web3.eth.estimateGas({from : account, to : napoleonXTokenAddress, data: napoleonXtokenPopulateData});
		console.log(napoleonXtokenPopulateDataEstimate);
		var napoleonXtokenPopulateDataEstimate = Math.min(web3.eth.getBlock("latest").gasLimit,napoleonXtokenPopulateDataEstimate+10000);
		console.log(napoleonXtokenPopulateDataEstimate);

		var populateWhiteList_transaction = napoleonXToken.populateWhitelisted.sendTransaction(whitelisted,tokenAmount, {
				from: account,
				gas: napoleonXtokenPopulateDataEstimate
		});
		console.log("@bcTransaction@"+populateWhiteList_transaction);
		var MyPopulateWhiteListReceipt = web3.eth.getTransactionReceiptMined(populateWhiteList_transaction);


		tokenAmount = [];
		whitelisted = [];
		counter = 0;
	}
}

console.log("Handling@Whitelisted@"+whitelisted.length+"@tokenAmount@"+whitelisted.length);
console.log("Sending populating batch");
var napoleonXtokenPopulateData=napoleonXToken.populateWhitelisted.getData(whitelisted,tokenAmount);
var napoleonXtokenPopulateDataEstimate = web3.eth.estimateGas({from : account, to : napoleonXTokenAddress, data: napoleonXtokenPopulateData});
console.log(napoleonXtokenPopulateDataEstimate);
var napoleonXtokenPopulateDataEstimate = Math.min(web3.eth.getBlock("latest").gasLimit,napoleonXtokenPopulateDataEstimate+10000);
console.log(napoleonXtokenPopulateDataEstimate);

var populateWhiteList_transaction = napoleonXToken.populateWhitelisted.sendTransaction(whitelisted,tokenAmount, {
	from: account,
	gas: napoleonXtokenPopulateDataEstimate
});
console.log("@bcTransaction@"+populateWhiteList_transaction);
var MyPopulateWhiteListReceipt = web3.eth.getTransactionReceiptMined(populateWhiteList_transaction);

tokenAmount = [];
whitelisted = [];
counter = 0;

console.log(napoleonXToken.balanceOf(account));

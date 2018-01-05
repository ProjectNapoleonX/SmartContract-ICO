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

var napoleonxTokenByteCode ="0x"+ "60606040526002600360006101000a81548160ff021916908360ff1602179055506305a995c0600455341561003357600080fd5b60405160208061119c8339810160405280805190602001909190505033600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600681905550506110f5806100a76000396000f3006060604052600436106100d0576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100d5578063095ea7b31461016357806318160ddd146101bd57806323b872dd146101e65780632ff2e9dc1461025f578063313ce567146102885780633197cbb6146102b757806341ecfa1c146102e057806370a082311461037a57806393c32e06146103c757806395d89b4114610400578063a9059cbb1461048e578063dd62ed3e146104e8578063e2646a9f14610554575b600080fd5b34156100e057600080fd5b6100e86105e2565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561012857808201518184015260208101905061010d565b50505050905090810190601f1680156101555780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561016e57600080fd5b6101a3600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061061b565b604051808215151515815260200191505060405180910390f35b34156101c857600080fd5b6101d061070d565b6040518082815260200191505060405180910390f35b34156101f157600080fd5b610245600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610713565b604051808215151515815260200191505060405180910390f35b341561026a57600080fd5b610272610a09565b6040518082815260200191505060405180910390f35b341561029357600080fd5b61029b610a0f565b604051808260ff1660ff16815260200191505060405180910390f35b34156102c257600080fd5b6102ca610a22565b6040518082815260200191505060405180910390f35b34156102eb57600080fd5b61037860048080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509190803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091905050610a28565b005b341561038557600080fd5b6103b1600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610c59565b6040518082815260200191505060405180910390f35b34156103d257600080fd5b6103fe600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610ca1565b005b341561040b57600080fd5b610413610d41565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610453578082015181840152602081019050610438565b50505050905090810190601f1680156104805780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561049957600080fd5b6104ce600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610d7a565b604051808215151515815260200191505060405180910390f35b34156104f357600080fd5b61053e600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610f5d565b6040518082815260200191505060405180910390f35b341561055f57600080fd5b610567610fe4565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156105a757808201518184015260208101905061058c565b50505050905090810190601f1680156105d45780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6040805190810160405280600f81526020017f4e61706f6c656f6e5820546f6b656e000000000000000000000000000000000081525081565b600081600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60025481565b6000816000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101580156107df575081600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410155b801561086857506000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205401115b156109fd57816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050610a02565b600090505b9392505050565b60045481565b600360009054906101000a900460ff1681565b60065481565b600080600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a8757600080fd5b8383610a9382826110a6565b1515610a9e57600080fd5b6006548042101515610aaf57600080fd5b600094505b8651851015610c50576000808887815181101515610ace57fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205493508585815181101515610b2357fe5b906020019060200201516000808988815181101515610b3e57fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508585815181101515610b9457fe5b906020019060200201518460025403016002819055507f355d073376c545ace08b6df926659a4228940d3214a213a7f300f2ad3ca10ce28786815181101515610bd957fe5b906020019060200201518787815181101515610bf157fe5b90602001906020020151604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a18480600101955050610ab4565b50505050505050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610cfd57600080fd5b80600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6040805190810160405280600381526020017f4e5058000000000000000000000000000000000000000000000000000000000081525081565b6000816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410158015610e4757506000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205401115b15610f5257816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050610f57565b600090505b92915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b610fec6110b5565b60065442101561105a57606060405190810160405280602381526020017f50726573616c6520656e6465642c207374616e646172642049434f2072756e6e81526020017f696e67000000000000000000000000000000000000000000000000000000000081525090506110a3565b600654421015156110a2576040805190810160405280600c81526020017f49434f2066696e6973686564000000000000000000000000000000000000000081525090506110a3565b5b90565b60008151835114905092915050565b6020604051908101604052806000815250905600a165627a7a723058202f4021e8aa43051a57861f29e4e4962d802c99a6d93d17651ff3486656ce13030029";10

var napoleonxTokenAbi = [
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
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
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
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
				"name": "_from",
				"type": "address"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "INITIAL_SUPPLY",
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
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "endTime",
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
				"name": "whitelisted",
				"type": "address[]"
			},
			{
				"name": "tokenAmount",
				"type": "uint256[]"
			}
		],
		"name": "populateWhitelisted",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "balance",
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
				"name": "newAdministrator",
				"type": "address"
			}
		],
		"name": "changeFounder",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
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
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			},
			{
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "remaining",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getICOStage",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "setEndTime",
				"type": "uint256"
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
				"name": "investor",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "tokenAmount",
				"type": "uint256"
			}
		],
		"name": "TokenAllocated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	}
];

// Date.now().getTime() to test
// be careful months start at 0
// var d = new Date(2017,08,29);
var d = new Date(2018,03,15);
var setStartTime = d.getTime();

var napoleonxTokenGasEstimate = web3.eth.estimateGas({
    data: napoleonxTokenByteCode
});

console.log(napoleonxTokenGasEstimate);
web3.personal.unlockAccount(account,unlockingPassword);
console.log(account);

var napoleonxTokenContract = web3.eth.contract(napoleonxTokenAbi);
var napoleonxTokenContractInstance = napoleonxTokenContract.new(
   setStartTime,
   {
     from : account,
     data : napoleonxTokenByteCode,
     gas :  napoleonxTokenGasEstimate+100000
   }, function (err, myContract){
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





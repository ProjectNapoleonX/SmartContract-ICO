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

var napxTokenAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];
var napxTokenByteCode = '0x6060604052341561000f57600080fd5b5b610b428061001f6000396000f30060606040523615610097576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde031461009c578063095ea7b31461012b57806318160ddd1461018557806323b872dd146101ae578063313ce5671461022757806370a082311461025057806395d89b411461029d578063a9059cbb1461032c578063dd62ed3e14610386575b600080fd5b34156100a757600080fd5b6100af6103f2565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100f05780820151818401525b6020810190506100d4565b50505050905090810190601f16801561011d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561013657600080fd5b61016b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061042b565b604051808215151515815260200191505060405180910390f35b341561019057600080fd5b61019861051e565b6040518082815260200191505060405180910390f35b34156101b957600080fd5b61020d600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610524565b604051808215151515815260200191505060405180910390f35b341561023257600080fd5b61023a61081f565b6040518082815260200191505060405180910390f35b341561025b57600080fd5b610287600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610824565b6040518082815260200191505060405180910390f35b34156102a857600080fd5b6102b061086d565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102f15780820151818401525b6020810190506102d5565b50505050905090810190601f16801561031e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561033757600080fd5b61036c600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506108a6565b604051808215151515815260200191505060405180910390f35b341561039157600080fd5b6103dc600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610a8e565b6040518082815260200191505060405180910390f35b6040805190810160405280600f81526020017f4e61706f6c656f6e5820546f6b656e000000000000000000000000000000000081525081565b600081600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a3600190505b92915050565b60025481565b6000816000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101580156105f0575081600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410155b801561067957506000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205401115b1561080e57816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050610818565b60009050610818565b5b9392505050565b600281565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b919050565b6040805190810160405280600381526020017f4e5058000000000000000000000000000000000000000000000000000000000081525081565b6000816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015801561097357506000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205401115b15610a7e57816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050610a88565b60009050610a88565b5b92915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b929150505600a165627a7a7230582000e5ab8ff13a8b8a43a3929230d88b1ca664c48c49a8807d93e09eeeffe30bc30029';

let napxTokenGasEstimate = web3.eth.estimateGas({
    data: napxTokenByteCode
});
console.log(napxTokenGasEstimate);
web3.personal.unlockAccount(account,unlockingPassword, 1000);
console.log(account);

var napxTokenContract = web3.eth.contract(napxTokenAbi);
var napxTokenContractInstance = napxTokenContract.new(
   {
     from: account,
      data : napxTokenByteCode,
      gas: napxTokenGasEstimate
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




web3.eth.getTransactionReceiptMined = require("./getTransactionReceiptMined.js");
var MyReceipt = web3.eth.getTransactionReceiptMined(napxTokenContractInstance.transactionHash);

// Transaction has entered to geth memory pool
console.log("Your contract is being deployed in transaction at http://ropsten.etherscan.io/tx/" + napxTokenContractInstance.transactionHash);

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
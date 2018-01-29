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

var account = web3.eth.accounts[1];

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

//var transferEvent = napoleonxEscrow.PendingContributionAccepted({}, {fromBlock: 0, toBlock: 'latest'})
//transferEvent.get((error, logs) => {
//  // we have the logs, now print them
//  logs.forEach(log => console.log(log.args["contributor"]+","+log.args["value"] ))
//});

var transferEvent = napoleonxEscrow.PendingContributionReceived({}, {fromBlock: 0, toBlock: 'latest'})
transferEvent.get((error, logs) => {
  // we have the logs, now print them
  logs.forEach(log => console.log(log.args["contributor"]+","+log.args["value"] ))
});

//var transferEvent = napoleonxEscrow.PendingContributionReceived({}, {fromBlock: 0, toBlock: 'latest'})
//transferEvent.get((error, logs) => {
//  // we have the logs, now print them
//  logs.forEach(log => console.log(log.args["contributor"]+","+log.args["timestamp"] ))
//});

var toRetry =
[
"0xd551234ae421e3bcba99a0da6d736074f22192ff",
"0xd551234ae421e3bcba99a0da6d736074f22192ff",
"0xd551234ae421e3bcba99a0da6d736074f22192ff",
"0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be",
"0x80374433c317946fa989a424dab3b51742cce6df",
"0xf1abd19fae90a6c4184ec6870049d84c9b8e0db5",
"0x94277e9b31cfbec13dfccfec48728b8762982b3b",
"0x5a38802db1f6e45ed507dde8c1374d9dbb3e369c",
"0x75e7f640bf6968b6f32c47a3cd82c3c2c9dcae68",
"0xf77bb872003586d2d8e8b3acaaee44e376b906f7",
"0x71c944e9928c5e6c83cf87b32faf3699caa2727a",
"0x2bb570b3435d5ef436c7e442a1df5fe2e743b7f3",
"0xc74300f105a01d9586e8362f501659f42eb6e72d",
"0xc58bb74606b73c5043b75d7aa25ebe1d5d4e7c72",
"0xf57ef89d70068b5f9cceb3fe34b0bf869699633d",
"0xf3f4048895e1678ce77c19a5434f6564a70296d9",
"0x533d4c7417406af0d6836de7131cf4549f7dd2da",
"0xde1a013765b6a784049d98f1e9654f6969a533a1",
"0x1df518639833c67da3392d9580061582fdfd52a8",
"0x46b28e67ebe7a1500fbacad64c6e12364590951d",
"0xc9587741ad7e381e56d52e54bffa5c14b06a0da5",
"0x5ba30694bb2d6a54797aed04bc650ead585b6fe9",
"0xf53a157db0bc14a41d8c9cba72033c5b0c09ded8",
"0xf53a157db0bc14a41d8c9cba72033c5b0c09ded8",
"0x41a18bd369693c0e7b15dc13056f47d98fc37004",
"0x5255f5e0512346a92c02faaae768ea23c86c591c",
"0x5255f5e0512346a92c02faaae768ea23c86c591c",
"0x1d45a1fced233818f12a4bee85b0327fc97d1f26",
"0x08b6ec5312281b6c51a444da8e0a3181dfeef429",
"0x67ac61ed2968da37ac97f4e6a07207119742c9f7",
"0x0c9c53b6bb4b37b9fcf828a7109e750116f65e54",
"0xf69871b97844b7e963bd5aa6bd2f8bcdf81432d2",
"0xba780e12dbcb39bcf66906e4ec90ac9b64df4f2f",
"0x2480ba06fd664d7f9064a5615a1b5866c683cb23",
"0xbdc53627073f6592f30a640e85b436adb84810d1",
"0x03cd1d60cb7d7f5bab8cfca777a71389429bba77",
"0xca8439190c9cb6895d652c0b56227bd33972f0d3",
"0xdf733401d7d1ea8413c46a2be60b1ff4a6850442",
"0xe725115f4c6b651bfc9f4d71e211e596cd51470a",
"0x0e54fd464ce7076dffb430de7397546b658e76c8",
"0x5661f235427f1bf5bddbc157a41f673c61d01355",
"0xe365652f4f85cf54807146e2f6222e21c081feaf",
"0x25f90a57e37ed788a568276c35526c0b851d98ae",
"0x014e8cc32d8cef1770db33f8c80ee5251705d367",
"0x47a5c36b8f0a4f59b74a0dd9ddb88ba15f88220f",
"0xf1ca2c00e4b79d4827a875c05a3861f5f26a92d2",
"0x3c29164b43c01584e69e18839024780c2c52994d",
"0x6924d9fe43794370a5864eb05c2814338d4a32bf",
"0x6faedad88a11f84cbac2a7664d4226752a75b31b",
"0xf3a8040deecbdc86e7532dd1d8ab2586cc613cac",
"0x3169c268446213b9d65baea2f9500ffd00bf486c",
"0x2c666e0f0171b06189370bac411a53e474a9f47d",
"0x28927bb3b37f1888afc080a5630d29158e476be6",
"0xceb4b1b5b6ca97811bc34f99ae0a46db8ae7df1a",
"0x63abd49cb6e555fc9a6c2ab9c1aac4479c5a2978",
"0xf615989a6854c510cdbd64218085a300ced3fdca",
"0x001bd1b2279355a06fce7b5b56fb8211fba8d38e",
"0x77da25756df7b79338411b4ea54788af8e657bce",
"0x60fae3cbfba1977b479f0ae2acf3eeced57d5205",
"0x5e107d4e85d426a2b564198e4364003a7c6b602f",
"0x8a55b70c83460168d60f553d7a42ff49427ef00f",
"0x2b12e2e0663ba09d8caece3756dfc60bf5072da8",
"0xd0731b836f1e204046049026cf9237e3e687581a",
"0xfecdf7885faee1d0aa1b688b4fe540b4ebbdaf29",
"0xbe556a69ea65929ffa4fcc4af7f0e758c6cebec5",
"0xd9aa861f48260571721032536802255412d7048c",
"0x0b059fccf025d497ecb2a9414f6b615187bce35b",
"0x621fd466a6cd414a597d629067ab3654ff62e7f3",
"0x9527f1ec46f1808e7ed3b09f560d306bd9173d27",
"0x390de26d772d2e2005c6d1d24afc902bae37a4bb",
"0x390de26d772d2e2005c6d1d24afc902bae37a4bb",
"0xc41bdb31e35d2752259b3284dc21f144af14d162",
"0x2dc09b5d37b3c594c7fa2aceb0f356c414c52462",
"0xbb82fdab09ba42d14e32d3e688e8b1ff08e38be3",
"0x695a96a4d337f8ff805bf696f4fc4de0a60a1eec",
"0x9f356154a0656e09aa6ff6a80363f92508b57496",
"0xc28b1d6441bf0476ff8ff03ca19931fe22a3b407",
"0x8e8e498b3e44e4435e351a4e37cdc22435267886",
"0x50e1d29f3507590efc862be12dfe3c3cd4bf339f",
"0xf532a52089ef9657130283c21150c420f118ed39"
];

for (var i = 1; i < toRetry.length; i++) {
  var fields = toRetry[i].split(',');
	var myAddress = fields[0];
  console.log("Retrying");
  console.log(myAddress);
  //var napoleonXEscrowPopulateData = napoleonxEscrow.retry.getData(myAddress);
  //var napoleonXEscrowPopulateDataEstimate = web3.eth.estimateGas({from : account, to : napoleonXEscrowAddress, data: napoleonXEscrowPopulateData});
  //console.log(napoleonXWhitelistPopulateData);
  //var napoleonXEscrowPopulateDataEstimate = Math.min(web3.eth.getBlock("latest").gasLimit,napoleonXEscrowPopulateDataEstimate);
  //console.log(napoleonXEscrowPopulateDataEstimate);

  var unstuckEscrow_transaction = napoleonxEscrow.retry.sendTransaction(myAddress, {
      from: account,
      gas: 140245,
      //gas: napoleonXEscrowPopulateDataEstimate,
      gasPrice: 90000000000
  });
  console.log("@bcTransaction@"+unstuckEscrow_transaction);
  var MyPopulateWhiteListReceipt = web3.eth.getTransactionReceiptMined(unstuckEscrow_transaction);
}

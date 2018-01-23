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


//var transferEvent = napoleonxEscrow.PendingContributionReceived({}, {fromBlock: 0, toBlock: 'latest'})
//transferEvent.get((error, logs) => {
//  // we have the logs, now print them
//  logs.forEach(log => console.log(log.args["contributor"]+","+log.args["value"] ))
//});

//var transferEvent = napoleonxEscrow.PendingContributionReceived({}, {fromBlock: 0, toBlock: 'latest'})
//transferEvent.get((error, logs) => {
//  // we have the logs, now print them
//  logs.forEach(log => console.log(log.args["contributor"]+","+log.args["timestamp"] ))
//});


val toRetry = [
"0x9527f1ec46f1808e7ed3b09f560d306bd9173d27",
"0x5afb4c0cc5b8ff0b5f7e66704920e26880958eb5",
"0xd21e204b19d559ca12e440a79c99eef5d9fe19cb",
"0xd551234ae421e3bcba99a0da6d736074f22192ff",
"0x6975f29752e977164e3718de9016206e96840c5b",
"0xac2aa6eb3281c3642f02f133ea1b98659dea583c",
"0xe0bfcc47f05123d13d9896536ac03f3ee1d39c48",
"0xc821f56946530c7dc42c63849e68acfef77e2e43",
"0x2950f3dbf4575153bd8e050e9653199d3e8338ca",
"0x935a7924cf92c0b27ab4c6d786b5a56cd91818c8",
"0xe5cc1a4ecc73671705bcbd099e4705da4bae1654",
"0xdf72d5703dacc0e0d336ca5db8e40d06ecf26266",
"0x22ba0ed775955e88387fa5f28f07878d5a641f03",
"0x892c730de0048ec232b7ed9824ef72e956f9bda3",
"0x0d88fd251d00427194de77626ec153c341e78e31",
"0x790fe0d526f8b78e658dffd226cf7f6162fbf484",
"0xf172bc64a9ef94321898fade23d07b3b6fd54355",
"0xb7cd20062385811235306087b7fa6cb0708fb027",
"0xdbc7e85a550e56a90a40d157b780f1b78e90a558",
"0xce28b572d7a717c6dc8b070f25eb8b440c999332",
"0x2a52dffbbf2af5f3a5c42c471472cb5b06aa7948",
"0xb56e3589bbc9492f8169653b44a70a32c6072e2a",
"0xed4be17987aa9a5bf9b3e5d557843b24e4c3e191",
"0x6975f29752e977164e3718de9016206e96840c5b",
"0x043c58a9d4130a82804410d88fad7e65da2d6c1e",
"0x5a2a0f2e32e492f5b4aeef0b8195a2275065e80f",
"0x6559bc27401361e82705677eb62c73e4fd93384a",
"0x1c0b1effc9139cd5c72ebe375590112990c1ed14",
"0x75645e09c6a72328730a8b99dc8e393e1b86c66d",
"0x5de52c64064aff23700828a2930bc53833c15f93",
"0xb15b7696648a69759e28bb01fad4d7aba295f63d",
"0x5baeac0a0417a05733884852aa068b706967e790",
"0x266f4469dae2004f9cd7b2a6379fe50b2dbc94d6",
"0x7e90cc1bf46b0a77b46588064375644af85af4f4",
"0xe9a58a88ed1a23da51087e8f39b7931f56cd20d9",
"0x6325cac56074b546ed155a524c4ca27935029e48",
"0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0",
"0x3d04c59b5f644befec941ad2787559ee4310a09f",
"0x621fd466a6cd414a597d629067ab3654ff62e7f3",
"0x1d2b0ca6891cb24e20df2d21bdcdd7e56ec5a07a",
"0x206f8579ec1d0e5387269f364f10d0bc47911b66",
"0xf2244c4d24da7afa55d92f17a92b9e72ede441b6",
"0xf9076822654473e8d8382a73a5fe18c4113349da",
"0x89e188733bffbbff2dd2034ab626a4612c5b0340",
"0xbef605ad1f8440b940a0ce4e783cc4ad346c4b89",
"0xb559780208b9c45bfc15b99544fc372c0d8ac04b",
"0x5c41fc87e4cf4c7d6d22c8f5f5d7acd414306865",
"0x5878120fe6991cd7cb320a97aa42a94373868868",
"0xe2829e1a4814ee7480f6828b6d0dbcbb98b0c99a",
"0xd2b52e8eb0a284e361f767f0021f5086d3ad73e8",
"0x697a1267294860b98d2deada22b215170e199652",
"0xd8e0792974dea900d27bf66c4dbbfd567ba814c0",
"0x4ba0d178a9c1e763ac767d57dda97009a8b0f7a4",
"0x15aae31a5c52e7311a3b158e6a729490996dfa13",
"0x8baefac255c1a08ffcf781df55a071e371dd91d7",
"0x5bdef78d93d91003e36a3b6b57b2e12e4d9d9ff3",
"0x8c5b780e363a3b9ac5f8cf2fcb49c9d71220529a",
"0x0ea7b6e16aa3c3d48830e5003a5c39a6f252b6e5",
"0x854532ed9649c76c8d9136434fdcdc2ff3548865",
"0x6f598447177a0114ea91a7caf11275a7355a1321",
"0xd0700ed9f4d178adf25b45f7fa8a4ec7c230b098",
"0xb091b29edff483896f5165b6c892aa1faf5cdc16",
"0xb59c61efaf868e94f8739046558a0873de7f0d35",
"0xb1020da567311318a98e2bca2a285b9d0a033b21",
"0x9d94d4ab956f918929bd16aed38d205118021e36",
"0xfd8325687fb5fc38676fb4d95cbc9453e324a20d",
"0x24cb18e8f84e44436c79b97263019195d3f49480",
"0xf5cf1278bc77ce270b3fa572e97e94679c10a874",
"0x1a1d70bd506242aa1df27a96e33b669f32ebb4c9",
"0x7147c0c76ee3a62926f2d897e688f5efc628a932",
"0x6b743f650a6b2bb70f34d8c706424f62482c07a1",
"0x4362b64d4365ae805bf06c39813d13cbf40bd6d8",
"0x904e0e5252628845b6c21a6ee62abd002fce11c4",
"0x41ebaec1a72e247bc09bdedfb08e7dc3778b013e",
"0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be",
"0x91b9664102f7d1f27cf4cbc24fcab7dc10198605",
"0x1be5247534afa56028d1d3925459ce08d59ec83f",
"0x77fa5a3b6a1875b8c636b74c0f8cd216d296bb75",
"0x49ffcd0dc3fd51c1e38cbbaf4b94c4ae0e8fe3c3",
"0xc8228906eb6d381da113846fe33f134831134502",
"0x399f0e84f91f36d5f047427a45a9742afe78cd53",
"0x29a9808ae270cac60e8b87298655e7bf433b8fa2",
"0x05917172865398805600eb075a4a80aa5a1ceddd",
"0x511c42f2b623dbed1b3e4f8f681ce7171e187381",
"0x9fcd5087b1c1e9c079a31e29cbdefa96ec8c8c48",
"0x0a15cb0f1aede61936ae2f186e053dd8356c6f54",
"0x46c4e86b76869e3ca3ca720bebce818f3ad411fa",
"0xc18e4bb7705f41e1cc304124a88000f0d062de49",
"0x71deaae5b8ef651f930bdf7683c8893047721bb5",
"0x0b059fccf025d497ecb2a9414f6b615187bce35b",
"0x299e7cd44b2c60d75ed11ed117c2d5b733911c35",
"0x573f025aecb00942ae347412b715941a95c574d7",
"0x252ffb915d49436c81d5e975fe458cd9211d917d",
"0xb07595f57c176ad9c2ad305cdcc1acfa86fb0dac",
"0x8c9e15edc50e24e68790160023082e35b883d375",
"0x7c8c8f5d25cd151bca28674eff4a7251e3c51e5b",
"0xe8ffd24c590cd9e9c6de234eece6b283921afb64",
"0xcccdf3c85d5366a6fec611a134f979b0cc049e2c",
"0x6366122ac29a38d9e2de463125e92266fd2e8a15",
"0xfd8325687fb5fc38676fb4d95cbc9453e324a20d",
"0xc6c368d16fe0c5d2040dea01d62687c14d584262",
"0xf9816073c7f9c21a0b1fe2c79852f6be52a07d63",
"0x677430fca3a3ebdf7b48194b034ee101f327b91f",
"0xd89917eb742e3dd480b1b3a1d20a4663eb8bbda3",
"0x33b0daf7ff9a259b27eeec1234213d83bf3b9205",
"0x872f6a5242a3e3aa2364c47455942d94f84832e5",
"0x4a6afe0872b1d504e4c2bd67dcdd0467ac20975d",
"0x90176ef3982d2a331f2a41d53c4f82359916db67",
"0xb3d797c71214f19416f2168a9b3c55e3de89e3ad",
"0xd9aa861f48260571721032536802255412d7048c",
"0x68d7c39e2cde6564d0aeae410d723b1d5147f4a8",
"0x517dae643dd50841c78f2748a55c2958dac18a64",
"0x1a046c3fe7a318b1381ae2a2bd02ec7bd1fc0e0c",
"0x3335764732c129a9866621b7424ddd55cd8419f1",
"0xe80e33d1a8714c5af604fac883b27e01c89e3b69",
"0x5ee0997bd2f643c16bbd54fc56e06db35235c955",
"0x28e807dde64915475e8268ab4f6d8c2922b49620",
"0x0c35bdcb4515348f227a778c64c47cb9d2236bde",
"0xbe556a69ea65929ffa4fcc4af7f0e758c6cebec5",
"0xae89f6ce0d0b81d12d7d15aa9f6a527bde9c0b2b",
"0xabe33410fdb792996bc217831bf6abdefc512b5b",
"0x0f8f89792361f36c9cb5d35d586bd3493575778d",
"0x6e6b3fab706cd54db7c5e64a4f3259318e8a34f1",
"0x6d5bd5d16369e39aff4ebc369897a8871adaafa9",
"0x1517fa9de5e79203697cd32fdf1abbd9e5332a2f",
"0xdfaba48bbd31969f28d2e3ea6e96dd323e27fd11",
"0x661cd7e7ca3ea14e35b40fd25455b42a54ac57e6",
"0xbfe6d8f87fcd8db80cac36a6b2c3b1840d6058ed",
"0x0efec106cd69fc2d73451fffe58298eaccfddd49",
"0xe07860067b1887eb511f114ab30af0f8e9bc6d81",
"0x680d751c5f018a13689ee6f7087c2047f6a48d0d",
"0xb248cf41abcd5d938b944ed65b4363f49242ef9d",
"0x6d4a30013189755d1aeab03ad4ec238f5e8d637e",
"0x564286362092d8e7936f0549571a803b203aaced",
"0x40f486512ed8d4e2b68d825be1ad47c30f6293fc",
"0x9d9c1862f59a540b85caff7a3e44afdd9571b20a",
"0xde98288b324e36cb78c97bfc1ff0090fc02bc678",
"0x9f081cfe860328457f29615c8a0a341fa6d05fdc",
"0xfecdf7885faee1d0aa1b688b4fe540b4ebbdaf29",
"0x7394d9f9ad0067a470d4fbe193e7c3583b8d3574",
"0xd5b75c2637bcce66c1f47ba3e394e00df26936c2",
"0x9b585ef48334855b1f30727462f05b7a1491c4fe",
"0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98",
"0x87f8c608102a24039d0d1ca0eff9fc2aa7b5a1d7",
"0xa0209e7936887780b5f908215485c2e79e84b1bb",
"0xe5bf585ba3a279095c2fafa545a4593763e07e68",
"0x6d5050fb50730df7afab022ed31e5c8275a21f1f",
"0x76dd75aa51a8ce2883df44f6d6626789b6bc8ebf",
"0x6723d1cc757c61a7f5ca263091700d5c5deb2ba7",
"0x84d0de8c80dd9343f89809253c91809906a2eac6",
"0x926a8403688f43653880a8d0bc56b98c1884801b",
"0xbc559e287bda93220064d507797e3e26b8153f90",
"0xfdc49369e7370b2791ed1b1ae355cb918dfb1b6b",
"0x5e06fbded7674651627b8099a49a4f6d4b22aa99",
"0xcff5a8c3be07f38f6ebf5fcd5de3ae27fec84d17",
"0xa82fcefd303fa68864b787a5f118b09ce5a4c93d",
"0x978816f2766013975db36736f19e267d16d1c1dd",
"0x8dd3f25effd98b797c178dc302d7d9f21a4af215",
"0x93dca582ae1f192bb2b950b3a5c3e23f0a81bf4b",
"0xadae2ad772180ab033b0861b7f64d344c21be717",
"0xfa93f96eb0ca131edcdb44a3fd1d4c5965cb13c3",
"0xf20ef5a58e82a7ca9740bf5d361fcc83d3071339",
"0x3409dc059a9256a27a29c837795e6477ac0ad085",
"0xe452780600eb11911982a72c6b37b49286598675",
"0xd1f37186822fd01fed26e7f3c58765f45afdd504",
"0x6c994f5866a86633652ea824b7288f91dbbf3c76",
"0x96f57b3b2aee2f15198cc2862d17eb32591c0208",
"0x301896277392376e7ac49e05328b19b8f74d0c04",
"0xd0731b836f1e204046049026cf9237e3e687581a",
"0xce735a5c6feb88dd7d13b5faa7c27894eb4e5ae0",
"0x7db24f512324c2b3560bb35769703da58493a174",
"0x63bc545fc4ce531e68996d20330f3c10efda84fa",
"0x9fcd5087b1c1e9c079a31e29cbdefa96ec8c8c48",
"0xc38eec654acf6cc905641210e39c902f5a635242",
"0xa211b48c0c611a82de42cb8dc16941b0ebc3c3f7",
"0xf0c55f3aef37172fadac0ed1472e8e0713db9e83",
"0xb3d797c71214f19416f2168a9b3c55e3de89e3ad",
"0x96f57b3b2aee2f15198cc2862d17eb32591c0208",
"0xfb80c2ffd6657db15aefd77b8ad9338c17960538",
"0x0930a9dd77ba93b355ea349f8c01b22bdc8013a9",
"0x7a4e0e53c07ad55f604ea8945c27e88f358e8f29",
"0x96f57b3b2aee2f15198cc2862d17eb32591c0208",
"0x761eda9b047c59eb8a34ee2aadfb43854d30b5b9",
"0x4b5f3d9c04853b56fb454182e97462631e1dea1a",
"0xad6035dbae7992dad3063ce4cd6fa922afd6d5b4",
"0xd5133f8dd90f39f277ba85ad4b0451ae92d9eeb6",
"0x2c6164e135e513b597723d571bd1341f197ee762",
"0xca407b9cd5cffbd314b4956f0f2a2e8636ef7e0d"
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

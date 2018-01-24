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

var napoleonxEscrowContract = web3.eth.contract(napoleonxEscrowAbi);
var napoleonxEscrow = napoleonxEscrowContract.at(napoleonXEscrowAddress);


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

var napoleonXWhitelistContract = web3.eth.contract(napoleonxWhitelistAbi);
var napoleonXWhitelist = napoleonXWhitelistContract.at(napoleonXWhitelistAddress);

web3.personal.unlockAccount(account, unlockingPassword,"0x3e8");


//var transferEvent = napoleonxEscrow.PendingContributionAccepted({}, {fromBlock: 0, toBlock: 'latest'})
//transferEvent.get((error, logs) => {
//  // we have the logs, now print them
//  logs.forEach(log => console.log(log.args["contributor"]+","+log.args["value"] ))
//});

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

var toRetry =
["0xee291db1ba3da1937d5d99e022d24f29ffb614a8",
"0x88818222b8b0979c68f05ce9c8d446fc270cbab2",
"0x0fd3e2c50ee69fd59e3ad545fc07587adb6fb39e",
"0xf0f7050dfb0f708b4fb5459899d1c5b542201fc5",
"0x289e193c81007ff38c0f425b948ea1c82d7166eb",
"0xb91dc18c7a549a5c2353fd571caadc7adada571b",
"0x4a5fc01af42e69c73fd55087a1f75cb6414be8f9",
"0x941a0fce1bfd0d6708ea36e0b1d66c2247113524",
"0xc5168c3330d556f95fb0f9968b7b52d4489be570",
"0xb9c9213b2988474daf094e2a412cac06132c73d5",
"0x9b5cabb90c1e743bd194dc9e3cc7c6d2029585ee",
"0xf923ee7b486e7de4618974ad3b3465242fcaf5d9",
"0x688fc72f0923c748e6640ff9c4855b30c37d4c51",
"0xc573cc1f2116e6fb4cda8fcbf0e67e5b1d4e89bf",
"0xc71e9987640e5f9663316b351a38f2c60e8b1b03",
"0xaae117f2e6cd7e333837d7c4a500f21ab91f127a",
"0xc20af5cd732c11551fd144ec34acff61277113e0",
"0xb6fa6844930db3e620d037ce682fe18ad8e72502",
"0x9b4f4a54ba90fa3efed6a5e2c1f0b79df26f1231",
"0x6c63c53baf6be97cd282a0c15f3293f6f0dd33c7",
"0xfdc419cccd834e20aedb8a833e47cdfba8cfceb4",
"0x7a6dd925c17f3038f799f9800d6cac62c80e924c",
"0x81e88193c4c4490e92004c7fdb839d88ebbae3ba",
"0x0a34999d84115bf093bd7063d57afbf5263f1502",
"0x19674f73449fb4f189cac5a03d3b75493498dc84",
"0x24c07472e6cdbf0ab3f69be64c4155b7f105f782",
"0x5b70722e773a8c8f22f31d3b2bc23e08a1977494",
"0x2ce9e624464cee0ddb04445a4ee1301683f8c6de",
"0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98",
"0xb0c6ef0209a138ee81ed98db974962b69f5f6d59",
"0x7547fffe4436fc2bcfc8ba66586aae510f026491",
"0x7bfe2ac8d7342b3c63c7732d6026dd3a1a90274e",
"0x3e3d19f95c57b2a6065e0cdbb6b69e3b0f78e847",
"0xf02fc3184978408c80c3711c91be9c5ed9e43227",
"0x95a5194aa6065270104bba18607f20e37a1ab058",
"0xf98dd627ad83ec5fa7a46a68fc53f22d225fb184",
"0x1384a30873d926f94286c7c5fe28277ad19a0351",
"0x564286362092d8e7936f0549571a803b203aaced",
"0x564286362092d8e7936f0549571a803b203aaced",
"0x03f41ce13aa90eec5e358f70be7a760932188d43",
"0x19538452f34cb084d223d2b20d5d7a48e43dbf46",
"0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98",
"0xa0bb4ba19f578a63fa3f67adaf7bbca15ccadc45",
"0x1a7d0d680266c24b12f591735ec6ac308fb55c17",
"0x603591f863a91dc8852fbd0da2bf4e8a41db3c26",
"0x551683141bc28b978ca23e6bcc69dc3402d43c46",
"0x34bebcf9b86d4fb3f29732f62446bbafb44c0f70",
"0x6cb029473ee0546d107ecb76ac0a8507bbef7b7e",
"0xec083c998de71789301a1d1c4c4021d1525f850d",
"0xc17415470b1f4d20fba461bdba4316b3be918b73",
"0x05ca0796800670dca35aa3faf3d202f4c1cfd43b",
"0x4360df73cf36b51000b29106173bf2a73d471b38",
"0x47e8d8302c138920ba60918c9aac395c5893226c",
"0x32ad10e527a7653d1f4289eea2023cd2dfc5b701",
"0x21b52fba03828b32c965d2889286dec81508f75e",
"0xc6c368d16fe0c5d2040dea01d62687c14d584262",
"0x8934f83d63495f99d4c23cdc168e48a712974bf7",
"0x0d2e0f2834c97cdd435286ba1976b2ff4d450f2d",
"0xa95350d70b18fa29f6b5eb8d627ceeeee499340d",
"0x10e471252437ffd710ffffe5a50a29b5bfcdc90a",
"0x2045337d96e898028ca060e1ea9911a2862d50f2",
"0x637587cbf1250d47770bf46c9d31d4e186cbfe24",
"0x648e3940c6de9fa827adff68254c7a4923a0a6a5",
"0xeb14be96d1a6dac8a868620f6299c5f4d3d28582",
"0xa26ffeacf9a3966ff380d6450f88e86c0619e356",
"0xeabe0851e8c12ea8d53c39404a5b1557769a97be",
"0x0fe147852a2d7da8857de3037b6dfac9a741ba54",
"0x5ea82a6ff461df89006cb493d76e839ecd236f15",
"0x5ea82a6ff461df89006cb493d76e839ecd236f15",
"0xaad73f5137f92c28b06f24101754c4599636ca18",
"0xca407b9cd5cffbd314b4956f0f2a2e8636ef7e0d",
"0xe452780600eb11911982a72c6b37b49286598675",
"0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98",
"0x564286362092d8e7936f0549571a803b203aaced",
"0xe07860067b1887eb511f114ab30af0f8e9bc6d81",
"0xabe33410fdb792996bc217831bf6abdefc512b5b",
"0xd89917eb742e3dd480b1b3a1d20a4663eb8bbda3",
"0x77fa5a3b6a1875b8c636b74c0f8cd216d296bb75",
"0x5bdef78d93d91003e36a3b6b57b2e12e4d9d9ff3",
"0x5baeac0a0417a05733884852aa068b706967e790",
"0x6975f29752e977164e3718de9016206e96840c5b",
"0x2950f3dbf4575153bd8e050e9653199d3e8338ca",
"0x6975f29752e977164e3718de9016206e96840c5b",
"0xaae117f2e6cd7e333837d7c4a500f21ab91f127a",
"0xe73f900d74a6e9572bd8077fe1f92a5440119fb1",
"0xdc74b9f187b9c111d4f9bea224eb40ee6b8bb84e",
"0x9a4f15001fab248e9bd5ab7d6d77c9a00073f881",
"0x1522900b6dafac587d499a862861c0869be6e428",
"0xa8cfafcefe4df9a1b326263b6cfd917aeb544df9",
"0xb1958a6d783d5f4566042f1c36a3940f43f24cdf",
"0x81dea2ab41162af8bbdb8c108fe90574ff8cd4d1",
"0x9023ea6570d7d042036db6bdfd56b7155cee6400",
"0x32ad10e527a7653d1f4289eea2023cd2dfc5b701",
"0x8f16e001c20b1c8f4bd8be055ca219390ba6a654",
"0x0681d8db095565fe8a346fa0277bffde9c0edbbf",
"0xf91041a0459b6eb93c97a07ea519671b1d898b1a",
"0x09ee14394b99c51266e0ac60b99838ef051da51c",
"0x7ed1e469fcb3ee19c0366d829e291451be638e59",
"0x3d31dc8f2e563f30da4b33af88a5a1e42d1b1c0a",
"0xdcea50df185a523479cb2421ac8b9ce43466dfb8",
"0xb9d93da154352226e3c4fb60be5456787a3caeb9",
"0x5649bf611b3e84dfcece4c421a9d77cdc804f808",
"0x96f141f80795a63b4c265384f3a7ccbf0c1aa28d",
"0xbe84060137e51ae995f8f6acae76a60d4e1efe28",
"0xb6da110659ef762a381cf2d6f601eb19b5f5d51e",
"0x32ad10e527a7653d1f4289eea2023cd2dfc5b701",
"0x8922712f0d949ab20be10654aa437c725b4a2192",
"0x14e928796568a0c3479de7a0c28fa50addc38b84",
"0x6eb980a3f394816516b962c1e864a0a97adc0176",
"0x4b6e8d9198db5f19d6eab1e8d6665d0211ed9472",
"0xccc0739a3aaf1e770523d362818e120031929e04",
"0x2618f4c64805526a3092d41f25597ccfe4dd8216",
"0x31b8d0b970fb34feb2fde0bbe91b6b4794bba571",
"0xdb33420e90618fa54b9547871c90dc01159d301e",
"0x71539c53376a0814ddbea67b0847056f0e1c6665",
"0xdf8ee10dd50b452b730c0d28cd943be138eeb429",
"0x69136c87295bdf2dc892a1b03d26d84bfa210c72",
"0xfb0a92aebe8da924044ec9fe12aab745a00fb4a5",
"0xfb0a92aebe8da924044ec9fe12aab745a00fb4a5",
"0x0681d8db095565fe8a346fa0277bffde9c0edbbf",
"0xf4ad6ed5f256a681f486255c54252c1ea2b91744",
"0x5e6aa94552ba5a6b4188b70118cc93f88e9faa92",
"0x2c937f1eb79d98e2530be5556e47de13ea2cde72",
"0xb436d1f446de4d3c46e7aef00d4d389d9b4c5fbf",
"0xfe765dec5296857da70126d8ee177dce7104799f",
"0x4082a3eac61bcc973428aad6a158d67f1b4467c9",
"0xf67f2172a408b4f99d2649a5aa0a3207be72147b",
"0x36e7c97a374d0aef93ce82ff4947bb68f844d391",
"0x9d06cf06a03c2ec670a38417dc5042b3b23d9721",
"0xb890791c2f54e123b2f07e576c5992c74397dee4",
"0x8fb6827d9d6ce9e23d40da58d50a9073a3a78b07",
"0xe4ae629d3b590b6fbf65f902b2db16128c359978",
"0xd224c473abb9d9d66909e617a3abe2ab369a6e4d",
"0x35a68c755be5331bd5578902355e33ce47277750",
"0xcdc9a1585ff2254a6da7ebb28fabf9737ed11707",
"0xf930a6eb06423ec4d5131bee8c62c3891db6ff00",
"0xf6ab1e48f39ec9b5cffc18a4f7a4a4ba11f8e9e8",
"0x8f4d34c1d923bac701cf21be62effd09fdaeffbc",
"0xf94d34e4c368225f6efa38329f8c3792608b4fef",
"0x148fdcb5ffb3fb3626511a187dbd94282de19327",
"0xc2ef1dd3157c96af2ccf33081422d3fb399bcb8e",
"0x7589324ea45dea5f78ee0f2a839382e4e8621917",
"0x0d0a1d0aa6d14a9b73436718fc5d27eb5a48bf2d",
"0xb53864f310db3113d4e94f9361e4072fbcec161f",
"0x564286362092d8e7936f0549571a803b203aaced"];

for (var i = 1; i < toRetry.length; i++) {
  var fields = toRetry[i].split(',');
	var myAddress = fields[0];
  if (napoleonXWhitelist.isWhitelisted(myAddress)){
    //console.log("Retrying");
    //console.log(myAddress);
    //var napoleonXEscrowPopulateData = napoleonxEscrow.retry.getData(myAddress);
    //var napoleonXEscrowPopulateDataEstimate = web3.eth.estimateGas({from : account, to : napoleonXEscrowAddress, data: napoleonXEscrowPopulateData});
    //console.log(napoleonXWhitelistPopulateData);
    //var napoleonXEscrowPopulateDataEstimate = Math.min(web3.eth.getBlock("latest").gasLimit,napoleonXEscrowPopulateDataEstimate);
    //console.log(napoleonXEscrowPopulateDataEstimate);
    //var unstuckEscrow_transaction = napoleonxEscrow.retry.sendTransaction(myAddress, {
    //      from: account,
    //      gas: 140245,
    //      //gas: napoleonXEscrowPopulateDataEstimate,
    //      gasPrice: 90000000000
    //});
    //console.log("@bcTransaction@"+unstuckEscrow_transaction);
    //var MyPopulateWhiteListReceipt = web3.eth.getTransactionReceiptMined(unstuckEscrow_transaction);

  } else {
    console.log(myAddress);
  }


}

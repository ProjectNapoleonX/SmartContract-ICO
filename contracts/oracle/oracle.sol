pragma solidity ^0.4.18;

contract depositer {
    address public oracleAddress = 0xe77200Ce04Bd0a79710C403D5Ba91F078f177CF7;
    address public destinationArress = 0x5753930b7D0443DD3769782C169786844Db68D49;
    mapping (address => bool) public kycClearances;

    event kycCleared(
        address indexed _clearedAddress,
        uint clearanceTimestamp
    );

    event kycAddressDeposited(
        address indexed _clearedAddress,
        uint depositValue,
        uint depositTimestamp
    );

    modifier onlyKycCleared {
        require(kycClearances[msg.sender]);
        _;
    }

    function clearKyc(address _clearedAddress) public {
        require(msg.sender == oracleAddress);
        kycCleared(_clearedAddress, block.timestamp);
        kycClearances[_clearedAddress] = true;
    }

    function() onlyKycCleared payable public {
        kycAddressDeposited(msg.sender, msg.value, block.timestamp);
        require(msg.value >= 1 ether);
        require(destinationArress.send(msg.value));
    }
}

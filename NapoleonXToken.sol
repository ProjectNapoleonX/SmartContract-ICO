pragma solidity ^0.4.8;

import "./StandardToken.sol";


/// @title NapoleonX Token Contract
/// @author NapoleonX Team <contact@napoleonx.ai>
contract NapoleonXToken is StandardToken {

    // Constant token specific fields
    string public constant name = "NapoleonX Token";
    string public constant symbol = "NPX";
    uint public constant decimals = 2;
}
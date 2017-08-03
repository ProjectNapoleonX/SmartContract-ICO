pragma solidity ^0.4.11;

import "./SafeMath.sol";

contract Greenlist {
    /* Define greelist moderator of the type address */
    address moderator;
    /* Map of the private sell committers */
    mapping (address => uint256) commitments;
    uint256 public totalSupply;

    /* important : after deploying, set greenlist.napoleonx.eth address to resolve to the deployed contract address */
    function Greenlist() public {
        moderator = msg.sender;
    }

    modifier onlyModerator {
        require(msg.sender == moderator);
        _;
    }

    function() payable {}

    function commitmentOf(address _committer) constant returns (uint256 balance) {
        return commitments[_committer];
    }

    // register a new committer or update an already committed one with a new value
    // can also nullify an already committed with a null value
    // this function can only be handled by the moderator for KYC purpose
    // and to avoid hitting the ICO ether cap by vetting crazy commitments
    function registerCommitment(address committer, uint value) onlyModerator {
        // 0 if not already committed
        uint precedentCommitment = commitments[committer];
        totalSupply = safeAdd(totalSupply,value);
        totalSupply = safeSub(totalSupply,precedentCommitment);
        commitments[committer] = value;
    }


    /* Function to recover the funds on the contract */
    function kill() onlyModerator { selfdestruct(moderator); }

}

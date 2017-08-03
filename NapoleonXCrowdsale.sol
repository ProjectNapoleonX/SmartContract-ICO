pragma solidity ^0.4.0;

import "./SafeMath.sol";
import "./NapoleonXToken.sol";
import "./MultiSigWallet.sol";
import "./ENS.sol";

/// @title Crowdsale Contract
/// @author NapoleonX Team <contact@napoleonx.ai>
/// @notice This follows Condition-Orientated Programming as outlined here:
/// @notice   https://medium.com/@gavofyork/condition-orientated-programming-969f6ba0161a#.saav3bvva
contract NapoleonXCrowdsale is SafeMath {

    /* the number of tokens already sold through this contract*/
    uint public tokensSold = 0;

    /* How many wei of funding we have raised */
    uint public weiRaised = 0;

    /* How much wei we have given back to investors.*/
    uint public weiRefunded = 0;

    // Min total raised ETHER amount for the ICO to be successful
    uint public constant ETHER_MIN_CAP = 25000 ether;

    // Max total raised ETHER amount
    uint public constant ETHER_MAX_CAP = 250000 ether;

    // Max amount in seconds of contribution period
    uint public constant MAX_CONTRIBUTION_DURATION = 4 weeks;

    // Price of a NPX Token (in Ether)
    uint public constant ONE_NPX_TOKEN_PRICE = 5805 * 1 ether / 1000;
    // Nevertheless, for the ICO, a minimal amount of 0.1 NPX is required per subscriber.
    uint public constant MIN_OWNABLE_TOKEN_FRACTION_NUMERATOR = 1;
    uint public constant MIN_OWNABLE_TOKEN_FRACTION_DENOMINATOR = 10;

    /* All deposited ETH will be ultimately forwarded to this multisignature wallet */
    MultiSigWallet public napoleonXMultiSigWallet;
    address napoleonXCrowdSaleModerator;

    /* Contribution start time in seconds */
    uint public startTime;
    /* Contribution end time in seconds */
    uint public endTime;

    NapoleonXToken public napoleonXToken; // Contract of the ERC20 compliant NapoleonX token

    // Fields that can be changed by functions
    bool public halted; // The napoleonX moderator can set this to true to halt the contribution due to an emergency

    /** How much ETH each address has invested to this crowdsale */
    mapping (address => uint256) public investedAmountOf;

    // EVENTS
    event Refund(address investor, uint weiAmount);

    /// Pre: All fields, except { napoleonX, startTime } are valid
    /// Post: All fields, including { napoleonX, startTime } are valid
    function NapoleonXCrowdsale(address crowdSaleModeratorAddress, address napoleonXTokenAddress,  address napoleonXMultiSigAddress, uint setStartTime) {
        // crowdSaleModerator is the address that napoleonx.eth resolves to
        napoleonXCrowdSaleModerator = crowdSaleModeratorAddress;
        startTime = setStartTime;
        endTime = startTime + MAX_CONTRIBUTION_DURATION;
        // cast to NapoleonX Token Contract
        napoleonXToken =  NapoleonXToken(napoleonXTokenAddress);
        napoleonXMultiSigWallet =  MultiSigWallet(napoleonXMultiSigAddress);
    }

    // MODIFIERS

    modifier only_napoleonXModerator {
        require(msg.sender == napoleonXCrowdSaleModerator);
        _;
    }

    modifier is_not_halted {
        require(!halted);
        _;
    }

    modifier ether_cap_not_reached {
        require(safeAdd(weiRaised, msg.value) <= ETHER_MAX_CAP);
        _;
    }

    modifier ether_min_cap_not_reached {
        require(weiRaised < ETHER_MIN_CAP);
        _;
    }

    modifier is_not_earlier_than(uint x) {
        require(now >= x);
        _;
    }

    modifier is_earlier_than(uint x) {
        require(now < x);
        _;
    }

    /**
       * Calculate the amount of token units that can be bought.
       *
       */
    function calculateTokenAmount(uint amountInWei) public constant returns (uint) {
        uint multiplier = 10 ** napoleonXToken.decimals();
        return amountInWei * multiplier / ONE_NPX_TOKEN_PRICE;
    }

    // CONSTANT METHODS

    /// Pre: startTime, endTime specified in constructor,
    /// Post: Discount in percent for early buyers
    function discountInPercent() constant returns (uint) {
        // Should not be called before or after contribution period
        if (now < startTime || now >= endTime)
            assert(false);
        uint discountPercent = 20;
        if (startTime + 24 hours < now || weiRaised > 40000 ether)
            discountPercent = 15;
        if (startTime + 36 hours < now || weiRaised > 60000 ether)
            discountPercent = 10;
        if (startTime + 48 hours < now || weiRaised > 80000 ether)
            discountPercent = 5;
        if (startTime + 72 hours < now || weiRaised > 100000 ether)
            discountPercent = 0;
        return discountPercent;
    }


    // NON-CONSTANT METHODS

    /**
     * Make an investment.
     *
     * Crowdsale must be running for one to invest.
     * We must have not pressed the emergency brake.
     * Ether cap is not reached
     *
     */
    function()
    payable
    is_not_earlier_than(startTime)
    is_earlier_than(endTime)
    is_not_halted
    ether_cap_not_reached
    {
        uint amountSentInWei = msg.value;
        uint tokenAmount = calculateTokenAmount(amountSentInWei);
        assert(tokenAmount > 0);

        // Check that the minimum ownable token amount is reached
        if(investedAmountOf[msg.sender] == 0) {
            assert(tokenAmount >= (10 ** napoleonXToken.decimals() * MIN_OWNABLE_TOKEN_FRACTION_NUMERATOR / MIN_OWNABLE_TOKEN_FRACTION_DENOMINATOR));
        }

        uint tokensExactPrice = tokenAmount * ONE_NPX_TOKEN_PRICE / 10 ** napoleonXToken.decimals();
        uint excessAmount = amountSentInWei - tokensExactPrice;
        uint purchaseAmount = amountSentInWei - excessAmount;
        // Return any excess msg.value
        if (excessAmount > 0) {
            msg.sender.transfer(excessAmount);
        }

        tokenAmount = tokenAmount * discountInPercent() / 100;

        // Transfer the sum of tokens tokenAmount to the msg.sender
        assert(napoleonXToken.transfer(msg.sender, tokenAmount));

        // Update investor
        investedAmountOf[msg.sender] = safeAdd(investedAmountOf[msg.sender], amountSentInWei);

        // Update totals
        weiRaised = safeAdd(weiRaised, amountSentInWei);
        tokensSold = safeAdd(tokensSold, tokenAmount);
    }

    function safeWithdrawal() is_not_earlier_than(endTime) {
        bool fundingGoalReached = weiRaised >= ETHER_MIN_CAP;
        if (!fundingGoalReached) {
            uint amount = investedAmountOf[msg.sender];
            investedAmountOf[msg.sender] = 0;
            if (amount > 0) {
                if (msg.sender.send(amount)) {
                    Refund(msg.sender, amount);
                }
                else {
                    investedAmountOf[msg.sender] = amount;
                }
            }
        }

        if (fundingGoalReached) {
            selfdestruct(napoleonXMultiSigWallet);
        }
    }

    /// Pre: Emergency situation that requires contribution period to stop.
    /// Post: Contributing not possible anymore.
    function halt() only_napoleonXModerator { halted = true; }

    /// Pre: Emergency situation resolved.
    /// Post: Contributing becomes possible again withing the outlined restrictions.
    function unhalt() only_napoleonXModerator { halted = false; }

    /// Pre: Restricted to napoleonX.
    /// Post: New address set. To halt contribution and/or change minter in NapoleonXToken contract.
    function changeNapoleonXAddress(address newAddress) only_napoleonXModerator { napoleonXCrowdSaleModerator = newAddress; }
}

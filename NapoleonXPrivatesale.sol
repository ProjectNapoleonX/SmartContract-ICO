pragma solidity ^0.4.0;

import "./SafeMath.sol";
import "./NapoleonXToken.sol";
import "./MultiSigWallet.sol";


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
    uint public constant MAX_PRIVATE_SALE_CONTRIBUTION_DURATION = 1 week;

    // Price of a NPX Token (in Ether)
    uint public constant ONE_NPX_TOKEN_PRICE = 1 ether;
    // Nevertheless, for the ICO, a minimal amount of 0.1 NPX is required per subscriber.
    uint public constant MIN_OWNABLE_TOKEN_FRACTION_NUMERATOR = 1;
    uint public constant MIN_OWNABLE_TOKEN_FRACTION_DENOMINATOR = 10;

    /* All deposited ETH will be ultimately forwarded to this multisignature wallet */
    address napoleonXMultiSigWallet;
    address napoleonXCrowdsaleContract;
    NapoleonXToken public napoleonXToken; // Contract of the ERC20 compliant NapoleonX token
    Greenlist napoleonXGreenlist;
    /* Contribution start time in seconds */
    uint public startTime;
    /* Contribution end time in seconds */
    uint public endTime;

    // Fields that can be changed by functions
    bool public halted; // The napoleonX moderator can set this to true to halt the contribution due to an emergency

    /** How much ETH each address has invested to this crowdsale */
    mapping (address => uint256) public investedAmountOf;

    // EVENTS
    event Refund(address investor, uint weiAmount);

    /// Pre: All fields, except { napoleonX, startTime } are valid
    /// Post: All fields, including { napoleonX, startTime } are valid
    /* important : after deploying, set crowdsale.napoleonx.eth address to resolve to the deployed contract address */
    function NapoleonXPrivatesale(address napoleonXCrowdsaleContractAddress, address greenlistAddress, address napoleonXMultiSigWalletAddress, uint setStartTime) {
        napoleonXCrowdsaleContract = napoleonXCrowdsaleContractAddress;
        napoleonXGreenlist = Greenlist(greenlistAddress);
        // cast to NapoleonX Token Contract the already deployed NapoleonX token
        napoleonXToken =  NapoleonXToken(napoleonXTokenAddress);
        // get the NapoleonX MultiSig Contract  already deployed address to transfer funds to
        napoleonXMultiSigWallet = napoleonXMultiSigWalletAddress;
        startTime = setStartTime;
        endTime = startTime + MAX_PRIVATE_SALE_CONTRIBUTION_DURATION;
    }

    // MODIFIERS
    modifier only_napoleonXCrowdsale {
        require(msg.sender == napoleonXCrowdsaleContract);
        _;
    }


    function getWeiRaised() constant public {
      return weiRaised;
    }

    function transferAllFunds() only_napoleonXCrowdsale {
        selfdestruct(napoleonXMultiSigWallet);
    }

    function redeemFund(address owner) only_napoleonXCrowdsale {
      uint amount = investedAmountOf[owner];
      investedAmountOf[msg.sender] = 0;
      if (amount > 0) {
        if (owner.send(amount)) {
            Refund(owner, amount);
        }
        else {
            investedAmountOf[owner] = amount;
        }
      }
    }

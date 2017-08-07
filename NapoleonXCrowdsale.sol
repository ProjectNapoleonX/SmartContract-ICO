/**
 * Overflow aware uint math functions.
 *
 * Inspired by https://github.com/MakerDAO/maker-otc/blob/master/contracts/simple_market.sol
 */
contract SafeMath {
  //internals
  function safeMul(uint a, uint b) internal returns (uint) {
    uint c = a * b;
    assert(a == 0 || c / a == b);
    return c;
  }

  function safeSub(uint a, uint b) internal returns (uint) {
    assert(b <= a);
    return a - b;
  }

  function safeAdd(uint a, uint b) internal returns (uint) {
    uint c = a + b;
    assert(c>=a && c>=b);
    return c;
  }

  function assert(bool assertion) internal {
    if (!assertion) throw;
  }
}

/**
 * ERC 20 token
 *
 * https://github.com/ethereum/EIPs/issues/20
 */
contract Token {

    /// @return total amount of tokens
    function totalSupply() constant returns (uint256 supply) {}

    /// @param _owner The address from which the balance will be retrieved
    /// @return The balance
    function balanceOf(address _owner) constant returns (uint256 balance) {}

    /// @notice send `_value` token to `_to` from `msg.sender`
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transfer(address _to, uint256 _value) returns (bool success) {}

    /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
    /// @param _from The address of the sender
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {}

    /// @notice `msg.sender` approves `_addr` to spend `_value` tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _value The amount of wei to be approved for transfer
    /// @return Whether the approval was successful or not
    function approve(address _spender, uint256 _value) returns (bool success) {}

    /// @param _owner The address of the account owning tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @return Amount of remaining tokens allowed to spent
    function allowance(address _owner, address _spender) constant returns (uint256 remaining) {}

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

}

/**
 * ERC 20 token
 *
 * https://github.com/ethereum/EIPs/issues/20
 */
contract StandardToken is Token {

    /**
     * Reviewed:
     * - Interger overflow = OK, checked
     */
    function transfer(address _to, uint256 _value) returns (bool success) {
        //Default assumes totalSupply can't be over max (2^256 - 1).
        //If your token leaves out totalSupply and can issue more tokens as time goes on, you need to check if it doesn't wrap.
        //Replace the if with this one instead.
        if (balances[msg.sender] >= _value && balances[_to] + _value > balances[_to]) {
        //if (balances[msg.sender] >= _value && _value > 0) {
            balances[msg.sender] -= _value;
            balances[_to] += _value;
            Transfer(msg.sender, _to, _value);
            return true;
        } else { return false; }
    }

    function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {
        //same as above. Replace this line with the following if you want to protect against wrapping uints.
        if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value && balances[_to] + _value > balances[_to]) {
        //if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value && _value > 0) {
            balances[_to] += _value;
            balances[_from] -= _value;
            allowed[_from][msg.sender] -= _value;
            Transfer(_from, _to, _value);
            return true;
        } else { return false; }
    }

    function balanceOf(address _owner) constant returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) constant returns (uint256 remaining) {
      return allowed[_owner][_spender];
    }

    mapping(address => uint256) balances;

    mapping (address => mapping (address => uint256)) allowed;

    uint256 public totalSupply;
}

contract NapoleonXPresale is SafeMath {
    /* Map of the private sale committers : also called green list */
    mapping (address => uint256) commitments;
    uint256 public greenlistTotalSupply;
    

    function commitmentOf(address _committer) constant returns (uint256 balance) {
        return commitments[_committer];
    }
    // register a new committer or update an already committed one with a new value
    // can also nullify an already committed with a null value
    // this function can only be handled by the moderator for KYC purpose
    // and to avoid hitting the ICO ether cap by vetting crazy commitments
    // value is specified in weis
    function registerCommitment(address committer, uint value) {
        // 0 if not already committed
        uint precedentCommitment = commitments[committer];
        greenlistTotalSupply = safeAdd(greenlistTotalSupply,value);
        greenlistTotalSupply = safeSub(greenlistTotalSupply,precedentCommitment);
        commitments[committer] = value;
    }
}


contract NapoleonXCrowdsale is StandardToken, SafeMath, NapoleonXPresale {
    // Constant token specific fields
    string public constant name = "NapoleonX Token";
    string public constant symbol = "NPX";
    uint public constant decimals = 2;
    // NapoleonX fields
    /* the number of tokens already sold through this contract expressed in token quantas : the smallest indivisible part 1/100*/
    /* this number is bounded due to the maximum ethereum capitalization cap */
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
    uint public constant ONE_NPX_TOKEN_PRICE = 1 ether;
    // Nevertheless, for the ICO, a minimal amount of 0.1 NPX is required per subscriber.
    uint public constant MIN_OWNABLE_TOKEN_FRACTION_NUMERATOR = 1;
    uint public constant MIN_OWNABLE_TOKEN_FRACTION_DENOMINATOR = 10;
    
    // green list early birds discount
    uint public constant GREENLIST_DISCOUNT = 20;
    
    // percentage of token
    uint public constant FOUNDER_ALLOCATION = 20;
    /* All deposited ETH will be ultimately forwarded to this multisignature wallet */
    address napoleonXMultiSigWallet;
    /* this napoleonXFounder address is where napoleonx.eth resolves to */
    address napoleonXFounder;

    /* Contribution start/end time in seconds */
    uint public startTime;
    uint public endTime;
    uint public transferLockup = 8 weeks; //tokens will be locked for two months
    uint public founderLockup = 16 weeks; //founder allocation cannot be created until at least four months


    /** How much ETH each address has invested to this crowdsale */
    mapping (address => uint256) public investedAmountOf;

    // EVENTS
    event Refund(address investor, uint weiAmount);
    // MODIFIERS
    modifier only_napoleonXFounder {
        require(msg.sender == napoleonXFounder);
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
    
    function isEqualLength(address[] x, uint[] y) internal returns (bool) { return x.length == y.length; }

    modifier onlySameLengthArray(address[] x, uint[] y) {
        require(isEqualLength(x,y));
        _;
    }
    
    function NapoleonXCrowdsale(address _napoleonXMultiSigWallet, uint setStartTime) {
        napoleonXFounder = msg.sender;
        napoleonXMultiSigWallet = _napoleonXMultiSigWallet;
        startTime = setStartTime;
        endTime = startTime + MAX_CONTRIBUTION_DURATION;
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

    // wew here repopulate the greenlist using the historic commitments from www.napoleonx.ai website
    function populateExistingGreenList(address[] committers, uint[] values) only_napoleonXFounder onlySameLengthArray(committers, values) {
        for (uint i = 0; i < committers.length; i++) {
            registerCommitment(committers[i],values[i]);
        }
    }
    
    // NON-CONSTANT METHODS
    /**
     * Make an investment.
     *
     * Crowdsale must be running for one to invest.
     * Crowdsale must not have been halted
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
        // remaining committed from the green list
        uint amountCommittedInWei = commitmentOf(msg.sender);
        uint alreadyInvestedAmount = investedAmountOf[msg.sender];
        uint multiplier = 10 ** decimals;
        
        
        // we here assert that the ether sent is enough to buy the smallest indivisible NPX token piece (1/100)
        uint tokenQuantaAmount = amountSentInWei*multiplier/ONE_NPX_TOKEN_PRICE;
        uint minimumQantaRequiredAmount = MIN_OWNABLE_TOKEN_FRACTION_NUMERATOR*multiplier/ MIN_OWNABLE_TOKEN_FRACTION_DENOMINATOR;
        // we should have more than 10 hundredth which makes exactly 0.1 ether at one ether per token : the minimal investment accepted
        assert(tokenQuantaAmount>=minimumQantaRequiredAmount);
        
        // the committed amount from the greenlist is still bigger than the weis sent
        if (amountCommittedInWei>amountSentInWei){
            uint remainingAmountCommittedInWei = safeSub(amountCommittedInWei,amountSentInWei);
            // we update the green list accordingly
            registerCommitment(msg.sender,remainingAmountCommittedInWei);
            // for the amount registered in the green list the discount is a steady 
            tokenQuantaAmount = tokenQuantaAmount * (100 + GREENLIST_DISCOUNT) / 100;
        }
        
        if (amountCommittedInWei<=amountSentInWei){
            uint remainingAmountSentInWei = safeSub(amountSentInWei,amountCommittedInWei);
            // we update the green list accordingly
            registerCommitment(msg.sender,0);
            uint remainingWeiTokenQuantaAmount = remainingAmountSentInWei*multiplier/ONE_NPX_TOKEN_PRICE;
            uint committedWeiTokenQuantaAmount = amountCommittedInWei*multiplier/ONE_NPX_TOKEN_PRICE;
            // for the amount not registered in the green list, we apply the standard discount methodology
            remainingWeiTokenQuantaAmount = remainingWeiTokenQuantaAmount * (100 + discountInPercent()) / 100;
            // for the amount registered in the green list the discount is a steady 
            committedWeiTokenQuantaAmount = committedWeiTokenQuantaAmount * (100 + GREENLIST_DISCOUNT) / 100;
            tokenQuantaAmount = remainingWeiTokenQuantaAmount +  committedWeiTokenQuantaAmount;
        }
        // First we transfer the ether back if needed
        
        // Mint and register token for msg.sender
        // the balance here keeps the number of NapoleonX token quanta (smallest indivisible units 1/100)
        balances[msg.sender] = safeAdd(balances[msg.sender], tokenQuantaAmount);
        totalSupply = safeAdd(totalSupply, tokenQuantaAmount);
        
        // the money is immediately credited to NapoleonX Multi Signatures Wallet
        if (!napoleonXMultiSigWallet.call.value(amountSentInWei)()) throw; //immediately send Ether to NapoleonX founder multisig wallet address
        Buy(msg.sender, amountSentInWei, tokenQuantaAmount);

        // Update investor
        investedAmountOf[msg.sender] = safeAdd(investedAmountOf[msg.sender], amountSentInWei);

        // Update totals
        weiRaised = safeAdd(weiRaised, amountSentInWei);
        tokensSold = safeAdd(tokensSold, tokenQuantaAmount);
        
        // we do not refund the lost decimals ether 
        //uint tokensExactPrice = tokenAmount * ONE_NPX_TOKEN_PRICE / 10 ** napoleonXToken.decimals();
        //uint excessAmount = amountSentInWei - tokensExactPrice;
        //uint purchaseAmount = amountSentInWei - excessAmount;
        //// Return any excess msg.value
        //if (excessAmount > 0) {
        //    msg.sender.transfer(excessAmount);
        //}
    }


    bool public halted = false; //the founder address can set this to true to halt the crowdsale due to emergency
    bool public founderAllocated = false; //this will change to true when the founder fund is allocated
    uint public founderAllocation = 10 * 10**16; //10% of token supply allocated post-crowdsale for the founder allocation
    event Buy(address indexed sender, uint eth, uint fbt);
    event Withdraw(address indexed sender, address to, uint eth);
    event AllocateFounderTokens(address indexed sender);
    event AllocateBountyAndEcosystemTokens(address indexed sender);

//    uint public ecosystemAllocation = 5 * 10**16; //5% of token supply allocated post-crowdsale for the ecosystem fund
//    bool public ecosystemAllocated = false; //this will change to true when the ecosystem fund is allocated
//    uint public etherCap = 500000 * 10**18; //max amount raised during crowdsale (5.5M USD worth of ether will be measured with market price at beginning of the crowdsale)
//    uint public bountyAllocation = 2500000 * 10**18; //2.5M tokens allocated post-crowdsale for the bounty fund
//    uint public presaleTokenSupply = 0; //this will keep track of the token supply created during the crowdsale
//    uint public presaleEtherRaised = 0; //this will keep track of the Ether raised during the crowdsale


    /**
     * Security review
     *
     * - Integer overflow: does not apply, blocknumber can't grow that high
     * - Division is the last operation and constant, should not cause issues
     * - Price function plotted https://github.com/Firstbloodio/token/issues/2
     */
    //function price() constant returns(uint) {
    //    if (block.number>=startBlock && block.number<startBlock+250) return 170; //power hour
    //   if (block.number<startBlock || block.number>endBlock) return 100; //default price
    //    return 100 + 4*(endBlock - block.number)/(endBlock - startBlock + 1)*67/4; //crowdsale price
    //}



    // Buy entry point
    //function buy(uint8 v, bytes32 r, bytes32 s) {
    //    buyRecipient(msg.sender, v, r, s);
    //}

    /**
     * Main token buy function.
     *
     * Buy for the sender itself or buy on the behalf of somebody else (third party address).
     *
     * Security review
     *
     * - Integer math: ok - using SafeMath
     *
     * - halt flag added - ok
     *
     * Applicable tests:
     *
     * - Test halting, buying, and failing
     * - Test buying on behalf of a recipient
     * - Test buy
     * - Test unhalting, buying, and succeeding
     * - Test buying after the sale ends
     *
     */
     

    //function buyRecipient(address recipient, uint8 v, bytes32 r, bytes32 s) {
    //   bytes32 hash = sha256(msg.sender);
    //    if (ecrecover(hash,v,r,s) != signer) throw;
    //    if (block.number<startBlock || block.number>endBlock || safeAdd(presaleEtherRaised,msg.value)>etherCap || halted) throw;
    //    uint tokens = safeMul(msg.value, price());
    //    balances[recipient] = safeAdd(balances[recipient], tokens);
    //    totalSupply = safeAdd(totalSupply, tokens);
    //    presaleEtherRaised = safeAdd(presaleEtherRaised, msg.value);

        // TODO: Is there a pitfall of forwarding message value like this
        // TODO: Different address for founder deposits and founder operations (halt, unhalt)
        // as founder opeations might be easier to perform from normal geth account
    //    if (!founder.call.value(msg.value)()) throw; //immediately send Ether to founder address

    //    Buy(recipient, msg.value, tokens);
    //}

    /**
     * Set up founder address token balance.
     *
     * allocateBountyAndEcosystemTokens() must be calld first.
     *
     * Security review
     *
     * - Integer math: ok - only called once with fixed parameters
     *
     * Applicable tests:
     *
     * - Test bounty and ecosystem allocation
     * - Test bounty and ecosystem allocation twice
     *
     */
    function allocateFounderTokens() only_napoleonXFounder {
        if (now <= endTime + founderLockup) throw;
        if (founderAllocated) throw;
        uint founderShare =  totalSupply * FOUNDER_ALLOCATION /100;
        balances[napoleonXFounder] = safeAdd(balances[napoleonXFounder],founderShare);
        totalSupply = safeAdd(totalSupply,founderShare);
        founderAllocated = true;
        AllocateFounderTokens(msg.sender);
    }




    /**
     * Emergency Stop ICO.
     *
     *  Applicable tests:
     *
     * - Test unhalting, buying, and succeeding
     */
    function halt() only_napoleonXFounder {
        halted = true;
    }

    function unhalt() only_napoleonXFounder {
        halted = false;
    }

    /**
     * Change founder address (where ICO ETH is being forwarded).
     *
     * Applicable tests:
     *
     * - Test founder change by hacker
     * - Test founder change
     * - Test founder token allocation twice
     *
    function changeFounder(address newFounder) {
        if (msg.sender!=founder) throw;
        founder = newFounder;
    }

    /**
     * ERC 20 Standard Token interface transfer function
     *
     * Prevent transfers until freeze period is over.
     *
     * Applicable tests:
     *
     * - Test restricted early transfer
     * - Test transfer after restricted period
     */
    function transfer(address _to, uint256 _value) returns (bool success) {
        if (now <= endTime + transferLockup) throw;
        return super.transfer(_to, _value);
    }
    
    /**
     * ERC 20 Standard Token interface transfer function
     *
     * Prevent transfers until freeze period is over.
     */
    function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {
        if (now <= endTime + transferLockup) throw;
        return super.transferFrom(_from, _to, _value);
    }
}

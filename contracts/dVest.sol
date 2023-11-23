// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.3;

import "./trufflationIndex.sol";
import "./mintVerse.sol";

contract dVest  {
   
    uint256 private _count;

    uint256 deployTime;

    uint256 timer;

    TruflationTester public truflationTester;

    Token public verseTokensContract;

    address public owner;

    //TruflationContract address - 0x25Cb70c92A1FA078E4A9b918c6Ea51376889a15a
    //verseTokenContract address - 0xA3A8F2B4DcCB6c9a9Ff60A205aD8A142B31a5c88
    constructor(address _truflationTesterAddress, address _verseTokenContract, uint256 _timer) { 
        truflationTester = TruflationTester(_truflationTesterAddress);
        verseTokensContract = Token(_verseTokenContract);
        owner = msg.sender;
        deployTime = block.timestamp;
        timer = _timer;
    }

    struct Savings {
        int256 depositAmount;
        int256 currentAmount;
        int256 withdrawAmount; //0 for fixed deposit. might be 0 in dynamic deposit 
        uint256 depositTime;
        uint256 maturityPeriod;
        bool canWithdrawAnytime;
    }
    
    int256 public interestRate = 0; 
  
    mapping(address => mapping(uint => Savings)) public savings; //mapping for deposits/withdraws

    mapping(address => uint[]) userIds;  //for dashboard - get array of ids then get Struct one by one.

    address[] arr; //array of unique users

    mapping(address => bool) checkAdd; //mapping helpful to store unique values in arr

    struct data {
        int256 amount;
        uint256 time;
    }

    mapping(uint => data[]) prevData;
    

    //deposit tokens on our platform
    function deposit(int256 _depositAmount, int256 _withdrawAmount, uint256 _maturityPeriod, bool _canWithdrawAnytime) external{
        uint256 burnTokenAmount;
        if(_depositAmount > 0) burnTokenAmount = uint256(_depositAmount);
        verseTokensContract.burnTokens(msg.sender, burnTokenAmount);

        _count++;
        
        require(_depositAmount > 0, "deposit amount should be greater than 0");
        savings[msg.sender][_count] = Savings({
            depositAmount: _depositAmount,
            currentAmount: _depositAmount,
            withdrawAmount: _withdrawAmount,
            depositTime: block.timestamp,
            maturityPeriod: block.timestamp + _maturityPeriod, //0 for savings account
            canWithdrawAnytime: _canWithdrawAnytime 
        });

        userIds[msg.sender].push(_count);
        if(checkAdd[msg.sender] == false)
        {
            arr.push(msg.sender);
            checkAdd[msg.sender] = true;
        }
        prevData[_count].push(data({
            amount: _depositAmount,
            time: block.timestamp
        }));
    }


    //withdraw tokens function
    function withdraw(uint _id, int256 _withdrawAmount) external {

        require(_withdrawAmount > 0, "withdrawAmount should be greater than 0"); 
        require(savings[msg.sender][_id].currentAmount >= _withdrawAmount, "Insufficient balance");

        if (savings[msg.sender][_id].canWithdrawAnytime == false) 
        {
            require(block.timestamp >= savings[msg.sender][_id].maturityPeriod,
            "Maturity period not reached");
        }

        savings[msg.sender][_id].currentAmount = savings[msg.sender][_id].currentAmount - _withdrawAmount;

        if(savings[msg.sender][_id].currentAmount == 0)
        {
            delete savings[msg.sender][_id];
            for(uint i = 0; i < userIds[msg.sender].length; i++)
            {
                if(userIds[msg.sender][i] == _id)
                    delete userIds[msg.sender][i];
            }
        }

        uint256 mintTokenAmount;
        if(_withdrawAmount > 0) mintTokenAmount = uint256(_withdrawAmount);
        verseTokensContract.mintTokens(msg.sender, mintTokenAmount);
    }


    //calculates new amount after adding interest 
    function getInterest(address _address, uint256 _id) public{ 
        
        require(block.timestamp >= deployTime + timer, "Please wait for timer to get over to get the interest");
        int256 interest = savings[_address][_id].currentAmount*interestRate/1e20;
        savings[_address][_id].currentAmount = savings[_address][_id].currentAmount + interest;

        //logic to withdraw automatically. 
        if((savings[_address][_id].currentAmount >= savings[_address][_id].withdrawAmount) && (savings[_address][_id].withdrawAmount > 0))
        {
            uint256 mintTokenAmount;
            mintTokenAmount = uint256(savings[_address][_id].currentAmount);
            verseTokensContract.mintTokens(_address, mintTokenAmount);
            delete savings[_address][_id];
            for(uint i = 0; i < userIds[_address].length; i++)
            {
                if(userIds[_address][i] == _id)
                    delete userIds[_address][i];
            }
        }

        //push the data for showing history
        prevData[_id].push(data({
            amount: savings[_address][_id].currentAmount,
            time: block.timestamp
        }));
    }

    
    //function that is called automatically every 24hr using chainlink automation.
    function chainKeeper() public { 
        truflationTester.requestInflationWei();
        interestRate = truflationTester.inflationWei();
        for(uint i = 0; i < arr.length; i++)
        {
            for(uint j = 0; j < userIds[arr[i]].length; j++)
            {
                getInterest(arr[i], userIds[arr[i]][j]);
            }
        }
    }


    function getIDs() public view returns (uint[] memory){
        return userIds[msg.sender];
    }


    function getDeposit(uint256 _id) public view returns(Savings memory) {
        return savings[msg.sender][_id];
    }


    modifier onlyOwner 
    {
      require(msg.sender == owner, "sender not owner");
      _;
    }


    function getHistory(uint256 _id) public view returns(data[] memory) {
        return prevData[_id];
    }


    function updateTimer(uint256 _timer) public onlyOwner {
        timer = _timer;
    }
}

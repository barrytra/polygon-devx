// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.7;

import "./Verse.sol";

contract Token is VerseTest{ 

    address private owner;
    uint256 public bonus;
    mapping(address => bool) isRegistered;

    constructor(uint256 _bonus) {
        owner = msg.sender;
        bonus = _bonus;
    }

    //mint bonus tokens for new users
    function newUser(address _addr) public {
        require(!isRegistered[_addr], "user not unique");
        isRegistered[_addr] = true;
        mintTokens(_addr, bonus);
    }

    function mintTokens(address _addr, uint256 _amount) public {
        _transfer(owner, _addr, _amount*1e18); 
    }

    function burnTokens(address _addr, uint256 _amount) public {
        _transfer(_addr, owner, _amount*1e18); 
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can perform this operation");
        _;
    }

    function destroy(address payable _addr) external payable onlyOwner{
        selfdestruct(_addr);
    }
}

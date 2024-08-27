// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoinFlipGame {
    address public owner;
    Outcome public lastResult;

    enum Outcome { Heads, Tails }

    event CoinFlipped(address indexed player, Outcome result);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function flipCoin() external {
        // Simple randomization using blockhash
        bytes32 hash = keccak256(abi.encodePacked(block.difficulty, block.timestamp, msg.sender));
        Outcome result = (uint256(hash) % 2 == 0) ? Outcome.Heads : Outcome.Tails;
        lastResult = result;

        emit CoinFlipped(msg.sender, result);
    }

    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    receive() external payable {}
}

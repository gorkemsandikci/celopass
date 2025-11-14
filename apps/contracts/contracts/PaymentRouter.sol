// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract PaymentRouter is ReentrancyGuard {
    // Payment link structure
    struct PaymentLink {
        address recipient;
        uint256 amount; // 0 for variable amount
        bool isActive;
        uint256 totalReceived;
        uint256 transactionCount;
    }

    mapping(string => PaymentLink) public paymentLinks; // username => link data
    mapping(address => string[]) public userLinks; // user => their links

    uint256 public platformFee = 150; // 1.5% (basis points)
    address public platformWallet;

    event LinkCreated(string indexed username, address recipient, uint256 amount);
    event PaymentReceived(string indexed username, address payer, uint256 amount);

    constructor(address _platformWallet) {
        platformWallet = _platformWallet;
    }

    // Create payment link
    function createLink(string memory username, uint256 amount) external {
        require(paymentLinks[username].recipient == address(0), "Username taken");

        paymentLinks[username] = PaymentLink({
            recipient: msg.sender,
            amount: amount,
            isActive: true,
            totalReceived: 0,
            transactionCount: 0
        });

        userLinks[msg.sender].push(username);
        emit LinkCreated(username, msg.sender, amount);
    }

    // Process payment
    function pay(string memory username) external payable nonReentrant {
        PaymentLink storage link = paymentLinks[username];
        require(link.isActive, "Link inactive");
        require(msg.value > 0, "Amount must be > 0");

        uint256 amount = msg.value;

        // First 100 transactions are free
        uint256 fee = 0;
        if (link.transactionCount >= 100) {
            fee = (amount * platformFee) / 10000;
        }

        uint256 recipientAmount = amount - fee;

        // Transfer to recipient
        (bool success, ) = link.recipient.call{value: recipientAmount}("");
        require(success, "Transfer failed");

        // Transfer fee to platform
        if (fee > 0) {
            (bool feeSuccess, ) = platformWallet.call{value: fee}("");
            require(feeSuccess, "Fee transfer failed");
        }

        // Update stats
        link.totalReceived += amount;
        link.transactionCount += 1;

        emit PaymentReceived(username, msg.sender, amount);
    }

    // Get user's links
    function getUserLinks(address user) external view returns (string[] memory) {
        return userLinks[user];
    }

    // Get link details
    function getLinkDetails(string memory username) external view returns (
        address recipient,
        uint256 amount,
        bool isActive,
        uint256 totalReceived,
        uint256 transactionCount
    ) {
        PaymentLink memory link = paymentLinks[username];
        return (
            link.recipient,
            link.amount,
            link.isActive,
            link.totalReceived,
            link.transactionCount
        );
    }
}


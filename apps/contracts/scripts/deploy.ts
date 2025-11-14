import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  const PaymentRouter = await ethers.getContractFactory("PaymentRouter");
  const paymentRouter = await PaymentRouter.deploy(deployer.address);

  await paymentRouter.waitForDeployment();

  const address = await paymentRouter.getAddress();
  console.log("PaymentRouter deployed to:", address);
  console.log("\nSave this address for frontend integration!");

  // Wait for block confirmations
  console.log("\nWaiting for block confirmations...");
  await paymentRouter.deploymentTransaction()?.wait(5);

  // Verify contract
  console.log("\nTo verify contract on Celoscan, run:");
  console.log(`npx hardhat verify --network alfajores ${address} ${deployer.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PaymentRouterModule = buildModule("PaymentRouterModule", (m) => {
  const platformWallet = m.getParameter("platformWallet", m.getAccount(0));

  const paymentRouter = m.contract("PaymentRouter", [platformWallet]);

  return { paymentRouter };
});

export default PaymentRouterModule;


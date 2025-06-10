import { WalletTypes } from "locklift";
import { BigNumber } from "bignumber.js";

export default async () => {
  console.log("🚀 Starting HelloWorld deployment...");

  const signer = await locklift.keystore.getSigner("0");
  if (!signer) {
    throw new Error("❌ No signer found for deployment.");
  }

  try {
    // Deploy the Deployer Account (if not already)
    await locklift.deployments.deployAccounts(
      [
        {
          deploymentName: "DeployerAccount",
          signerId: "0",
          accountSettings: {
            type: WalletTypes.EverWallet,
            value: locklift.utils.toNano(2), // Lower value to avoid giver exhaustion
          },
        },
      ],
      true
    );

    const deployerAccount = locklift.deployments.getAccount("DeployerAccount");

    const balance = await locklift.provider.getBalance(deployerAccount.account.address);
    const readableBalance = locklift.utils.fromNano(balance);
    console.log("====================================");
    console.log(`💰 Account Balance: ${readableBalance} EVER`);
    console.log("====================================");

    const requiredBalance = locklift.utils.toNano(1);
    if (new BigNumber(balance).lt(requiredBalance)) {
      throw new Error(`❌ Insufficient balance. Need at least 1 EVER, but have ${readableBalance}`);
    }

    // Deploy HelloWorld contract
    const deploymentResult = await locklift.deployments.deploy({
      deployConfig: {
        contract: "HelloWorld",
        publicKey: signer.publicKey,
        initParams: {
          _nonce: locklift.utils.getRandomNonce(),
        },
        constructorParams: {},
        value: locklift.utils.toNano(1), // Reduced to fit balance
      },
      deploymentName: "HelloWorld",
    });

    const helloWorld = deploymentResult.contract;

    if (!helloWorld?.address) {
      console.error("❌ Deployment failed: No address returned.");
      return;
    }

    console.log(`✅ HelloWorld contract deployed at: ${helloWorld.address}`);
  } catch (error) {
    console.error("❌ Deployment script failed:", );
  }
};

export const tag = "hello-world";
export const dependencies = [];

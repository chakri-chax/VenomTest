import { WalletTypes } from "locklift";


export default async () => {
    const signer = await locklift.keystore.getSigner("0");
    
    if (!signer) {
      throw new Error("No signer found for deployment");
    }
  
    // Deploy HelloWorld contract
    const { contract: helloWorld } = await locklift.deployments.deploy({
      deployConfig: {
        contract: "HelloWorld",
        publicKey: signer.publicKey,
        initParams: { 
          _nonce: locklift.utils.getRandomNonce() 
        },
        constructorParams: {},
        value: locklift.utils.toNano(2),
      },
      deploymentName: "HelloWorld",
    });
  
    console.log(`HelloWorld deployed at: ${helloWorld.address}`);
  
    // Deploy owner account

    await locklift.deployments.deployAccounts([{
        deploymentName: "Owner",
        signerId: "0",
        accountSettings: {
          type: WalletTypes.EverWallet,
          value: locklift.utils.toNano(10),
        },
      }], true);
  };
  
  export const tag = "hello-world";
  export const dependencies = [];
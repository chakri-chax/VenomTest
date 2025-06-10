import { Address } from "locklift";

async function mainS() {
    const signer = (await locklift.keystore.getSigner("0"))!;
    // const walletAddress = `0:${signer.publicKey}`;
    const walletAddress = "0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081";
    console.log(" Signer address:", signer.publicKey!);
    
    const { contract: commissionDistribution, tx } = await locklift.factory.deployContract({
      contract: "CommissionDistribution",
      publicKey: signer.publicKey,
      initParams: {
        nonce_: locklift.utils.getRandomNonce(),
      },
      constructorParams: {
        _lpWallet: new Address(walletAddress),
        _nonce: locklift.utils.getRandomNonce(),
      },
      value: locklift.utils.toNano(1.5),
    });
  
    console.log(`CommissionDistribution deployed at :: ${commissionDistribution.address.toString()}`);
  }
  
  mainS()
    .then(() => process.exit(0))
    .catch(e => {
      console.log(e);
      process.exit(1);
    });
  
  
    
  
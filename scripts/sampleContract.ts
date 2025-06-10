async function main() {
    const signer = (await locklift.keystore.getSigner("0"))!;
    console.log(signer.publicKey);
    const { contract: sample, tx } = await locklift.factory.deployContract({
      contract: "HelloWorld",
      publicKey: signer.publicKey,
      initParams: {
        _nonce: locklift.utils.getRandomNonce(),
      },
      constructorParams: {
      },
      value: locklift.utils.toNano(1),
    });
  
    console.log(`HelloWorld deployed at: ${sample.address.toString()}`);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(e => {
      console.log(e);
      process.exit(1);
    });
  
  
    
  
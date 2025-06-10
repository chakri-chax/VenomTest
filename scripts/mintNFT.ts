import { toNano, WalletTypes,Address } from "locklift";


async function main() {
    const signer = (await locklift.keystore.getSigner("0"))!;
    const collectionArtifacts = locklift.factory.getContractArtifacts("FounderNFTCollection");

    // // calculation of deployed Collection contract address
    // const collectionAddress = await locklift.provider.getExpectedAddress(
    //     collectionArtifacts.abi,
    //     {
    //         tvc: collectionArtifacts.tvc,
    //         publicKey: signer.publicKey,
    //         initParams: {
    //             nonce_: 0,
    //         }
    //     }
    // );
    const depCollectionAddress = new Address("0:da6294898e5252bc13da1e663ac17ddd32a2bccec461f7aa5c74c15d89e97e58")
    // // initialize contract object by locklift
    
    // const collectionInsance = await locklift.factory.getDeployedContract(
    //     "Collection",
    //     depCollectionAddress
    // );

    // // creating new account for Collection calling (or you can get already deployed by locklift.factory.accounts.addExistingAccount)
    const { account: someAccount } = await locklift.factory.accounts.addNewAccount({
        type: WalletTypes.WalletV3,
        value: toNano(10),
        publicKey: signer.publicKey
    });
   
  const collectionInsance = new locklift.provider.Contract( collectionArtifacts.abi, depCollectionAddress);
    


    let id = await collectionInsance.methods.totalSupply({ answerId: 0 }).call();
    console.log("count ",id);
    
  
    const _routingWallet = await collectionInsance.methods.routingWallet().call();
    console.log("_routingWallet ",_routingWallet.routingWallet);
    const _warehouseWallet = await collectionInsance.methods.warehouseWallet().call();
    console.log("_warehouseWallet ",_warehouseWallet.warehouseWallet);

    

    id = await collectionInsance.methods.totalSupply({ answerId: 0 }).call();
    console.log("count ",id);

    // let tokenId = await collectionInsance.methods.nextTokenId({ answerId: 0 }).call();
    // console.log("count ",tokenId);

    console.log("=====================Initiate mint============================");


    const tx = await collectionInsance.methods.initiateMint({
     _to: someAccount.address,
     _amount: 1000
    }).send({
      from: someAccount.address,
      amount: toNano(1),
      bounce: true
    })
    
    console.log("Transaction sent successfully");
    console.log("Initiated  Nft with hash:",await tx.id.hash );

    console.log("=====================pending mints============================");


    id = await collectionInsance.methods.totalSupply({ answerId: 0 }).call();
    console.log("count ",id);

    const owner = await collectionInsance.methods.owner().call();
    console.log("owner ",owner);

    const pendingMints = await collectionInsance.methods.pendingMints().call();
    console.log("pendingMints ",pendingMints);

    
    console.log("=====================complete mints============================");
    
    const tx2 = await collectionInsance.methods.completeMint({_requestId: 0}).send({
      from: someAccount.address,
      amount: toNano(1),
      bounce: true
    })

    console.log("Transaction sent successfully");
    console.log("Complete  Nft with hash:",await tx2.id.hash );

    id = await collectionInsance.methods.totalSupply({ answerId: 0 }).call();
    console.log("count ",id);

    const mint1 = await collectionInsance.methods.mintNft({to: someAccount.address}).send({
      from: someAccount.address,
      amount: toNano(1),
      bounce: true
    })
    console.log("mintedTokens ",mint1.id.hash);

    id = await collectionInsance.methods.totalSupply({ answerId: 0 }).call();
    console.log("count ",id);

    const mint2 = await collectionInsance.methods.mintNft({to: someAccount.address}).send({
      from: someAccount.address,
      amount: toNano(1),
      bounce: true
    })
    console.log("mintedTokens ",mint2.id.hash);

    id = await collectionInsance.methods.totalSupply({ answerId: 0 }).call();
    console.log("count ",id);


    console.log("=====================check  mints============================");
    
    let totalMinted = await collectionInsance.methods.totalMinted({ answerId: 0 }).call();
    console.log("totalMinted ",totalMinted);


    const increment = await collectionInsance.methods.incrememt().call();
    console.log("increment ",increment);

    totalMinted = await collectionInsance.methods.totalMinted({ answerId: 0 }).call();
    console.log("totalMinted ",totalMinted);

}
  
main()
    .then(() => process.exit(0))
    .catch(e => {
        console.log(e);
        process.exit(1);
    });
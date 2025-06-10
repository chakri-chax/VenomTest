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
    const depCollectionAddress = new Address("0:0d25b12778aa03937832d3307507dbe15753da9cfa01dec05247c7af033e4e76")
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
    


    let id = await collectionInsance.methods.totalSupply({ answerId:  1}).call();
    console.log("count ",id);
    
    await collectionInsance.methods.mintNft({ to: someAccount.address }).send({ from: someAccount.address, amount: toNano(1)});
    const { nft: nftAddress } = await collectionInsance.methods.nftAddress({ answerId: 0, id: id.count }).call();
  



    console.log(`NFT: ${nftAddress.toString()}`);
    id = await collectionInsance.methods.totalSupply({ answerId: 0 }).call();
    console.log("count ",id);
    
}
  
main()
    .then(() => process.exit(0))
    .catch(e => {
        console.log(e);
        process.exit(1);
    });
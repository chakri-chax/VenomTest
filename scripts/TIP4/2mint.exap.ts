import { toNano, WalletTypes,Address } from "locklift";


async function main() {
    const signer = (await locklift.keystore.getSigner("0"))!;
    const collectionArtifacts = locklift.factory.getContractArtifacts("Collection");

 
    const depCollectionAddress = new Address("0:be1fb5de7981abfb392971a6c96d3f791692a9440aabbe39b80041731ec18398")
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
    
    await collectionInsance.methods.mintNft({ json: `{"name":"hello world"}` }).send({ from: someAccount.address, amount: toNano(1)});
    const { nft: nftAddress } = await collectionInsance.methods.nftAddress({ answerId: 0, id: id.count }).call();
  
    await collectionInsance.methods.mintNft({ json: `{"name":"hello world"}` }).send({ from: someAccount.address, amount: toNano(1)});
    const { nft: nftAddress2 } = await collectionInsance.methods.nftAddress({ answerId: 0, id: id.count }).call();


    console.log(`NFT: ${nftAddress.toString()}`);   
    console.log(`NFT: ${nftAddress2.toString()}`);
    
    id = await collectionInsance.methods.totalSupply({ answerId: 5 }).call();
    console.log("count ",id);
    
}
  
main()
    .then(() => process.exit(0))
    .catch(e => {
        console.log(e);
        process.exit(1);
    });
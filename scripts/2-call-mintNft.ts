import { get } from "http";
import { toNano, WalletTypes, Address } from "locklift";


async function main() {
    const signer = (await locklift.keystore.getSigner("0"))!;

    const collectionArtifacts = locklift.factory.getContractArtifacts("Collection");

    const mineAddress = new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081")
    const depCollectionAddress = new Address("0:11cc3164f051e176b92f631afd267c142df4dc82cdf0982e1562221698722ea1")
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



    const collectionInsance = new locklift.provider.Contract(collectionArtifacts.abi, depCollectionAddress);


    
    let id = await collectionInsance.methods.totalSupply({ answerId: 0 }).call();
    console.log("count and Total Supply ", id);

    let _tokenId = await collectionInsance.methods._tokenId().call();
    console.log("_tokenId ", _tokenId);
    

    let _warehouseWallet = await collectionInsance.methods.warehouseWallet().call();
    console.log("warehouse wallet ", _warehouseWallet);

    await collectionInsance.methods.setWarehouseWallet({ _warehouseWallet: "0:74895006c9a799b1214b64dd76e00ced6a9a60fe18cfa0b6a1684a6e94e1deaf" }).send({ from: someAccount.address, amount: toNano(1) });
    _warehouseWallet = await collectionInsance.methods.warehouseWallet().call();
    console.log("warehouse wallet ", _warehouseWallet);

    console.log("========================Initiate Mint NFT=======================");



    let requestId = await collectionInsance.methods.requestId().call();
    console.log("requestId ", requestId);

    await collectionInsance.methods.initiateMint({
        _to: "0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081",
        _amount: toNano(1),
    }).send({
        from: someAccount.address,
        amount: toNano(1),
    })

  

  
    requestId = await collectionInsance.methods.requestId().call();
    console.log("requestId ", requestId);


    let getPendingMints = await collectionInsance.methods.getAllPendingMints().call();
    console.log("getPendingMints ", getPendingMints);

   
    requestId = await collectionInsance.methods.requestId().call();
    console.log("requestId ", requestId);

 

    let getPendingMintsByIndex = await collectionInsance.methods.getPendingMintByIndex({ _index: 0 }).call();
    console.log("getPendingMintsByIndex ", getPendingMintsByIndex);

    console.log("========================complete Mint NFT=======================");
    
    let totalSupply = await collectionInsance.methods.totalSupply({ answerId: 0 }).call();
    console.log("totalSupply ", totalSupply);

     _tokenId = await collectionInsance.methods._tokenId().call();
    console.log("_tokenId ", _tokenId);

    await collectionInsance.methods.completeMint({ index: 0 }).send({ from: someAccount.address, amount: toNano(1) });
    
    // // let events = await collectionInsance.events()
     totalSupply = await collectionInsance.methods.totalSupply({ answerId: 0 }).call();
    console.log("totalSupply ", totalSupply);

     _tokenId = await collectionInsance.methods._tokenId().call();
    console.log("_tokenId ", _tokenId);

    

    let nftAddressOf = await collectionInsance.methods.getNftAddress({ id: 0 }).call();
    console.log("nftAddressOf 0", nftAddressOf);

//     nftAddressOf = await collectionInsance.methods.getNftAddress({ id: 1 }).call();
//     console.log("nftAddressOf 1", nftAddressOf);

//     nftAddressOf = await collectionInsance.methods.getNftAddress({ id: 2 }).call();
//     console.log("nftAddressOf 2", nftAddressOf);

//     console.log("========================transfer  NFT=======================");

//     let allNfts = await collectionInsance.methods.getAllNfts().call();
//     // console.log("allNfts ", allNfts.value0);

//     allNfts.value0.map(async (data: any) => {
//         console.log("data id", data.id);
//         console.log("data nft", data.nftAddress.toString());
//     })
    
//     const nftArtifacts = locklift.factory.getContractArtifacts("Nft");

//     const nftInsance = new locklift.provider.Contract( nftArtifacts.abi, new Address("0:a575941e0c4cd590e090ca0e21fa9f99a6b84ae11f914fc5d4bed0b7c7545884"));
    
//     let mine = new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081");
//     let a = await nftInsance.methods.getInfo({answerId: 0}).call();
//     console.log("getInfo ", a);

// await nftInsance.methods.transfer({to: depCollectionAddress,sendGasTo: mine, callbacks: [
//     [
//         mine,
//         {
//             value: 0,
//             payload: "te6ccgEBAQEAAgAAAA=="
//         }
//     ]
// ]}).send({ from: someAccount.address, amount: toNano(1) });

// await nftInsance.methods.changeOwner({newOwner: depCollectionAddress,sendGasTo: mine, callbacks: [
//     [
//         mine,
//         {
//             value: 0,
//             payload: "te6ccgEBAQEAAgAAAA=="
//         }
//     ]
// ]}).send({ from: someAccount.address, amount: toNano(1) });

//     // let getInfo = await nftInsance.methods.getInfo().call();
//      a = await nftInsance.methods.getInfo({answerId: 0}).call();
    
//      console.log("getInfo ", a);
    


}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.log(e);
        process.exit(1);
    });
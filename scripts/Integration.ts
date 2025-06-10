import { Address } from "locklift";


import CollectionAbi  from "../scripts/collectionABI";

async function main() {
   const signer = (await locklift.keystore.getSigner("0"))!;

    const contractAddress = new Address( "0:f3164e2d82587f8a1bddd3a3a994ed393d57faeb150e73afa3bc77da43fa08ea")
    const collection = new locklift.provider.Contract(CollectionAbi, contractAddress);

    // Call method from contract
    const { value0: owner } = await collection.methods.owner({}).call();
    console.log("Owner address:", owner.toString());


    // nftAddress

    const {nft} =  await collection.methods.nftAddress({answerId: 0,id: 1}).call();
    console.log("nftAddress:", nft.toString());

    // nftCode

    const {code} =  await collection.methods.nftCode({answerId: 0}).call();
    // console.log("nftCode:", code.toString());

    const {value0: nftType} = await collection.methods.getNftType({answerId: 0,index: 0}).call();
    console.log("nftCode:", nftType?.toString());
   
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
import { Address, toNano ,Subscriber} from "locklift";
import CollectionAbi from "../scripts/collectionABI";
import nftAbi from "../scripts/nftABI";
const argsIndex = process.argv.indexOf("--");
const args = process.argv.slice(argsIndex + 1);
const [nftId] = args;

async function swapSeed() {
  

  const contractAddress = new Address("0:f3164e2d82587f8a1bddd3a3a994ed393d57faeb150e73afa3bc77da43fa08ea");
  const collection = new locklift.provider.Contract(CollectionAbi, contractAddress);


  const { value0: owner } = await collection.methods.owner({}).call();

  try {
    
   const { nft } = await collection.methods.nftAddress({ answerId: 0, id: nftId }).call();
    console.log("nftAddress:", nft.toString());

    const nftContract = new locklift.provider.Contract(nftAbi, nft);
    const nftInfo = await nftContract.methods.getInfo({ answerId: 0 }).call();


    const tx = await collection.methods.changeNftTypeName({
        nftId: 1,
        nftAddress: new Address("0:65b5cfef000fa1dd5bf7fc2b2c6e7ad917fac8eae9fc54e67e2d88aeb51b54a7"),
        nftTypeIndex: 1,
    
    }).send({ from: owner, amount: ("1000000000"), bounce: true });

   console.log("nftInfo:", nftInfo);
   
   
    console.log("Transaction sent successfully");
    console.log("tx:", tx);
    console.log("Swapped Nft with hash:", tx.id.hash );
  } catch (err) {
    console.error("Minting failed:", err);
  } 
}

swapSeed()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

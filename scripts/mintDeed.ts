import { Address, toNano } from "locklift";
import CollectionAbi from "../scripts/collectionABI";

const argsIndex = process.argv.indexOf("--");
const args = process.argv.slice(argsIndex + 1);
const [nftOwnerAddress, nickName] = args;

async function MintDeed() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  const address = new Address(signer.publicKey!);
  console.log(" Signer address:", address.toString());
  const contractAddress = new Address("0:f3164e2d82587f8a1bddd3a3a994ed393d57faeb150e73afa3bc77da43fa08ea");
  const collection = new locklift.provider.Contract(CollectionAbi, contractAddress);
  const { value0: owner } = await collection.methods.owner({}).call();
  console.log("Owner address:", owner.toString());

  try {
    
    console.log("Minting Deed Nft with name:", nickName, "and owner:", nftOwnerAddress);

    const tx = await collection.methods.mintNftByType({
      owner: new Address(nftOwnerAddress),
      parentNftId: 1,
      parentNftAddress: new Address("0:65b5cfef000fa1dd5bf7fc2b2c6e7ad917fac8eae9fc54e67e2d88aeb51b54a7"),
      nftTypeIndex: 1,
      nickName: nickName.toString(),
    }).send({ from: owner, amount: ("1500000000"), bounce: true });
    const {count} = await collection.methods.totalMinted({ answerId: 0 }).call();
    console.log("Total supply:",count);
   

    console.log("Transaction sent successfully");
    console.log("tx:", tx);
    console.log("Minted Deed Nft with hash:",await tx.id.hash );
  } catch (err) {
    console.error("Minting failed:", err);
  }
}

MintDeed()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

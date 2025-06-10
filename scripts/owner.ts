import { Address ,toNano,Subscriber} from "locklift";
import CollectionAbi from "../scripts/collectionABI";

async function OwnerAddress() {
  const signer = (await locklift.keystore.getSigner("0"))!;

  const contractAddress = new Address("0:f3164e2d82587f8a1bddd3a3a994ed393d57faeb150e73afa3bc77da43fa08ea");
  const collection = new locklift.provider.Contract(CollectionAbi, contractAddress);

  const { value0: owner } = await collection.methods.owner({}).call();
  const {count} = await collection.methods.totalMinted({answerId: 0}).call();
  console.log("Total supply:", count);
  const subscriber = new Subscriber(locklift.provider);
  
  const ContractEvents = await collection.events(subscriber)
    ContractEvents.on(event => {
      console.log(event);
      if(event.event != "NftCreated") return;
      if(event.event == "NftCreated") {
        console.log("NftCreated");
      }
    })

// const amount = toNano(2);
// console.log("Amount:", amount);

// 1.5 => 1500000000
  
  // console.log(owner.toString());
}

OwnerAddress()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  });

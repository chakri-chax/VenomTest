import { Address ,toNano,Subscriber} from "locklift";
import CollectionAbi from "./collectionABI";
import rootTokenAbi from "./TIP3/TokenRoot";
import walletTokenAbi from "./TIP3/TokenWallet";




// async function manualEmission() {

//   const argsIndex = process.argv.indexOf("--");
// const args = process.argv.slice(argsIndex + 1);
// const [recipient, amount] = args;

//   const signer = (await locklift.keystore.getSigner("0"))!;
//   const ownerC = new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081");
//   const tokenRootAddress = new Address("0:a75719da389ed281dfa6182418ede140415441a0fc564c5788b24baba19ced9d");
//   const tokenWalletAddress = new Address("0:f74443c79b512e1537ef0f696e1f54f1c17c2c6376f642e4cbe4037a10d2edb5");
//   const contractAddress = new Address("0:f3164e2d82587f8a1bddd3a3a994ed393d57faeb150e73afa3bc77da43fa08ea");

//   // contracts 
//   const tokenRoot = new locklift.provider.Contract(rootTokenAbi, tokenRootAddress);
//   const tokenWallet = new locklift.provider.Contract(walletTokenAbi, tokenWalletAddress);

//     // create wallet

//   // const tx = await tokenRoot.methods.deployWallet({answerId:0,
//   //   walletOwner: ownerC,
//   //   deployWalletValue: toNano(1),
//   // })

//   // wallet balance : 

//   const balance = await tokenWallet.methods.balance({answerId: 0}).call();
//   const walletBalance = locklift.utils.fromNano(balance.value0);
//   console.log(walletBalance);

//   const r =new Address(recipient)
//   const a = toNano(amount)
//   if(!r || !a) throw new Error("Invalid recipient or amount provided");
//   console.log("recipient:", r);
//   console.log("amount:", a);

  



//   const transferTx = await tokenWallet.methods.transfer({
    
//     amount: a,
//     recipient: r,
//     deployWalletValue: amount,
//     remainingGasTo: ownerC,
//     notify: true,
//     payload: "te6ccgEBAQEAAgAAAA=="
//   }).send({from: ownerC, amount: toNano(1), bounce: true});

//   console.log("transferTx:", transferTx);
  
//   const hash = transferTx.id.hash;

//   console.log("Emmission with Hash:", hash);

//   // const collection = new locklift.provider.Contract(CollectionAbi, contractAddress);


  
//   // const subscriber = new Subscriber(locklift.provider);
  


// // const amount = toNano(2);
// // console.log("Amount:", amount);

// // 1.5 => 1500000000
  
//   // console.log(owner.toString());
// }

async function manualEmission() {
  const argsIndex = process.argv.indexOf("--");
  const args = process.argv.slice(argsIndex + 1);
  const [recipient, amount] = ["0:d36f84e246c6367dd6b1b4ae64d4c918b93bfd6b4efceafe48f0b8de2eb09248",0.0001];

  const ownerC = new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081");
  const tokenRootAddress = new Address("0:a75719da389ed281dfa6182418ede140415441a0fc564c5788b24baba19ced9d");
  const tokenWalletAddress = new Address("0:f74443c79b512e1537ef0f696e1f54f1c17c2c6376f642e4cbe4037a10d2edb5");

  // contracts 
  const tokenRoot = new locklift.provider.Contract(rootTokenAbi, tokenRootAddress);
  const tokenWallet = new locklift.provider.Contract(walletTokenAbi, tokenWalletAddress);

  const decimals = await tokenRoot.methods.decimals({answerId: 0}).call();
  const d = decimals.value0;

  // Check wallet balance
  const balance = await tokenWallet.methods.balance({answerId: 0}).call();
  const walletBalance = locklift.utils.fromNano(balance.value0);
  console.log("Wallet Balance:", walletBalance);
  
  if(Number(walletBalance) <= 1){
    console.log("Wallet balance is less than 1 Venom");
    return;
  }

  const r = new Address(recipient);
  
  let a;
  try {
    a = (Number(amount) * (10 ** Number(d)));
    
    a = Math.floor(a).toString();
    
    if (Number(a) <= 0) {
      throw new Error("Amount must be greater than 0");
    }
  } catch (e) {
    throw new Error(`Invalid amount provided: ${amount}. Error: ${e}`);
  }

  console.log("Decimals:", d);
  console.log("Amount in smallest units:", a);
  console.log("Recipient:", r.toString());

  if(!r || !a) throw new Error("Invalid recipient or amount provided");

  const transferTx = await tokenWallet.methods.transfer({
    amount: a,
    recipient: r,
    deployWalletValue: toNano(0.1), 
    remainingGasTo: ownerC,
    notify: true,
    payload: "te6ccgEBAQEAAgAAAA=="
  }).send({from: ownerC, amount: toNano(1), bounce: true});

  console.log("transferTx:", transferTx);
  
  const hash = transferTx.id.hash;
  console.log("Emmission with Hash:", hash);
}

manualEmission()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  });

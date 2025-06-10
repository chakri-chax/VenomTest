import { Address ,toNano,Subscriber} from "locklift";
import CollectionAbi from "./collectionABI";
import rootTokenAbi from "./TIP3/TokenRoot";
import walletTokenAbi from "./TIP3/TokenWallet";


async function UsdtEmission() {

  const argsIndex = process.argv.indexOf("--");
    const args = process.argv.slice(argsIndex + 1);
    // const [recipient, amount] = args;
  const [recipient, amount] = ["0:d36f84e246c6367dd6b1b4ae64d4c918b93bfd6b4efceafe48f0b8de2eb09248",0.0001];


  const signer = (await locklift.keystore.getSigner("0"))!;
  const ownerC = new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081");
  const tokenRootAddress = new Address("0:8a4ed4483500caf2d4bb4b56c84df41009cc3d0ed6a9de05d853e26a30faeced"); //usdt
  const tokenWalletAddress = new Address("0:9cd81b2945fe1ae23548ff4f34c73bb5c4a6e1f2faa9610c4b446b36b8d54c29"); // usdtWallet

  const tokenRoot = new locklift.provider.Contract(rootTokenAbi, tokenRootAddress);
  const tokenWallet = new locklift.provider.Contract(walletTokenAbi, tokenWalletAddress);
 
  const decimals = await tokenRoot.methods.decimals({answerId: 0}).call();
  const d = decimals.value0;

  // Check wallet balance
  const balance = await tokenWallet.methods.balance({answerId: 0}).call();
  const walletBalance = locklift.utils.fromNano(balance.value0);
  console.log("Wallet Balance:", walletBalance);
  console.log("balance:", balance);
  
  

  const r = new Address(recipient);
  
  let a;
  try {
    a = (Number(amount) * (10 ** Number(d)));
    console.log("Amount in smallest units:", a);
    
    a = Math.floor(a).toString();
    if (Number(a) <= 0) {
      throw new Error("Amount must be greater than 0");
    }
    if(Number(balance.value0) < Number(a)){
      console.log("You dont Sufficent USDT Balance");
      throw new Error("You dont Sufficent USDT Balance");
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

UsdtEmission()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("Error:", e);
    throw new Error(e);
    process.exit(1);
   
  });

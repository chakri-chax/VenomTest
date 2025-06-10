// import { get } from "http";
// import { toNano, WalletTypes, Address } from "locklift";


// async function main() {
//     const signer = (await locklift.keystore.getSigner("0"))!;

//     const collectionArtifacts = locklift.factory.getContractArtifacts("CommissionDistribution");

//     const mineAddress = new Address("0:7cd1eb792bc8a3f5bedb6d1ca7949dcc8ad688b4f78f96bd6c237e73d06b29c1")
//     const dhruvAddr = new Address("0:d36f84e246c6367dd6b1b4ae64d4c918b93bfd6b4efceafe48f0b8de2eb09248")
//     const depCommissionAddress = new Address("0:3439ebf0cdff3ff2b912e7d7c4dd71dc5459e3255ca7239652e1f03fd9ce2c4c")
    
    


//     const { account: someAccount } = await locklift.factory.accounts.addNewAccount({
//         type: WalletTypes.WalletV3,
//         value: toNano(1),
//         publicKey: signer.publicKey
//     });



//     const CommissionDistributionInstance = new locklift.provider.Contract(collectionArtifacts.abi, depCommissionAddress);


//     console.log("=======================Checking Commission Distribution =======================");
    
//     const _lpWallet = await CommissionDistributionInstance.methods.lpWallet().call();
//     console.log("_lpWallet ", _lpWallet);


//     console.log("=======================Purchase Package =======================");
//     const addresses = [mineAddress, dhruvAddr]
//     const commissions = [3,5]
//     const tx = await CommissionDistributionInstance.methods.purchasePackage({
//         referralWallets: addresses,
//         commissions: commissions,
//         packagePrice: toNano(0.5)
//     }).send({
//         from: someAccount.address,
//         amount: toNano(0.5),
//     });
//     console.log("tx", tx);
    

// }

// main()
//     .then(() => process.exit(0))
//     .catch(e => {
//         console.log(e);
//         process.exit(1);
//     });
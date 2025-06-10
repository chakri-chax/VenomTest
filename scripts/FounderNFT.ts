import { toNano, WalletTypes,Address } from "locklift";

async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  console.log("signer address",signer);
  
  const nftArtifacts = await locklift.factory.getContractArtifacts("FounderNFTCollectionV1");
  const indexArtifacts = await locklift.factory.getContractArtifacts("Index");
  const indexBasisArtifacts = await locklift.factory.getContractArtifacts("IndexBasis");
 const { account: someAccount } = await locklift.factory.accounts.addNewAccount({
        type: WalletTypes.WalletV3,
        value: toNano(10),
        publicKey: signer.publicKey
    });
   
  // const owner = new Address('0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081')

  const { contract: sample, tx } = await locklift.factory.deployContract({
    contract: "FounderNFTCollectionV1",
    publicKey: signer.publicKey,
    initParams: {
      nonce_: 0,
    },
    constructorParams: {
      codeNft: nftArtifacts.code,
      codeIndex: indexArtifacts.code,
      codeIndexBasis: indexBasisArtifacts.code,
      owner: someAccount.address,
      remainOnNft: locklift.utils.toNano(0.2),
      json: `{"collection":"tutorial"}` // EXAMPLE...not by TIP-4.2
    },
    value: locklift.utils.toNano(1),
  });

  console.log(`Collection deployed at: ${sample.address.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });

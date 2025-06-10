import { toNano, WalletTypes, Address,getRandomNonce } from "locklift";

async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  console.log("signer address", signer);

  const nftArtifacts = await locklift.factory.getContractArtifacts("Nft");
  const indexArtifacts = await locklift.factory.getContractArtifacts("Index");
  const indexBasisArtifacts =
    await locklift.factory.getContractArtifacts("IndexBasis");


  const owner = new Address(
    "0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081"
  );

  const { contract: sample, tx } = await locklift.factory.deployContract({
    contract: "Collection",
    publicKey: signer.publicKey,
    initParams: {
      nonce_: getRandomNonce(),
    },
    constructorParams: {
      codeNft: nftArtifacts.code,
      codeIndex: indexArtifacts.code,
      codeIndexBasis: indexBasisArtifacts.code,

      owner: owner, //   address owner,
      remainOnNft: locklift.utils.toNano(0.2), // 	uint128 remainOnNft,
      baseNftUrl: `https://mprofy-web2.s3.us-east-2.amazonaws.com/deedseed/`, // 	string baseNftUrl,
      collectionUrl: `https://mprofy-web2.s3.us-east-2.amazonaws.com/deedseed/collection.json`, //     string collectionUrl,
      genesisNftOwner: owner, // 	address genesisNftOwner,
      genesisNickName: `Mprofy`, // 	string genesisNickName
      nonce: getRandomNonce(), // 	uint64 nonce,
    },

    value: locklift.utils.toNano(1.5),
  });
  console.log("sample", sample);

  console.log(`Collection deployed at: ${sample.address.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });

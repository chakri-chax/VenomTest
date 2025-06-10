import { Address } from "locklift";
import CollectionAbi from "./collectionABI";

export const fetchOwnerAddress = async (): Promise<string> => {
  const signer = (await locklift.keystore.getSigner("0"))!;
  const contractAddress = new Address("0:f3164e2d82587f8a1bddd3a3a994ed393d57faeb150e73afa3bc77da43fa08ea");
  const collection = new locklift.provider.Contract(CollectionAbi, contractAddress);

  const { value0: owner } = await collection.methods.owner({}).call();
  return owner.toString();
};

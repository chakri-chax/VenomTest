import express from "express";
import { getOwner, mintSeed,mintDeed, swapSeed,transferNFT } from "../controllers/collectionController";

const router = express.Router();

router.get("/owner", getOwner);
router.post("/mintSeed", mintSeed);
router.post("/mintDeed", mintDeed);
router.post("/swapSeed",swapSeed)
router.post('/transferNFT',transferNFT)

export default router;

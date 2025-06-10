import { Request, Response } from "express";
import { exec } from "child_process";
import path from "path";
import { ProviderRpcClient, Address } from "everscale-inpage-provider";
import collectionAbi from "../scripts/collectionABI";
import { fetchOwnerAddress } from "../scripts/getOwnerAddress";

// Handler to get the owner address
export const getOwner = async (req: Request, res: Response) => {
  const scriptPath = path.resolve(__dirname, "../scripts/owner.ts");
  const command = `npx locklift run -s ${scriptPath} -n mainnet`;

  console.log("Executing command:", command);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Execution error: ${error.message}`);
      return res.status(500).json({ error: "Failed to fetch owner address." });
    }

    if (stderr) {
      console.warn(`Script warning/stderr: ${stderr}`);
    }

    const lines = stdout.trim().split("\n");
    const lastLine = lines[lines.length - 1];

    const ownerAddress = lastLine.startsWith("0:") ? lastLine : null;

    if (!ownerAddress) {
      return res.status(500).json({ error: "Owner address not found in script output." });
    }

    return res.json({ owner: ownerAddress });
  });
};


export const mintSeed = async (req: Request, res: Response): Promise<void> => {
  const { nftOwnerAddress, nickName } = req.body;

  if (!nftOwnerAddress || !nickName) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const scriptPath = path.resolve(__dirname, "../scripts/mintSeed.ts");
  const command = `npx locklift run -s ${scriptPath} -n mainnet -- ${nftOwnerAddress}  "${nickName}"`;

  console.log("Minting Seed NFT:", command);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Execution error:", error);
      res.status(500).json({ error: "Script execution failed" });
      return;
    }

    if (stderr) {
      console.warn("Script stderr:", stderr);
    }

    const match = stdout.match(/Minted Seed Nft with hash:\s*([a-f0-9]{64})/i);

    const countMatch = stdout.match(/Total supply:\s*(\d+)/i);
    if (countMatch) {
      console.log("Total supply:", countMatch[1]);
    }

    if (match) {
      const txHash = match[1];
      console.log("Minted Seed Nft with Hash:", txHash);
      res.status(200).json({ message: "Seed NFT minted successfully", hash: txHash, nftId: countMatch ? countMatch[1] : null });
    } else {
      console.warn("Transaction hash not found in stdout.");
      res.status(200).json({ output: stdout.trim() });
    }
  });
};

export const mintDeed = async (req: Request, res: Response): Promise<void> => {
  const { nftOwnerAddress, nickName } = req.body;

  if (!nftOwnerAddress || !nickName) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const scriptPath = path.resolve(__dirname, "../scripts/mintDeed.ts");
  const command = `npx locklift run -s ${scriptPath} -n mainnet -- ${nftOwnerAddress}  "${nickName}"`;

  console.log("Minting Deed NFT:", command);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Execution error:", error);
      res.status(500).json({ error: "Script execution failed" });
      return;
    }

    if (stderr) {
      console.warn("Script stderr:", stderr);
    }

    const match = stdout.match(/Minted Deed Nft with hash:\s*([a-f0-9]{64})/i);
    const countMatch = stdout.match(/Total supply:\s*(\d+)/i);
    if (countMatch) {
      console.log("Total supply:", countMatch[1]);
    }

    if (match) {
      const txHash = match[1];
      console.log("Minted Deed Nft with Hash:", txHash);
      res.status(200).json({ message: "Deed NFT minted successfully", hash: txHash, nftId: countMatch ? countMatch[1] : null });
    } else {
      console.warn("Transaction hash not found in stdout.");
      res.status(200).json({ output: stdout.trim() });
    }
  });
};


export const manualEmission = async (req: Request, res: Response): Promise<void> => {
  const { recipient, amount } = req.body;

  const scriptPath = path.resolve(__dirname, "../scripts/manualEmission.ts");
  const command = `npx locklift run -s ${scriptPath} -n mainnet -- ${recipient}  "${amount}"`;

  console.log("Manual Emission:", command);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Execution error:", error);
      res.status(500).json({ error: "Script execution failed" });
      return;
    }

    if (stderr) {
      console.warn("Script stderr:", stderr);
    }

    const match = stdout.match(/Emmission with Hash: ([0-9a-f]{64})/);

    if (match) {
      const txHash = match[1];
      console.log("Emmission with Hash:", txHash);
      res.status(200).json({
        message: "Emmission transfer successfully",
        hash: txHash,
      });
    } else {
      console.warn("Transaction hash not found in stdout.");
      res.status(200).json({ output: stdout.trim() });
    }
  });

}

export const swapSeed = async (req: Request, res: Response): Promise<void> => {
  const { nftId } = req.body;

  const scriptPath = path.resolve(__dirname, "../scripts/swapSeed.ts");
  const command = `npx locklift run -s ${scriptPath} -n mainnet -- ${nftId}`;

  console.log("swap Seed :", command);

  exec(command, (error, stdout, stderr) => {
    console.log("stdout:", stdout);

    if (error) {
      console.error("Execution error:", error);
      res.status(500).json({ error: "Script execution failed" });
      return;
    }

    if (stderr) {
      console.warn("Script stderr:", stderr);
    }

    const match = stdout.match(/Swapped Nft with hash: ([0-9a-f]{64})/);
    // console.log("match:", match);


    if (match) {
      const txHash = match[1];
      console.log("Swapped Nft with Hash:", txHash);
      res.status(200).json({
        message: "Swap transfer successfully",
        hash: txHash,
      });
    } else {
      console.warn("Transaction hash not found in stdout.");
      res.status(200).json({ output: stdout.trim() });
    }
  });

}

export const transferNFT = async (req: Request, res: Response): Promise<void> => {
  const { nftAddress, toAddress } = req.body;

  const scriptPath = path.resolve(__dirname, "../scripts/transferNFT.ts");
  const command = `npx locklift run -s ${scriptPath} -n mainnet -- ${nftAddress}  "${toAddress}"`;

  console.log("Transfer NFT:", command);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Execution error:", error);
      res.status(500).json({ error: "Script execution failed" });
      return;
    }

    if (stderr) {
      console.warn("Script stderr:", stderr);
    }

    const match = stdout.match(/Transfered Nft with hash: ([0-9a-f]{64})/);

    if (match) {
      const txHash = match[1];
      console.log("Transfered Nft with Hash:", txHash);
      res.status(200).json({
        message: "Transfer NFT successfully",
        hash: txHash,
      });
    } else {
      console.warn("Transaction hash not found in stdout.");
      res.status(200).json({ output: stdout.trim() });
    }
  });

}

import { lockliftChai, LockliftConfig } from "locklift";
import { FactorySource } from "./build/factorySource";
import * as dotenv from "dotenv";
import chai from "chai";

dotenv.config();
chai.use(lockliftChai);
import "@broxus/locklift-deploy";
import { Deployments } from "@broxus/locklift-deploy";

declare module "locklift" {
    //@ts-ignore
    export interface Locklift {
        deployments: Deployments<FactorySource>;
    }
}
declare global {
  const locklift: import("locklift").Locklift<FactorySource>;
}

const LOCAL_NETWORK_ENDPOINT = process.env.NETWORK_ENDPOINT || "http://localhost/graphql";

const VENOM_TESTNET_ENDPOINT = process.env.VENOM_TESTNET_ENDPOINT || "https://jrpc-devnet.venom.foundation/";

const VENOM_MAINNET_ENDPOINT =  "https://jrpc.venom.foundation/";
// Create your own link on https://dashboard.evercloud.dev/
const MAINNET_GIVER_ADDRESS = process.env.MAINNET_GIVER_ADDRESS!
const MAINNET_GIVER_KEY = process.env.MAINNET_GIVER_KEY !
const MAINNET_GIVER_PHRASE = process.env.MAINNET_GIVER_PHRASE 
const config: LockliftConfig = {
  compiler: {
    // Specify path to your TON-Solidity-Compiler
    // path: "/mnt/o/projects/broxus/TON-Solidity-Compiler/build/solc/solc",

    // Or specify version of compiler
    // externalContracts: {
    //   "./precompiled/": ["Index", "IndexBasis"],
    // },
    version: "0.62.0",

    // Specify config for extarnal contracts as in exapmple
    // externalContracts: {
    //   "node_modules/broxus-ton-tokens-contracts/build": ['TokenRoot', 'TokenWallet']
    // }
      externalContractsArtifacts: {
       "node_modules/@broxus/tip4/precompiled": ['Index', 'IndexBasis']
    }
  },
  linker: {
    // Specify path to your stdlib
    // lib: "/mnt/o/projects/broxus/TON-Solidity-Compiler/lib/stdlib_sol.tvm",
    // // Specify path to your Linker
    // path: "/mnt/o/projects/broxus/TVM-linker/target/release/tvm_linker",

    // Or specify version of linker
    version: "0.15.48",
  },
  // externalContracts: {
  //   "node_modules/@broxus/tip3/build": ["TokenRoot", "TokenWallet"],
  // },
  // externalContracts: {
  //   "precompiled": ["Index", "IndexBasis"],
  // },
  networks: {
    locklift: {
      connection: {
        id: 1001,
        // @ts-ignore
        type: "proxy",
        // @ts-ignore
        data: {},
      },
      keys: {
        // Use everdev to generate your phrase
        // !!! Never commit it in your repos !!!
        // phrase: "action inject penalty envelope rabbit element slim tornado dinner pizza off blood",
        amount: 20,
      },
    },
    local: {
      // Specify connection settings for https://github.com/broxus/everscale-standalone-client/
      connection: {
        id: 1,
        group: "localnet",
        type: "graphql",
        data: {
          endpoints: [LOCAL_NETWORK_ENDPOINT],
          latencyDetectionInterval: 1000,
          local: true,
        },
      },
      // This giver is default local-node giverV2
      giver: {
        // Check if you need provide custom giver
        address: "0:ece57bcc6c530283becbbd8a3b24d3c5987cdddc3c8b7b33be6e4a6312490415",
        key: "172af540e43a524763dd53b26a066d472a97c4de37d5498170564510608250c3",
      },
      keys: {
        // Use everdev to generate your phrase
        // !!! Never commit it in your repos !!!
       // phrase: "action inject penalty envelope rabbit element slim tornado dinner pizza off blood",
        amount: 20,
      },
    },
    venom_testnet: {
      connection: {
        id: 1000,
        type: "jrpc",
        group: "dev",
        data: {
          endpoint: VENOM_TESTNET_ENDPOINT,
        },
      },
      giver: {
        address: "0:0000000000000000000000000000000000000000000000000000000000000000",
        phrase: "phrase",
        accountId: 0,
      },
      keys: {
        // Use everdev to generate your phrase
        // !!! Never commit it in your repos !!!
        // phrase: "action inject penalty envelope rabbit element slim tornado dinner pizza off blood",
        amount: 20,
      },
    },
    mainnet: {
      connection: {
        id: 1,
        type: "jrpc", //proto
        group: "mainnet",
        data: {
          endpoint: VENOM_MAINNET_ENDPOINT,
          
        }
      },
      giver: {
        address: MAINNET_GIVER_ADDRESS, // Optional for mainnet
        key: MAINNET_GIVER_KEY, // Optional for mainnet
      },
      keys: {
        // Your mainnet key
        phrase: MAINNET_GIVER_PHRASE, // Optional for mainnet
        amount: 20,
      },
     
    },
    // mainnet: {
    //   connection: {
    //     id: 1,
    //     type: "jrpc", // or "graphql" if using evercloud
    //     group: "mainnet",
    //     data: {
    //       endpoint: VENOM_MAINNET_ENDPOINT,
    //     }
    //   },
    //   giver: {
    //     address: "0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081",
    //     key: "25d1567ab079ee2b031a163a8226c34dbbd29475bc56626fb4c49a1d30b71330",
    //   },
    //   keys: {
    //     // phrase: "push finger naive equip onion rely hundred aisle upgrade seed dog budget",
    //     amount: 20,
    //   },
     
    // },
  },
  mocha: {
    timeout: 2000000,
  },
};

export default config;

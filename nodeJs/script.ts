import { Address, ProviderRpcClient, TvmException } from 'everscale-inpage-provider';

// For browser environment:
// import { EverscaleStandaloneClient } from 'everscale-standalone-client';
// Or for nodejs environment:
import { EverscaleStandaloneClient } from 'everscale-standalone-client/nodejs';

const ever = new ProviderRpcClient({
  fallback: () =>
    EverscaleStandaloneClient.create({
      connection: {
        id: 2, // network id
        type: 'graphql',
        data: {
          // create your own project at https://dashboard.evercloud.dev
          endpoints: ['https://devnet-sandbox.evercloud.dev/graphql'],
        },
      },
    }),
});

async function myApp() {
  await ever.ensureInitialized();

  await ever.requestPermissions({
    permissions: ['basic'],
  });

  const dePoolAddress = new Address('0:2e0ea1716eb93db16077d30e51d092b075ce7f0eb1c08ca5bea67ef48a79368e');

  const dePool = new ever.Contract(DePoolAbi, dePoolAddress);

  try {
    const output = await dePool.methods.getDePoolInfo({}).call();
    console.log(output);
  } catch (e) {
    if (e instanceof TvmException) {
      console.error(e.code);
    }
  }
}

const DePoolAbi = {
  'ABI version': 2,
  header: ['time', 'expire'],
  functions: [
    {
      name: 'getDePoolInfo',
      inputs: [],
      outputs: [
        { name: 'poolClosed', type: 'bool' },
        { name: 'minStake', type: 'uint64' },
        { name: 'validatorAssurance', type: 'uint64' },
        { name: 'participantRewardFraction', type: 'uint8' },
        { name: 'validatorRewardFraction', type: 'uint8' },
        { name: 'balanceThreshold', type: 'uint64' },
        { name: 'validatorWallet', type: 'address' },
        { name: 'proxies', type: 'address[]' },
        { name: 'stakeFee', type: 'uint64' },
        { name: 'retOrReinvFee', type: 'uint64' },
        { name: 'proxyFee', type: 'uint64' },
      ],
    },
  ],
  data: [],
  events: [],
} as const; // NOTE: `as const` is very important here

myApp().catch(console.error);
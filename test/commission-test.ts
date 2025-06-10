import { expect } from "chai";
import { Contract, Signer, Address, WalletTypes, toNano } from "locklift";
import { FactorySource } from "../build/factorySource";
import { Account } from "locklift/everscale-client";

let commissionDistribution: Contract<FactorySource["CommissionDistribution"]>;
let signer: Signer;
let userAccount: Account;
let commissionDataArtifacts: any

async function deployAccount(signer: Signer, balance: number) {
    const { account } = await locklift.factory.accounts.addNewAccount({
        type: WalletTypes.WalletV3,
        value: toNano(balance),
        publicKey: signer.publicKey
    })

    return account

}
function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
describe("Test Commission contract", async function () {
    before(async () => {
        signer = (await locklift.keystore.getSigner("0"))!;
        let accountPair = await locklift.keystore.getSigner("2");
        userAccount = await deployAccount(accountPair!, 5)
    });

    describe("Contracts", async function () {
        it("Load contract factory", async function () {
            const commissionData = await locklift.factory.getContractArtifacts("CommissionDistribution");
            commissionDataArtifacts = commissionData
            expect(commissionData.code).not.to.equal(undefined, "Code should be available");
            expect(commissionData.abi).not.to.equal(undefined, "ABI should be available");
            expect(commissionData.tvc).not.to.equal(undefined, "tvc should be available");
        });

        it("Deploy contract", async function () {

            // const depCommissionAddress = new Address("0:b2ace92662e6932a249ec96b95c3e37fc84d4c4a5826f6d3ec31251c3259cfb7")
            const deploySigner = (await locklift.keystore.getSigner("16"))!
            const { contract: commissionDistributionC, tx } = await locklift.factory.deployContract({
                contract: "CommissionDistribution",
                publicKey: (deploySigner.publicKey),
                initParams: {
                  nonce_: locklift.utils.getRandomNonce(),
                },
                constructorParams: {
                  _lpWallet: new Address(`0:${deploySigner.publicKey}`),
                  _nonce: locklift.utils.getRandomNonce(),
                },
                value: locklift.utils.toNano(5),
              });
            

            const contractAddress = commissionDistributionC.address.toString();

             const depCommissionAddress = new Address(contractAddress)
            const CommissionDistributionInstance = new locklift.provider.Contract(commissionDataArtifacts.abi, depCommissionAddress);
            commissionDistribution = CommissionDistributionInstance;

            console.log("commissionDistribution", commissionDistribution.address.toString());
            const balance = await locklift.provider.getBalance(commissionDistribution.address);
            console.log("contract balance", balance);
            expect(await locklift.provider.getBalance(commissionDistribution.address).then(balance => Number(balance))).to.be.above(0);

        });
        
        // it("Interact with contract LP Wallet", async function () {
        //     const signer0 = (await locklift.keystore.getSigner("0"))!
        //     const LP_WALLET = new Address(`0:${signer0.publicKey}`)
     
        //     await commissionDistribution.methods.lpWallet().call();

        //     const lpWallet = await commissionDistribution.methods.lpWallet().call()


        //     expect(lpWallet.lpWallet.toString()).to.be.equal(LP_WALLET.toString(), "LP Wallet should be correct");
        // });
        // it("Interact with contract", async function () {
            
        //     const signer3 = (await locklift.keystore.getSigner("9"))!
        //     const lpWallet = await commissionDistribution.methods.lpWallet().call()

        //     //transferfunds to signer3
        //     let addr3 = new Address(`0:${signer3.publicKey}`)
        //     let balance = await locklift.provider.getBalance(addr3);
        //     console.log("lpWallet balance", balance);
        //     // expect(balance).to.be.above(0);
        //     // await locklift.giver.sendTo(
        //     //     addr3,
        //     //     toNano(5)
        //     //   );

        //     const userAccountBalance = await locklift.provider.getBalance(userAccount.address);
        //     console.log("userAccountBalance", userAccountBalance);

        //     const contractBalance = await commissionDistribution.methods.contractBalance().call()
        //     console.log("contractBalance======", contractBalance);

        //     const tx = await commissionDistribution.methods.transferToAddress({ _destination: addr3, _value: toNano(1) }).send({ from: userAccount.address, amount: toNano(4) });
        //     //   console.log("tx", tx);
              
        //     balance = await locklift.provider.getBalance(addr3);
        //     console.log("lpWallet balance", balance);
        //     // expect(balance).to.be.above(0);
            
        // })

        it("Interact with purchase package function", async function () {
            const refWal1 = `0:${(await locklift.keystore.getSigner("5"))!.publicKey}`
            const refWal2 = `0:${(await locklift.keystore.getSigner("4"))!.publicKey}`
            const lpWallet = await commissionDistribution.methods.lpWallet().call()
            
            let refWal1Bal = await locklift.provider.getBalance(new Address(refWal1))
            let refWal2Bal = await locklift.provider.getBalance(new Address(refWal2))
            let lpWalletBal = await locklift.provider.getBalance(lpWallet.lpWallet)

            console.log("refWal1Bal", refWal1Bal)
            console.log("refWal2Bal", refWal2Bal)
            console.log("lpWalletBal", lpWalletBal)


            const addresses = [
                new Address(refWal1),
                new Address(refWal2),
            ]
            const commissions = [10, 20]

            // await locklift.giver.sendTo(
            //     commissionDistribution.address,
            //     toNano(5)
            //   );
           
            
            
             
             await commissionDistribution.methods.purchasePackage({
                referralWallets: addresses,
                commissions: commissions,
                packagePrice: toNano(1)
              }).send({
                from: userAccount.address,
                amount: toNano(5), 
              });

              console.log("sleeping...", 8000);
            
                await delay(8000);
            console.log("awake");
              
        // locklift.tracing.setAllowedCodesForAddress(commissionDistribution.address, {compute:[0,101,102,103,104,105]});
        //     const {traceTree} = await locklift.tracing.trace(tx);
        //     console.log("traceTree", traceTree?.beautyPrint());
            // console.log("tx", traceTree);

            //checking balances
            
            
            console.log("same functions............");
            
            let refWal1BalAfter = await locklift.provider.getBalance(new Address(refWal1))
            let refWal2BalAfter = await locklift.provider.getBalance(new Address(refWal2))
            let lpWalletBalAfter = await locklift.provider.getBalance(lpWallet.lpWallet)

            // difference
            let diff1 = Number(refWal1BalAfter) - Number(refWal1Bal)
            let diff2 = Number(refWal2BalAfter) - Number(refWal2Bal)
            let diff3 = Number(lpWalletBalAfter) - Number(lpWalletBal)
            console.log("diff1", diff1)
            console.log("diff2", diff2)
            console.log("diff3", diff3)

            console.log("total diff", diff1 + diff2 + diff3);

            console.log("ddkljf",1000000000-diff1+diff2+diff3);
            
            
            
              

            
            // expect(tx.aborted).to.be.false;
            // // expect(traceTree).to.not.throwError;
        });

        it("play with contract", async function () {
            let contractBalance = await commissionDistribution.methods.contractBalance().call()
            console.log("contractBalance======", contractBalance);

            let signer11 = (await locklift.keystore.getSigner("11"))!
            let addr11 = new Address(`0:${signer11.publicKey}`)

            let addr11Balance = await locklift.provider.getBalance(addr11);
            console.log("addr11Balance", addr11Balance);

            await commissionDistribution.methods.transferToAddress({ _destination: addr11, _value: toNano(2) }).send({ from: userAccount.address, amount: toNano(2) });
            //   console.log("tx", tx);
            
            // addr11Balance = await locklift.provider.getBalance(addr11);
            // console.log("addr11Balance", addr11Balance);

            contractBalance = await commissionDistribution.methods.contractBalance().call()
            console.log("contractBalance======", contractBalance);
            // withdrawBenefits

            const tx2 = await commissionDistribution.methods.withdrawBenefits().send({ from: userAccount.address, amount: toNano(1) });
            //   console.log("tx", tx);
            delay(50000);
            contractBalance = await commissionDistribution.methods.contractBalance().call()
            console.log("contractBalance======", contractBalance);

            

        })
        it("play with contract2", async function () {
            let contractBalance = await commissionDistribution.methods.contractBalance().call()
            console.log("contractBalance======", contractBalance);

            let signer11 = (await locklift.keystore.getSigner("11"))!
            let addr11 = new Address(`0:${signer11.publicKey}`)

            let addr11Balance = await locklift.provider.getBalance(addr11);
            console.log("addr11Balance.............", addr11Balance);

            console.log("checking functions............");
            
            const refWal1 = `0:${(await locklift.keystore.getSigner("5"))!.publicKey}`
            const refWal2 = `0:${(await locklift.keystore.getSigner("4"))!.publicKey}`
            const lpWallet = await commissionDistribution.methods.lpWallet().call()
            
            
           
        
            let refWal1Bal = await locklift.provider.getBalance(new Address(refWal1))
            let refWal2Bal = await locklift.provider.getBalance(new Address(refWal2))
            let lpWalletBal = await locklift.provider.getBalance(lpWallet.lpWallet)

            console.log("refWal1Bal", refWal1Bal)
            console.log("refWal2Bal", refWal2Bal)
            console.log("lpWalletBal", lpWalletBal)

        })
    })
});


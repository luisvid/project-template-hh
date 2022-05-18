// 
// Interacting with deployed contracts
// In a way similar to how it would be from node.js
// 
// Note: This is not a traditional Mocha-Chai test, that's why is in the scripts folder
// 
// vía console:
// $ npx hardhat console --network ropsten
// $ const Box = await ethers.getContractFactory("ElixirFundsBUSD")
// $ const box = await Box.attach("0xc2f753C082cf159f64E27007Ea87ED924813A048")
// $ await box.NAME()
// $ (await box.totalParticipants()).toString()
// $ await box.addWhitelist("0x98D08079928FcCB30598c6C6382ABfd7dbFaA1cD", 1);
// 
// Interacting programmatically 
// (This script)
// $ npx hardhat run --network ropsten scripts/interact-deployed-contract.ts
// 
// to generate or regenerate abi
// $ yarn run hardhat export-abi
// $ yarn run hardhat clear-abi
// 


// import { ethers, providers } from 'ethers';
// import { increaseTimeStampDays, toWei, fromWei, increaseTimeStampHours } from '../test/utils/index';

// // get the abis for the contracts to work with
// import abi_PresaleFactory from '../abi/contracts/PresaleCloneFactory.sol/PresaleFactoryClone.json';
// import abi_Presale from '../abi/contracts/PresaleMaster.sol/PresaleMaster.json';

// // addresses and PKs of the involved accounts
// const treasuryAddress = '0x64bE3609bfea95d53317243146C3a428709B1FA4';
// const publisherAddres = '0x9A30EC0b6412649802542a881B71865197cc132D';
// const publisher_pk = '';
// const owner_pk = '';
// const user1 = '0x723a19676EF0f25989C4cD96E049013B400894d6';
// const user2 = '0xc2A50A453031eece2bA552388930B9edAaE6F465';


// // addresses of deployed contracts on ropsten
// const factoryAddres = '0x8fE1886B9dF6a9B7822dbe966F066591C0dc47Ce';
// const BUSDMock = '0xc05062BC7b8fe0c1415F02343e7fE169e08fC1C2';
// const tokenAMock = '0xc562ac6cbc4294959E38a139EEE827792290Dd57';
// const tokenBMock = '0xc5A0d466bB2AbF77129036eC623fDE892ED826a2';

// // alchemy uri
// const ETH_NODE_URI_ROPSTEN = 'https://eth-ropsten.alchemyapi.io/v2/...';
// const provider = new ethers.providers.JsonRpcProvider(ETH_NODE_URI_ROPSTEN, 'ropsten');

// // get the publisher and owner signer object so we can send transactions 
// // on their behalf in functions marked as onlyPublisher or onlyOwner
// const ownerSigner = new ethers.Wallet(owner_pk, provider);
// const publisherSigner = new ethers.Wallet(publisher_pk, provider);

// // get an instance of the deployed factory contract
// const presaleFactory = new ethers.Contract(factoryAddres, abi_PresaleFactory, ownerSigner);

// // set the option object to set a higher gas value to speed up the transaction 
// // (ropsten network is highly congested)
// // e.g. options = { gasPrice: 1000000000, gasLimit: 85000, nonce: 45, value: 0 };
// const options = { gasPrice: ethers.utils.parseUnits('100', 'gwei'), gasLimit: 1000000 };

// // Tiers definition
// enum Tiers {
//   None, // default index 0, no Tier assigned (Guest)
//   Bronze,
//   Silver,
//   Gold,
//   Diamond
// }

async function main(): Promise<void> {

  // // *** create a new presale clone and initialize it
  // console.log('*** create a new presale clone and initialize it');

  // const presaleID = 101;
  // const presaleStartTime = increaseTimeStampHours(1);
  // const presaleEndTime = increaseTimeStampDays(5);
  // const presaleMaxCap = toWei(200000); // BUSD
  // const presaleSupply = toWei(800000); // IGO Tokens

  // // this transaction is sent in behalf of the owner
  // let txn = await presaleFactory.createPresale(
  //   publisherAddres, treasuryAddress, presaleID,
  //   presaleMaxCap, presaleSupply,
  //   presaleStartTime, presaleEndTime
  // );

  // // wait for the transaction to be mined
  // await txn.wait();

  // // get the address of the new presale clone deployed in te previus step
  // const cloneAddress = await presaleFactory.getNewPresaleClone();
  // console.log('New Presale clone address at: ', cloneAddress);

  // // now we work with the recently deployed Presale clone
  // // create instances of the contract cloned with the owner and the publihser
  // // as the signers, since some methods are called on their behalf
  // const presaleClone_pub = new ethers.Contract(
  //   cloneAddress, abi_Presale, publisherSigner);
  // const presaleClone_own = new ethers.Contract(
  //   cloneAddress, abi_Presale, ownerSigner);

  // // *** set Presale tiers
  // console.log('*** set presale tiers');

  // // presale tier parameter array [maxUsers, ticketValue, fee]
  // const tierBronze = [500, toWei(50), 300];
  // const tierSilver = [200, toWei(250), 200];
  // const tierGold = [100, toWei(750), 100];
  // const tierDiamond = [10, toWei(2500), 1];

  // txn = await presaleClone_own.setTiersInfo(
  //   tierBronze, tierSilver, tierGold, tierDiamond);

  // let txn_receipt = await txn.wait();

  // // if everything goes well, show the user of the raised event
  // console.log("Raised event user: ", txn_receipt.events[0].args._user);

  // // The getTiersInfo() function returns the presales 
  // // parameterization arrays of Tiers transpolated
  // console.table(await presaleClone_own.getTiersInfo());

  // // *** Whitelist interaction
  // console.log('*** Whitelist interaction');

  // txn = await presaleClone_own.addWhitelist(user1, Tiers.Silver);
  // txn_receipt = await txn.wait();

  // console.log("whitelisted users: ", await presaleClone_own.getTotalWhitelistedUsers());

  // const [isWhitelisted, inTier] = await presaleClone_own.getWhitelist(user1);
  // console.log("is whitelisted: %s - Tier: %s", isWhitelisted, inTier);

  // const [_isWhitelisted, tokenAmount] = await presaleClone_own.getWhitelistToken(user1);
  // console.log("is whitelisted: %s - Token amount: %s", _isWhitelisted, tokenAmount);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
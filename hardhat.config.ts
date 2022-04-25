import { HardhatUserConfig } from 'hardhat/types';
import { node_url, accounts } from './utils/network';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import '@primitivefi/hardhat-dodoc';
import 'hardhat-gas-reporter';
import 'hardhat-abi-exporter';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.9',
  },
  networks: {
    hardhat: {
      accounts: {
        count: 20,
      },
    },
    ropsten: {
      live: false,
      url: node_url('ropsten'),
      accounts: accounts('ropsten'),
    },
    bsctestnet: {
      live: false,
      url: node_url('bsctestnet'),
      accounts: accounts('bsctestnet'),
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      3: '0xB5664e6278009bE57131a466750370898E1F72f7',  // ropsten
      97: '0xB5664e6278009bE57131a466750370898E1F72f7', // bsc testnet
      56: '', // bsc mainnet
    },
    publisher: {
      default: 1,
      3: '0x9A30EC0b6412649802542a881B71865197cc132D',
      97: '0x9A30EC0b6412649802542a881B71865197cc132D',
      56: '',
    },
    treasury: {
      default: 2,
      3: '0x64bE3609bfea95d53317243146C3a428709B1FA4',
      97: '0x64bE3609bfea95d53317243146C3a428709B1FA4',
      56: '',
    },
  },
  dodoc: {
    runOnCompile: false,
    exclude: [],
    outputDir: './docs',
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    coinmarketcap: 'a07c15b1-4a76-4976-b458-48944dc065d0',
    token: 'BNB',
    gasPriceApi: 'https://api.bscscan.com/api?module=proxy&action=eth_gasPrice',
    showTimeSpent: true,
  },
  abiExporter: {
    runOnCompile: true,
    clear: true,
    pretty: false,
  },
};
export default config;



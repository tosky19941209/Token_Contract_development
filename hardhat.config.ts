import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();
const { INFURA_API_KEY, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    gnosis: {
      url: 'https://rpc.gnosischain.com/',
      gasPrice: 1000000000,
      accounts: [String(PRIVATE_KEY)],
    },
    chiado: {
      url: "https://rpc.chiadochain.net", // Gnosis Chiado testnet RPC URL
      gasPrice: 1000000000,
      accounts: [String(PRIVATE_KEY)],// Add your private key here
    },
    sepolia: {
      url: "https://eth-sepolia.public.blastapi.io",
      gasPrice: 1000000000,
      accounts: [String(PRIVATE_KEY)],
    }
  },
};

export default config;

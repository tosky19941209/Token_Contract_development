const { ethers, hardhatArguments } = require("hardhat");
const fs = require("fs")
require('dotenv').config();

async function main() {

  const [deployer] = await ethers.getSigners();
  console.log("Wallet: ", deployer.address);

  const accountBalance = await ethers.provider.getBalance(deployer)
  console.log("Balance:", ethers.formatEther(accountBalance), "ETH");

  if (!fs.existsSync("deployments")) {
    fs.mkdirSync("deployments");
  }

  const network = hardhatArguments.network
  console.log("Network =>", network)

  const chainId = (await ethers.provider.getNetwork()).chainId
  console.log("ChainID =>", chainId)

  
  // const BridgeToken = await ethers.deployContract("BridgeToken");
  // console.log("BridgeT deployed to address:", await BridgeToken.getAddress());

  // const EstokkYam = await ethers.deployContract("EstokkYam");
  // console.log("EstokkYam deployed to address:", await EstokkYam.getAddress());

  // const TokenFactory = await ethers.deployContract("TokenFactory");
  // console.log("TokenFactory deployed to address:", await TokenFactory.getAddress());

  // const USDC_Token = await ethers.deployContract("Token", ["usdc_token", "USDC_TOKEN", 1000000000000, 18]);
  // console.log("USDC_Token deployed to address:", await USDC_Token.getAddress());

  // const WDAI_Token = await ethers.deployContract("Token", ["wdai_token", "WDAI_TOKEN", 100000000, 18]);
  // console.log("USDC_Token deployed to address:", await WDAI_Token.getAddress());
  // // saveFrontendFiles(_tokenAddress, stakingAddress);
}

// function saveFrontendFiles(token, staking) {
//   const contractsDir = path.join(__dirname, "..");

//   if (!fs.existsSync(contractsDir)) {
//     fs.mkdirSync(contractsDir);
//   }

//   fs.writeFileSync(
//     path.join(contractsDir, "addresses.json"),
//     JSON.stringify({ Token: token, Staking: staking }, undefined, 2)
//   );
// }

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
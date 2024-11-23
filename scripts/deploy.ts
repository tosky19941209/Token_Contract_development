const { ethers, hardhatArguments } = require("hardhat");
const networks = require("./networks");
const fs = require("fs")
require('dotenv').config();

const USDC_TOKEN_Deployment = async (chainId: any) => {
  const USDC_TOKEN_Deployment_Transaction = await ethers.deployContract("Token", ["usdc_token", "USDC_TOKEN", 1000000000000, 18]);
  console.log("USDC_TOKEN was deployed:", await USDC_TOKEN_Deployment_Transaction.getAddress());
  const deploymentsOutput = {
    USDC_TOKEN: await USDC_TOKEN_Deployment_Transaction.getAddress()
  }

  let existingData = {};
  try {
    const rawData = fs.readFileSync(`deployments/${chainId}.json`, 'utf8');
    existingData = JSON.parse(rawData);
  } catch (err) {
    console.error("Error reading existing file:", err);
  }
  const updatedData = { ...existingData, ...deploymentsOutput };
  fs.writeFileSync(`deployments/${chainId}.json`, JSON.stringify(updatedData));

}

const WDAI_TOKEN_Deployment = async (chainId: any) => {
  const USDC_TOKEN_Deployment_Transaction = await ethers.deployContract("Token", ["usdc_token", "USDC_TOKEN", 1000000000000, 18]);
  console.log("WDAI_TOKEN was deployed:", await USDC_TOKEN_Deployment_Transaction.getAddress());

  const deploymentsOutput = {
    WDAI: await USDC_TOKEN_Deployment_Transaction.getAddress()
  }

  let existingData = {};
  try {
    const rawData = fs.readFileSync(`deployments/${chainId}.json`, 'utf8');
    existingData = JSON.parse(rawData);
  } catch (err) {
    console.error("Error reading existing file:", err);
  }
  const updatedData = { ...existingData, ...deploymentsOutput };
  fs.writeFileSync(`deployments/${chainId}.json`, JSON.stringify(updatedData));
  
}

async function main() {

  if (!fs.existsSync("deployments")) {
    fs.mkdirSync("deployments");
  }

  const [deployer] = await ethers.getSigners();
  const balance = Number(ethers.formatEther(await ethers.provider.getBalance(deployer)))
  const network = hardhatArguments.network
  const chainId = (await ethers.provider.getNetwork()).chainId

  console.log("    Balance:", balance.toFixed(5), networks.symbol[chainId] || "Unknown");
  console.log("    Wallet: ", deployer.address);
  console.log("    Network =>", network)
  console.log("    ChainID =>", chainId)

  await USDC_TOKEN_Deployment(chainId)
  await WDAI_TOKEN_Deployment(chainId)
  // const BridgeToken = await ethers.deployContract("BridgeToken");
  // console.log("BridgeT deployed to address:", await BridgeToken.getAddress());

  // const EstokkYam = await ethers.deployContract("EstokkYam");
  // console.log("EstokkYam deployed to address:", await EstokkYam.getAddress());

  // const TokenFactory = await ethers.deployContract("TokenFactory");
  // console.log("TokenFactory deployed to address:", await TokenFactory.getAddress());



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
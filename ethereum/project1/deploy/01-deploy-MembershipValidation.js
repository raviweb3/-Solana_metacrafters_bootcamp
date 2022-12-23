const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    console.log("chainId:",chainId);

    log("----------------------------------------------------")
    log("Deploying FWRewards and waiting for confirmations...")
    const membershipValidation = await deploy("MembershipValidation", {
        from: deployer,
        args: [],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`MembershipValidation deployed at ${membershipValidation.address}`)
}

module.exports.tags = ["all", "membershipvalidation"]
const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    console.log("chainId:",chainId);

    log("----------------------------------------------------")
    log("Deploying Cohort Token and waiting for confirmations...")
    const cohortToken = await deploy("CohortToken", {
        from: deployer,
        args: [],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`CohortToken deployed at ${cohortToken.address}`)
}

module.exports.tags = ["all", "cohorttoken"]
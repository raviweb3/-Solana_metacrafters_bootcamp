const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    console.log("chainId:",chainId);

    log("----------------------------------------------------")
    log("Deploying Cohort Program and waiting for confirmations...")
    const cohortProgram = await deploy("CohortProgram", {
        from: deployer,
        args: [],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`CohortProgram deployed at ${cohortProgram.address}`)
}

module.exports.tags = ["all", "cohortprogram"]
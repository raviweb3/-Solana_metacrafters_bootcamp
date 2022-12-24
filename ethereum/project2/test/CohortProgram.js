const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  
  describe("CohortProgram", function () {
   
    async function deploy() {
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
      const CohortProgram = await ethers.getContractFactory("CohortProgram");
      const cohortProgram = await CohortProgram.deploy();
      return {  owner, cohortProgram };
    }

    describe("Registration", function () {
      it("Should has available spots", async function () {
        const { owner, cohortProgram } = await deploy();

        await expect(await cohortProgram.availableSpots()).equal(30);
      });

      it("Should register", async function () {
        const { owner, cohortProgram } = await deploy();

        await cohortProgram.register("firstUser", "fresh graduate", 0);
        await expect(await cohortProgram.availableSpots()).equal(29);
      
      });
    });
  });
  
const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  
  describe("MembershipValidation", function () {
   
    async function deploy() {
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
      const MembershipValidation = await ethers.getContractFactory("MembershipValidation");
      const membershipValidation = await MembershipValidation.deploy();
      return {  owner, membershipValidation };
    }

    describe("Manage Membership", function () {
      it("Should increase members", async function () {
        const { owner, membershipValidation } = await deploy();

        await membershipValidation.increaseMembers(5);
        await expect(await membershipValidation.getMaxMembers()).equal(15);
      });

      it("Should decrease members", async function () {
        const { owner, membershipValidation } = await deploy();

        await membershipValidation.decreaseMembers(2);
        await expect(await membershipValidation.getMaxMembers()).equal(8);
      
      });
    });
  });
  
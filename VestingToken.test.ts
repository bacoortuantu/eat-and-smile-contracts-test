// // const { expectRevert } = require("@openzeppelin/test-helpers");
// import { expect } from "chai";
// import { ethers } from "hardhat";
// import { Contract } from "@ethersproject/contracts";
// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

// function parseEther(amount: Number) {
//   return ethers.utils.parseUnits(amount.toString(), 18);
// }
// const ETHER_1_MIL = parseEther(1 * 10 ** 6);
// const ETHER_0_4_MIL = parseEther(400 * 10 ** 3);
// const ETHER_0_6_MIL = parseEther(600 * 10 ** 3);

// async function getPermitSignature(signer, token, spender, value, deadline) {
//   const [nonce, name, version, chainId] = await Promise.all([
//     token.nonces(signer.address),
//     token.name(),
//     "1",
//     signer.getChainId(),
//   ]);

//   return ethers.utils.splitSignature(
//     await signer._signTypedData(
//       {
//         name,
//         version,
//         chainId,
//         verifyingContract: token.address,
//       },
//       {
//         Permit: [
//           {
//             name: "owner",
//             type: "address",
//           },
//           {
//             name: "spender",
//             type: "address",
//           },
//           {
//             name: "value",
//             type: "uint256",
//           },
//           {
//             name: "nonce",
//             type: "uint256",
//           },
//           {
//             name: "deadline",
//             type: "uint256",
//           },
//         ],
//       },
//       {
//         owner: signer.address,
//         spender,
//         value,
//         nonce,
//         deadline,
//       }
//     )
//   );
// }

// describe("Vesting Contract", function () {
//   let owner: SignerWithAddress,
//     alice: SignerWithAddress,
//     bob: SignerWithAddress,
//     carol: SignerWithAddress;

//   let gToken: Contract;
//   let vestingToken: Contract;

//   beforeEach(async () => {
//     await ethers.provider.send("hardhat_reset", []);
//     [owner, alice, bob, carol] = await ethers.getSigners();

//     const GToken = await ethers.getContractFactory("GToken");
//     gToken = await GToken.deploy();

//     // transfer to vestingToken contract 10% of GToken
//     const VestingToken = await ethers.getContractFactory("VestingToken");
//     vestingToken = await VestingToken.deploy(
//       gToken.address, // token
//       1664521200, // start
//       300, // cliff
//       1000, // tgePercent
//       1800, // duration
//       300 // slicePeriod
//     );

//     // Chuyển 10% gToken vào vesting token

//     await gToken
//       .connect(owner)
//       .transfer(vestingToken.address, parseEther(500_000_000));
//     const ownerBalance = await gToken.balanceOf(owner.address);
//     const vestingBalance = await gToken.balanceOf(vestingToken.address);

//     console.log({
//       owner: owner.address,
//       ownerBalance: ownerBalance.toString(),
//       vestingBalance: vestingBalance.toString(),
//       GToken: gToken.address,
//       vestingToken: vestingToken.address,
//     });
//   });

//   // createSchedule
//   //   it("Should create a schedule successfully", async function () {
//   //     const amount = parseEther(10);
//   //     const vestingBefore = await vestingToken.getVestingTotalAmount();
//   //     await vestingToken.createSchedule(alice.address, amount);
//   //     const aliceSchedule = await vestingToken.getSchedule(alice.address);
//   //     const total = ethers.BigNumber.from(vestingBefore + amount);
//   //     expect(await vestingToken.getVestingTotalAmount()).equal(total);
//   //     expect(aliceSchedule.totalAmount).equal(amount);
//   //   });

//   // createSchedule
//   //   it("Should create a schedule fail (exceed withdrawable amount)", async function () {
//   //     const amount = parseEther(500_000_000_000);
//   //     await expect(
//   //       vestingToken.createSchedule(alice.address, amount)
//   //     ).revertedWithCustomError(vestingToken, "Schedule__ExceedWithdrawalLimit");
//   //   });

//   // createBatchSchedules
//   //   it("Should create a batch schedules successfully", async function () {
//   //     const amount1 = parseEther(10);
//   //     const amount2 = parseEther(20);
//   //     const amount3 = parseEther(30);
//   //     const beneficiaries = [alice.address, bob.address, carol.address];

//   //     const vestingBefore = await vestingToken.getVestingTotalAmount();
//   //     await vestingToken.createBatchSchedules(beneficiaries, [
//   //       amount1,
//   //       amount2,
//   //       amount3,
//   //     ]);

//   //     const aliceSchedule = await vestingToken.getSchedule(alice.address);
//   //     const bobSchedule = await vestingToken.getSchedule(bob.address);
//   //     const carolSchedule = await vestingToken.getSchedule(carol.address);
//   //     const total = ethers.BigNumber.from(vestingBefore)
//   //       .add(aliceSchedule.totalAmount)
//   //       .add(bobSchedule.totalAmount)
//   //       .add(carolSchedule.totalAmount);
//   //     expect(await vestingToken.getVestingTotalAmount()).equal(total);
//   //   });

//   //   it("Should create a batch schedules fail", async function () {
//   //     const amount1 = parseEther(10);
//   //     const amount2 = parseEther(20);
//   //     const amount3 = parseEther(30);
//   //     const beneficiaries = [alice.address, bob.address, carol.address];

//   //     const vestingBefore = await vestingToken.getVestingTotalAmount();
//   //     await vestingToken.createBatchSchedules(beneficiaries, [
//   //       amount1,
//   //       amount2,
//   //       amount3,
//   //     ]);

//   //     const aliceSchedule = await vestingToken.getSchedule(alice.address);
//   //     const bobSchedule = await vestingToken.getSchedule(bob.address);
//   //     const carolSchedule = await vestingToken.getSchedule(carol.address);
//   //     const total = ethers.BigNumber.from(vestingBefore)
//   //       .add(aliceSchedule.totalAmount)
//   //       .add(bobSchedule.totalAmount)
//   //       .add(carolSchedule.totalAmount);
//   //     expect(await vestingToken.getVestingTotalAmount()).equal(total);
//   //   });

//   // release
//   //   it("Should release successfully", async function () {
//   //     const amount = parseEther(10);
//   //     const vestingBefore = await vestingToken.getVestingTotalAmount();
//   //     await vestingToken.createSchedule(alice.address, amount);
//   //     const aliceSchedule = await vestingToken.getSchedule(alice.address);
//   //     const total = ethers.BigNumber.from(vestingBefore + amount);
//   //     expect(await vestingToken.getVestingTotalAmount()).equal(total);
//   //     expect(aliceSchedule.totalAmount).equal(amount);
//   //   });

//   // release (failed)
//   //   it("Should release fail (unauthorized)", async function () {
//   //     const amount = parseEther(10);
//   //     await vestingToken.createSchedule(alice.address, amount);

//   //     // not authorized
//   //     await expect(
//   //       vestingToken.connect(bob).release(alice.address)
//   //     ).revertedWithCustomError(vestingToken, "Schedule__Unauthorized");
//   //   });

//   // withdraw (failed)
//   it("Should withdraw valid amount successfully by owner, fail when not owner or exceed amount", async function () {
//     const amount = parseEther(10);
//     const exceedAmount = parseEther(500_000_000_000);

//     await vestingToken.createSchedule(alice.address, amount);
//     const withdrawableBefore = await vestingToken.getWithdrawableAmount();

//     await expect(vestingToken.connect(alice).withdraw(amount)).revertedWith(
//       "Ownable: caller is not the owner"
//     );
//     // withdraw exceed amount fail
//     await expect(
//       vestingToken.connect(owner).withdraw(exceedAmount)
//     ).revertedWithCustomError(vestingToken, "Schedule__ExceedWithdrawalLimit");

//     await vestingToken.connect(owner).withdraw(amount);

//     const withdrawableAfter = await vestingToken.getWithdrawableAmount();

//     expect(withdrawableBefore).equal(
//       ethers.BigNumber.from(amount).add(withdrawableAfter)
//     );
//   });

//   // renounceOwnership
//   //   it("Should remove owner's ownership, owner cannot do only owner thing", async function () {
//   //     await vestingToken.connect(owner).renounceOwnership();
//   //     const amount = parseEther(10);
//   //     // owner cannot do anything after transferOwnership
//   //     await expect(vestingToken.connect(owner).withdraw(amount)).to.revertedWith(
//   //       "Ownable: caller is not the owner"
//   //     );
//   //   });

//   // transferOwnership
//   it("Should transfer ownership to alice, then owner cannot do only-owner thing", async function () {
//     await vestingToken.connect(owner).transferOwnership(alice.address);
//     const amount = parseEther(10);
//     // owner cannot do anything after transferOwnership
//     await expect(vestingToken.connect(owner).withdraw(amount)).to.revertedWith(
//       "Ownable: caller is not the owner"
//     );
//   });
// });

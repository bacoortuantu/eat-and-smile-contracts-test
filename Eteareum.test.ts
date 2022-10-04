// // import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
// // import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";// so feel free to add new ones.
// const { expectRevert } = require("@openzeppelin/test-helpers");
// import { expect } from "chai";
// import { ethers } from "hardhat";
// import { Contract } from "@ethersproject/contracts";
// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// import * as chai from "chai";
// const chaiAsPromised = require("chai-as-promised");
// chai.use(chaiAsPromised);

// const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

// function parseEther(amount: Number) {
//   return ethers.utils.parseUnits(amount.toString(), 18);
// }
// const ETHER_1_MIL = parseEther(1 * 10 ** 6);
// const ETHER_0_4_MIL = parseEther(400 * 10 ** 3);
// const ETHER_0_6_MIL = parseEther(600 * 10 ** 3);

// // `describe` is a Mocha function that allows you to organize your tests.
// // Having your tests organized makes debugging them easier. All Mocha
// // functions are available in the global scope.
// //
// // `describe` receives the name of a section of your test suite, and a
// // callback. The callback must define the tests of that section. This callback
// // can't be an async function.

// describe("EatereumV2 contract", function () {
//   let owner: SignerWithAddress,
//     alice: SignerWithAddress,
//     bob: SignerWithAddress,
//     carol: SignerWithAddress;

//   //   let vault: Contract;
//   let token: Contract;

//   beforeEach(async () => {
//     await ethers.provider.send("hardhat_reset", []);
//     [owner, alice, bob, carol] = await ethers.getSigners();

//     const Token = await ethers.getContractFactory("Eatereum");
//     token = await Token.deploy();

//     // console.log(vault);
//     console.log({
//       owner: owner.address,
//       alice: alice.address,
//       bob: bob.address,
//       carol: carol.address,
//       token: token.address,
//     });
//   });

//   // We define a fixture to reuse the same setup in every test. We use
//   // loadFixture to run this setup once, snapshot that state, and reset Hardhat
//   // Network to that snapshot in every test.
//   //   async function deployTokenFixture() {
//   //     const Token = await ethers.getContractFactory("Eatereum");
//   //     const [owner, alice, bob] = await ethers.getSigners();

//   //     // To deploy our contract, we just have to call Token.deploy() and await
//   //     // its deployed() method, which happens onces its transaction has been
//   //     // mined.
//   //     const token = await Token.deploy();

//   //     await token.deployed();

//   //     return { Token, token, owner, alice, bob };
//   //   }

//   // You can nest describe calls to create subsections.
//   // describe("Deployment", function () {
//   // `it` is another Mocha function. This is the one you use to define each
//   // of your tests. It receives the test name, and a callback function.
//   //
//   // If the callback function is async, Mocha will `await` it.
//   // it("Should set the right owner", async function () {
//   //   // We use loadFixture to setup our environment, and then assert that
//   //   // things went well
//   //   const { token, owner } = await loadFixture(deployTokenFixture);

//   //   // `expect` receives a value and wraps it in an assertion object. These
//   //   // objects have a lot of utility methods to assert values.

//   //   // This test expects the owner variable stored in the contract to be
//   //   // equal to our Signer's owner.
//   //   expect(await token.owner()).to.equal(owner.address);
//   // });

//   // it("Should add and remove these addresses as business addresses", async function () {
//   //   const { token, owner, alice, bob } = await loadFixture(
//   //     deployTokenFixture
//   //   );

//   //   // add
//   //   await token
//   //     .connect(owner)
//   //     .acceptBusinessAddresses([alice.address, bob.address]);

//   //   const businessLists = await token.viewBusinessLists(0, 2);
//   //   const businessList = businessLists[0];
//   //   //   console.log({ businessList });
//   //   await expect(businessList.includes(alice.address));

//   //   // remove
//   //   await token
//   //     .connect(owner)
//   //     .cancelBusinessAddresses([alice.address]);

//   //   const businessLists2 = await token.viewBusinessLists(0, 2);
//   //   const businessList2 = businessLists2[0];
//   //   await expect(!businessList2.includes(alice.address));
//   // });

//   //   it("Should add minter by owner (is a minter), then this minter can mint", async function () {
//   //     // add minter
//   //     await token.addMinter(alice.address);
//   //     // check is minter
//   //     expect(await token.isMinter(alice.address)).equal(true);
//   //     // minter mint
//   //     await token.connect(alice).mint(bob.address, ETHER_1_MIL);
//   //     const bobBalance = await token.balanceOf(bob.address);
//   //     expect(bobBalance.toString()).equal(ETHER_1_MIL.toString());

//   //     // remove minter
//   //     await token.connect(alice).renounceMinter();
//   //     expect(await token.isMinter(alice.address)).equal(false);
//   //     await expect(
//   //       token.connect(alice).mint(bob.address, ETHER_1_MIL)
//   //     ).to.revertedWithCustomError(token, "MinterRole__NotAuthorized");
//   //   });

//   //   it("Should lock user, then the user cannot transfer", async function () {
//   //     // lock alice
//   //     await token.mint(alice.address, ETHER_1_MIL);
//   //     await token.setLockUser(alice.address, true);
//   //     // alice cannot transfer
//   //     await expect(
//   //       token.connect(alice).transfer(bob.address, ETHER_0_4_MIL)
//   //     ).to.revertedWithCustomError(token, "Lockable__Locked");
//   //   });

//   it("Should transferFrom correctly between Alice and Bob", async function () {
//     // alice approve 1m + 0.6m - 0.4m = 1.2m
//     await token.mint(alice.address, ETHER_1_MIL);
//     await token.connect(alice).approve(token.address, ETHER_1_MIL);
//     await token.connect(alice).increaseAllowance(token.address, ETHER_0_6_MIL);
//     await token.connect(alice).decreaseAllowance(token.address, ETHER_0_4_MIL);

//     const aliceAllowance = await token.allowance(alice.address, token.address);
//     console.log({
//       aliceAllowance: aliceAllowance.toString(),
//       tokenAddress: token.address,
//     });

//     // transferFrom success
//     // await token.transferFrom(alice.address, bob.address, 1000);

//     // transferFrom fail
//     // await expect(
//     //   token.transferFrom(
//     //     alice.address,
//     //     bob.address,
//     //     "1300000000000000000000000"
//     //   )
//     // ).to.revertedWith("ERC20: insufficient allowance");

//     // const aliceBalance = await token.balanceOf(alice.address);
//     // const bobBalance = await token.balanceOf(bob.address);

//     // console.log({
//     //   aliceBalance: aliceBalance.toString(),
//     //   bobBalance: bobBalance.toString(),
//     // });
//     // expect(await token.balanceOf(alice.address)).equal("0");
//     // expect(await token.balanceOf(bob.address)).equal(
//     //   "1200000000000000000000000"
//     // );

//     // console.log({
//     //   aliceAllowance: aliceAllowance.toString(),
//     // });
//     // transferFrom (success and fail)
//     // await token.transferFrom(alice);
//     // check balance
//     // await token.mint(alice.address, ETHER_1_MIL);
//     // await token.setLockUser(alice.address, true);
//     // // alice cannot transfer
//     // await expect(
//     //   token.connect(alice).transfer(bob.address, ETHER_0_4_MIL)
//     // ).to.revertedWithCustomError(token, "Lockable__Locked");
//   });

//   //   it("Renounce ownership then the owner cannot burn", async function () {
//   //     // lock alice
//   //     await token.mint(alice.address, ETHER_1_MIL);
//   //     await token.setLockUser(alice.address, true);
//   //     // alice cannot transfer
//   //     await expect(
//   //       token.connect(alice).transfer(bob.address, ETHER_0_4_MIL)
//   //     ).to.revertedWithCustomError(token, "Lockable__Locked");
//   //   });

//   //   const businessAddresses = await token.
//   //   expect(await token.viewBusinessListsCount).to.equal(2);
//   //   expect(token.viewBusinessListsCount).to.equal(2);

//   //   expect(isMinter).to.equal(true);
//   // });

//   //   0x858367E33d86756C205ecF5de7243C71c0dAE2Df

//   // it("Should assign 0x858367E33d86756C205ecF5de7243C71c0dAE2Df as the minter", async function () {
//   //   const { token } = await loadFixture(deployTokenFixture);
//   //   const isMinter = await token.isMinter(
//   //     "0x858367E33d86756C205ecF5de7243C71c0dAE2Df"
//   //   );
//   //   expect(isMinter).to.equal(true);
//   // });
//   // });

//   // describe("Transactions", function () {
//   //   it("Should transfer tokens between accounts", async function () {
//   //     const { token, owner, alice, bob } = await loadFixture(
//   //       deployTokenFixture
//   //     );
//   //     // Transfer 50 tokens from owner to alice
//   //     await expect(
//   //       token.transfer(alice.address, 50)
//   //     ).to.changeTokenBalances(token, [owner, alice], [-50, 50]);

//   //     // Transfer 50 tokens from alice to bob
//   //     // We use .connect(signer) to send a transaction from another account
//   //     await expect(
//   //       token.connect(alice).transfer(bob.address, 50)
//   //     ).to.changeTokenBalances(token, [alice, bob], [-50, 50]);
//   //   });

//   //   it("should emit Transfer events", async function () {
//   //     const { token, owner, alice, bob } = await loadFixture(
//   //       deployTokenFixture
//   //     );

//   //     // Transfer 50 tokens from owner to alice
//   //     await expect(token.transfer(alice.address, 50))
//   //       .to.emit(token, "Transfer")
//   //       .withArgs(owner.address, alice.address, 50);

//   //     // Transfer 50 tokens from alice to bob
//   //     // We use .connect(signer) to send a transaction from another account
//   //     await expect(token.connect(alice).transfer(bob.address, 50))
//   //       .to.emit(token, "Transfer")
//   //       .withArgs(alice.address, bob.address, 50);
//   //   });

//   //   it("Should fail if sender doesn't have enough tokens", async function () {
//   //     const { token, owner, alice } = await loadFixture(
//   //       deployTokenFixture
//   //     );
//   //     const initialOwnerBalance = await token.balanceOf(owner.address);

//   //     // Try to send 1 token from alice (0 tokens) to owner (1000 tokens).
//   //     // `require` will evaluate false and revert the transaction.
//   //     await expect(
//   //       token.connect(alice).transfer(owner.address, 1)
//   //     ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

//   //     // Owner balance shouldn't have changed.
//   //     expect(await token.balanceOf(owner.address)).to.equal(
//   //       initialOwnerBalance
//   //     );
//   //   });
//   // });
// });

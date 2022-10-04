// const { expectRevert } = require("@openzeppelin/test-helpers");
import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "@ethersproject/contracts";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

function parseEther(amount: Number) {
  return ethers.utils.parseUnits(amount.toString(), 18);
}
const ETHER_1_MIL = parseEther(1 * 10 ** 6);
const ETHER_0_4_MIL = parseEther(400 * 10 ** 3);
const ETHER_0_6_MIL = parseEther(600 * 10 ** 3);

async function getPermitSignature(signer, token, spender, value, deadline) {
  const [nonce, name, version, chainId] = await Promise.all([
    token.nonces(signer.address),
    token.name(),
    "1",
    signer.getChainId(),
  ]);

  return ethers.utils.splitSignature(
    await signer._signTypedData(
      {
        name,
        version,
        chainId,
        verifyingContract: token.address,
      },
      {
        Permit: [
          {
            name: "owner",
            type: "address",
          },
          {
            name: "spender",
            type: "address",
          },
          {
            name: "value",
            type: "uint256",
          },
          {
            name: "nonce",
            type: "uint256",
          },
          {
            name: "deadline",
            type: "uint256",
          },
        ],
      },
      {
        owner: signer.address,
        spender,
        value,
        nonce,
        deadline,
      }
    )
  );
}

describe("EeatereumV2 Contract", function () {
  let owner: SignerWithAddress,
    alice: SignerWithAddress,
    bob: SignerWithAddress,
    carol: SignerWithAddress;

  //   let vault: Contract;
  let token: Contract;

  beforeEach(async () => {
    await ethers.provider.send("hardhat_reset", []);
    [owner, alice, bob, carol] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Eatereum");
    token = await Token.deploy();

    // console.log(vault);
    // console.log({
    //   owner: owner.address,
    //   alice: alice.address,
    //   bob: bob.address,
    //   carol: carol.address,
    //   token: token.address,
    // });
  });

  // it("Should transferFrom correctly between Alice and Bob", async function () {
  //   // alice approve 1m + 0.6m - 0.4m = 1.2m
  //   await token.mint(alice.address, ETHER_1_MIL);
  //   await token.connect(alice).approve(token.address, ETHER_1_MIL);
  //   await token.connect(alice).increaseAllowance(token.address, ETHER_0_6_MIL);
  //   await token.connect(alice).decreaseAllowance(token.address, ETHER_0_4_MIL);

  //   const aliceAllowance = await token.allowance(alice.address, token.address);
  //   console.log({
  //     aliceAllowance: aliceAllowance.toString(),
  //     tokenAddress: token.address,
  //   });
  // });

  // permit - valid(valid deadline) & invalid signers
  // it("Should permit a contract and deposit successfully, reject not permitted contract and deposit failed", async function () {
  //   const signer = owner;

  //   const Vault = await ethers.getContractFactory("Vault");
  //   const NotPermitVault = await ethers.getContractFactory("Vault");

  //   const vault = await Vault.deploy(token.address);
  //   const notPermitVault = await NotPermitVault.deploy(token.address);

  //   await vault.deployed();
  //   await notPermitVault.deployed();

  //   const amount = 1000;
  //   await token.mint(signer.address, amount);

  //   const deadline = ethers.constants.MaxUint256;
  //   const { v, r, s } = await getPermitSignature(
  //     signer,
  //     token,
  //     vault.address,
  //     amount,
  //     deadline
  //   );

  //   await vault.depositWithPermit(amount, deadline, v, r, s);
  //   expect(await token.balanceOf(vault.address)).to.equal(amount);

  //   // not permitted vault get the signature of permitted vault, but failed
  //   await expect(
  //     notPermitVault.depositWithPermit(amount, deadline, v, r, s)
  //   ).revertedWith("ERC20Permit: invalid signature");
  // });

  // permit - invalid deadline
  // it("Should reject over deadline permission", async function () {
  //   const signer = owner;

  //   const Vault = await ethers.getContractFactory("Vault");
  //   const vault = await Vault.deploy(token.address);
  //   await vault.deployed();

  //   const amount = 1000;
  //   await token.mint(signer.address, amount);

  //   const deadline = 1664761695; //ethers.constants.MaxUint256;
  //   const { v, r, s } = await getPermitSignature(
  //     signer,
  //     token,
  //     vault.address,
  //     amount,
  //     deadline
  //   );

  //   await expect(
  //     vault.depositWithPermit(amount, deadline, v, r, s)
  //   ).revertedWith("ERC20Permit: expired deadline");
  // });

  // acceptBusinessAddresses, cancelBusinessAddresses
  // it("Should add and remove these addresses as business addresses", async function () {
  //   // add
  //   await token
  //     .connect(owner)
  //     .acceptBusinessAddresses([alice.address, bob.address]);

  //   const businessLists = await token.viewBusinessLists(0, 2);
  //   const businessList = businessLists[0];
  //   await expect(businessList.includes(alice.address));

  //   // remove
  //   await token.connect(owner).cancelBusinessAddresses([alice.address]);

  //   const businessLists2 = await token.viewBusinessLists(0, 2);
  //   const businessList2 = businessLists2[0];
  //   await expect(!businessList2.includes(alice.address));
  // });

  // addMinter, removeMinter
  // it("Should add or remove minter successfully", async function () {
  //   // add minter alice
  //   await token.addMinter(alice.address);

  //   // check alice is a minter
  //   expect(await token.isMinter(alice.address)).equal(true);
  //   // alice can mint
  //   await token.connect(alice).mint(bob.address, ETHER_1_MIL);
  //   const bobBalance = await token.balanceOf(bob.address);
  //   expect(bobBalance.toString()).equal(ETHER_1_MIL.toString());

  //   // owner remove alice as a minter
  //   await token.removeMinter(alice.address);
  //   expect(await token.isMinter(alice.address)).equal(false);
  //   await expect(
  //     token.connect(alice).mint(bob.address, ETHER_1_MIL)
  //   ).to.revertedWithCustomError(token, "MinterRole__NotAuthorized");
  // });

  // transferFrom (valid/invalid allowance), decreaseAllowance, increaseAllowance
  // it("Should transferFrom base on increase/decrease allowance correctly between Alice, Bob and Carol", async function () {
  //   // alice approve 1m + 0.6m - 0.4m = 1.2m for bob
  //   await token.mint(alice.address, ETHER_1_MIL);
  //   await token.connect(alice).approve(bob.address, ETHER_1_MIL);
  //   await token.connect(alice).increaseAllowance(bob.address, ETHER_0_6_MIL);
  //   await token.connect(alice).decreaseAllowance(bob.address, ETHER_0_4_MIL);

  //   const allowance = await token.allowance(alice.address, bob.address);
  //   console.log({
  //     allowance: allowance.toString(),
  //     tokenAddress: token.address,
  //   });

  //   // bob transfer to carol with the valid balance
  //   await token
  //     .connect(bob)
  //     .transferFrom(alice.address, carol.address, ETHER_0_4_MIL);
  //   expect(await token.balanceOf(carol.address)).equal(ETHER_0_4_MIL);

  //   // bob transfer to carol with the invalid balance
  //   await expect(
  //     token
  //       .connect(bob)
  //       .transferFrom(alice.address, carol.address, "1300000000000000000000000")
  //   ).to.revertedWith("ERC20: insufficient allowance");
  // });

  // transfer(valid/invalid balance)
  // it("Should transfer correctly between Alice and Bob", async function () {
  //   await token.mint(alice.address, ETHER_1_MIL);

  //   // alice transfer to bob with the valid balance
  //   await token.connect(alice).transfer(bob.address, ETHER_0_4_MIL);
  //   expect(await token.balanceOf(bob.address)).equal(ETHER_0_4_MIL);

  //   // alice transfer to bob with the invalid balance
  //   await expect(
  //     token.connect(alice).transfer(bob.address, "1300000000000000000000000")
  //   ).to.revertedWith("ERC20: transfer amount exceeds balance");
  // });

  // transferOwnership
  // it("Should transfer ownership to an address, then the address can do all owner's actions", async function () {
  //   // owner transfer ownership to alice
  //   await token.connect(owner).transferOwnership(alice.address);

  //   // owner cannot do anything after transferOwnership
  //   await expect(token.connect(owner).addMinter(bob.address)).to.revertedWith(
  //     "Ownable: caller is not the owner"
  //   );

  //   // alice can do only owner's actions
  //   await token.connect(alice).transferOwnership(owner.address);
  // });

  // renounceOwnership
  // it("Should remove owner's ownership, owner cannot do only owner thing", async function () {
  //   // owner transfer ownership to alice
  //   await token.connect(owner).renounceOwnership();

  //   // owner cannot do anything after transferOwnership
  //   await expect(token.connect(owner).addMinter(bob.address)).to.revertedWith(
  //     "Ownable: caller is not the owner"
  //   );
  // });

  // setLockUser
  it("Should lock and unlock a user", async function () {
    // owner locks alice
    await token.mint(alice.address, ETHER_1_MIL);
    await token.connect(owner).setLockUser(alice.address, true);
    await expect(
      token.connect(alice).transfer(bob.address, ETHER_0_4_MIL)
    ).to.revertedWithCustomError(token, "Lockable__Locked");

    // owner unlocks alice
    await token.connect(owner).setLockUser(alice.address, false);
    expect(await token.connect(alice).transfer(bob.address, ETHER_0_4_MIL));
    expect(await token.balanceOf(bob.address)).equal(ETHER_0_4_MIL);
  });

  // paused
  // it("Should lock all the activities when contract is paused", async function () {
  //   // owner transfer ownership to alice
  //   await token.mint(alice.address, ETHER_0_6_MIL);
  //   await token.connect(alice).approve(owner.address, ETHER_0_6_MIL);

  //   await token.connect(owner).pause();

  //   await expect(token.mint(alice.address, ETHER_0_6_MIL)).revertedWith(
  //     "Pausable: paused"
  //   );

  //   await expect(token.transfer(alice.address, ETHER_1_MIL)).revertedWith(
  //     "Pausable: paused"
  //   );

  //   await expect(
  //     token.transferFrom(alice.address, bob.address, ETHER_0_4_MIL)
  //   ).revertedWith("Pausable: paused");
  // });

  // unpaused
  // it("Should lock all the activities when contract is paused", async function () {
  //   // owner transfer ownership to alice
  //   await token.mint(alice.address, ETHER_0_6_MIL);
  //   await token.connect(alice).approve(owner.address, ETHER_0_6_MIL);

  //   // cannot do a thing when contract is paused
  //   await token.connect(owner).pause();

  //   await expect(token.mint(alice.address, ETHER_0_6_MIL)).revertedWith(
  //     "Pausable: paused"
  //   );

  //   await expect(token.transfer(alice.address, ETHER_1_MIL)).revertedWith(
  //     "Pausable: paused"
  //   );

  //   await expect(
  //     token.transferFrom(alice.address, bob.address, ETHER_0_4_MIL)
  //   ).revertedWith("Pausable: paused");

  //   // do all the thing when contract is unpause
  //   await token.connect(owner).unpause();

  //   await expect(token.mint(alice.address, ETHER_0_6_MIL));
  //   await expect(token.transfer(alice.address, ETHER_1_MIL));
  //   await expect(token.transferFrom(alice.address, bob.address, ETHER_0_4_MIL));
  // });

  // burn
  // bytes32 burnId_,
  // uint256 amount_,
  // uint256 deadline_,
  // uint8 v_,
  // bytes32 r_,
  // bytes32 s_
  it("Should burn success with valid signer", async function () {
    // owner transfer ownership to alice
    await token.mint(alice.address, ETHER_0_6_MIL);

    // how to burn?
  });

  // Check only owner all the functions
  // it("Should add or remove minter successfully", async function () {

  //   // addMinter/removeMinter,
  //   expect(
  //     await token.connect(bob.address).removeMinter(alice.address)
  //   ).revertedWith("Ownable: caller is not the owner");
  //   expect(
  //     await token.connect(bob.address).addMinter(alice.address)
  //   ).revertedWith("Ownable: caller is not the owner");
  // });
});

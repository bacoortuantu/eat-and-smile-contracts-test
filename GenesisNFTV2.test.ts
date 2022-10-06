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

describe("GenesisNFTV2 Contract", function () {
  let owner: SignerWithAddress,
    alice: SignerWithAddress,
    bob: SignerWithAddress,
    carol: SignerWithAddress;

  //   let vault: Contract;
  let token: Contract;
  let genesisNft: Contract;
  let nothingContract: Contract;

  beforeEach(async () => {
    await ethers.provider.send("hardhat_reset", []);
    [owner, alice, bob, carol] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Eatereum");
    token = await Token.deploy();

    const GenesisNFT = await ethers.getContractFactory("GenesisNFT");
    genesisNft = await GenesisNFT.deploy("GenesisNFT", "GNFT");

    const NothingContract = await ethers.getContractFactory("Nothing");
    nothingContract = await NothingContract.deploy();

    // console.log({
    //   owner: owner.address,
    //   token: token.address,
    //   genesisNft: genesisNft.address,
    //   nothingContract: nothingContract.address,
    // });
  });

  // it("should be good mood", () => {
  //   expect(1).equal(1);
  // });

  // safeTransferFrom
  // it("Should transfer by approved address to another", async function () {
  //   // transfer to a contract
  //   await genesisNft.batchMint(alice.address, 1, 1);
  //   await genesisNft.connect(alice).approve(bob.address, 1);
  //   //
  //   await genesisNft
  //     .connect(bob)
  //     .transferFrom(alice.address, nothingContract.address, 1);
  //   expect(await genesisNft.balanceOf(nothingContract.address)).equal(1);
  // });

  // template
  // it("Should...", async function () {
  //   await genesisNft.setType(1, token.address, 1, 100, 1);
  //   await expect(
  //     genesisNft.connect(alice).setType(1, token.address, 1, 100, 1)
  //   ).revertedWith("Ownable: caller is not the owner");
  // });

  // setType (owner/others)
  // it("Owner can set type, others cannot", async function () {
  //   await genesisNft.setType(1, token.address, 1, 100, 1);
  //   await expect(
  //     genesisNft.connect(alice).setType(1, token.address, 1, 100, 1)
  //   ).revertedWith("Ownable: caller is not the owner");
  //   const data = await genesisNft.getTypeNFT(1);
  //   console.log(data);
  // });

  // batchMint
  // it("Should be minted successfully by owner, fail by others", async function () {
  //   await genesisNft.batchMint(alice.address, 1, 1);
  //   expect(await genesisNft.ownerOf(1)).equal(alice.address);
  //   await expect(
  //     genesisNft.connect(alice).batchMint(bob.address, 1, 1)
  //   ).revertedWith("Ownable: caller is not the owner");
  // });

  // it("Should be minted fail by owner, because invalid amount out of transaction gas", async function () {
  //   await genesisNft.batchMint(alice.address, 1, 10000000000);
  // });

  // burn (owner, approved address, others)
  // it("Should be burned by owner or approved address, and others cannot", async function () {
  //   // mint alice nft 1, 2
  //   await genesisNft.batchMint(alice.address, 1, 2);
  //   expect(await genesisNft.ownerOf(1)).equal(alice.address);
  //   expect(await genesisNft.ownerOf(2)).equal(alice.address);
  //   expect(await genesisNft.balanceOf(alice.address)).equal(2);

  //   // alice burn nft 1
  //   await genesisNft.connect(alice).burn(1);
  //   expect(await genesisNft.balanceOf(alice.address)).equal(1);

  //   // alice approve bob nft 2
  //   await genesisNft.connect(alice).approve(bob.address, 2);

  //   // carol burn nft 2, but fail
  //   await expect(genesisNft.connect(carol).burn(2)).revertedWithCustomError(
  //     genesisNft,
  //     "ERC721Burnable__OnlyOwnerOrApproved"
  //   );
  //   expect(await genesisNft.balanceOf(alice.address)).equal(1);

  //   // bob burn nft 2
  //   await genesisNft.connect(bob).burn(2);
  //   expect(await genesisNft.balanceOf(alice.address)).equal(0);
  // });

  // renounceOwnership
  // it("Should remove owner's ownership, owner cannot do only owner thing", async function () {
  //   await genesisNft.connect(owner).renounceOwnership();

  //   // owner cannot do anything after renounceOwnership
  //   await expect(
  //     genesisNft.connect(owner).batchMint(bob.address, 1, 1)
  //   ).to.revertedWith("Ownable: caller is not the owner");
  // });

  // transferOwnership
  // it("Should transfer ownership to alice, alice is contract's owner", async function () {
  //   await genesisNft.connect(owner).transferOwnership(alice.address);

  //   // owner cannot do anything after renounceOwnership
  //   await expect(
  //     genesisNft.connect(owner).batchMint(bob.address, 1, 1)
  //   ).to.revertedWith("Ownable: caller is not the owner");

  //   // alice can
  //   await genesisNft.connect(alice).batchMint(bob.address, 1, 1);
  //   expect(await genesisNft.balanceOf(bob.address)).equal(1);
  // });

  // transferFrom
  // it("Should transfer by approved address to another", async function () {
  //   await genesisNft.batchMint(alice.address, 1, 1);
  //   await genesisNft.connect(alice).approve(bob.address, 1);
  //   await genesisNft.connect(bob).transferFrom(alice.address, carol.address, 1);
  //   expect(await genesisNft.balanceOf(carol.address)).equal(1);
  // });

  // setApprovalForAll
  // it("Should transfer by approvalForAll address to another", async function () {
  //   await genesisNft.batchMint(alice.address, 1, 2);
  //   // alice setApprovalForAll for bob
  //   await genesisNft.connect(alice).setApprovalForAll(bob.address);

  //   await genesisNft.connect(bob).transferFrom(alice.address, carol.address, 1);
  //   expect(await genesisNft.balanceOf(carol.address)).equal(1);
  // });

  // setCreator
  // it("Should set creator by owner, fail by others", async function () {
  //   await genesisNft.setCreator(alice.address);
  //   expect(await genesisNft.creator()).equal(alice.address);

  //   await expect(
  //     genesisNft.connect(alice).setCreator(bob.address)
  //   ).revertedWith("Ownable: caller is not the owner");
  // });

  // setBeneficiary
  // it("Should set beneficiary by owner, fail by others", async function () {
  //   await genesisNft.setBeneficiary(alice.address);
  //   expect(await genesisNft.beneficiary()).equal(alice.address);

  //   await expect(
  //     genesisNft.connect(alice).setBeneficiary(bob.address)
  //   ).revertedWith("Ownable: caller is not the owner");
  // });

  // setBaseURI
  // it("Should set base url by owner, fail by others", async function () {
  //   await genesisNft.setBaseURI(
  //     "https://dev-eatsmile-api.w3w.app/nfts/0xa8e5a9d39684c86dcf3f1f3ebe485d1f80da5268"
  //   );
  //   expect(await genesisNft.baseURI()).equal(
  //     "https://dev-eatsmile-api.w3w.app/nfts/0xa8e5a9d39684c86dcf3f1f3ebe485d1f80da5268"
  //   );
  //   await expect(
  //     genesisNft
  //       .connect(alice)
  //       .setBaseURI(
  //         "https://dev-eatsmile-api.w3w.app/nfts/0xa8e5a9d39684c86dcf3f1f3ebe485d1f80da5268"
  //       )
  //   ).revertedWith("Ownable: caller is not the owner");
  // });

  // setUser
  //  permit - invalid deadline
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
});

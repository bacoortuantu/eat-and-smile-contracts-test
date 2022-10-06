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

async function getPermitSignatureToken(
  signer: any,
  token: any,
  spender: string,
  value: number,
  deadline: number
) {
  const [nonce, name, version, chainId] = await Promise.all([
    token.nonces(signer.address),
    "Eatereum", //token.name(),
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

//
const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc.ankr.com/avalanche_fuji"
);
const wallet = new ethers.Wallet(
  "46ba27be55a1de5320c6989bae417d3807e6511ace42f986b9916ee82647febf" //f6
);
const account = wallet.connect(provider);

const tokenAddress = "0xa21f256529C2C2432ca505bC5C44431E56E97a96";
const tokenContract = new ethers.Contract(
  tokenAddress,
  ["function nonces(address owner) public view returns (uint256)"],
  account
);
console.log({
  account: account.address,
  tokenContract: tokenContract.address,
});
//
describe("EeatereumV2 Contract", function () {
  let owner: SignerWithAddress,
    alice: SignerWithAddress,
    bob: SignerWithAddress,
    carol: SignerWithAddress;

  beforeEach(async () => {
    await ethers.provider.send("hardhat_reset", []);
    [owner, alice, bob, carol] = await ethers.getSigners();
  });
  it("should be show erc20 permit", async () => {
    const spender = "0x09c65020750dAd8f6A80FA58cab14949Cab64883";

    const { v, r, s } = await getPermitSignatureToken(
      account,
      tokenContract,
      spender,
      1000,
      1665087502
    );
    console.log({ v, r, s });
  });
});

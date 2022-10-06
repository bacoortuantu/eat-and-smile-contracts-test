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

// async function getPermitSignatureNFT(signer, nft, spender, tokenId, deadline) {
//   const [nonce, name, version, chainId] = await Promise.all([
//     nft.nonce(tokenId),
//     "GenesisNFT",
//     "1",
//     signer.getChainId(),
//   ]);
//   console.log({
//     nonce: nonce.toString(),
//     name,
//     version,
//     chainId,
//   });
//   //   return nft.nonces;
//   return ethers.utils.splitSignature(
//     await signer._signTypedData(
//       {
//         name,
//         version,
//         chainId,
//         verifyingContract: nft.address,
//       },
//       {
//         Permit: [
//           {
//             name: "spender",
//             type: "address",
//           },
//           {
//             name: "tokenId",
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
//         spender,
//         tokenId: tokenId.toString(),
//         nonce: nonce.toString(),
//         deadline,
//       }
//     )
//   );
// }

// //
// const provider = new ethers.providers.JsonRpcProvider(
//   "https://rpc.ankr.com/avalanche_fuji"
// );
// const wallet = new ethers.Wallet(
//   "991e5b5dd39f2591926a2412c784fcfb3477617bf3c300dbd3629ba830b195da"
// );
// const account = wallet.connect(provider);
// const nftAddress = "0xa8E5a9D39684c86DCF3F1F3eBe485d1f80da5268";
// const nftContract = new ethers.Contract(
//   nftAddress,
//   ["function nonce(uint256 tokenId) external view returns(uint256)"],
//   account
// );

// console.log({
//   account: account.address,
//   nftContract: nftContract.address,
// });
// //

// describe("GenesisNFT", function () {
//   it("should be good", async () => {
//     const spender = "0x09c65020750dad8f6a80fa58cab14949cab64883";

//     const { v, r, s } = await getPermitSignatureNFT(
//       account,
//       nftContract,
//       spender,
//       2180,
//       1
//     );
//     console.log({ v, r, s });
//   });
// });

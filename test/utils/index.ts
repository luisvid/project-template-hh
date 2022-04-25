import { ethers } from 'hardhat';
import { BigNumberish } from "ethers";


// Parse the etherString representation of ether into a 
// BigNumber instance of the amount of wei.
export const toWei = (value: { toString: () => string; }) =>
  ethers.utils.parseEther(value.toString());

// Format an amount of wei into a decimal string representing the amount of ether.
export const fromWei = (value: BigNumberish) =>
  ethers.utils.formatEther(
    typeof value === "string" ? value : value.toString()
  );

// mine n blocks
export async function mineNBlocks(n: number): Promise<void> {
  await ethers.provider.send("hardhat_mine", ['0x' +n.toString(16)]);
}

// Increase time in seconds 
export async function increaseBlockTime(seconds: number): Promise<void> {
  await ethers.provider.send("evm_increaseTime", [seconds]);
  await ethers.provider.send("evm_mine", []);
}

// increase and return block timestamp in n hours
export async function increaseTimeStampHours(hours: number): Promise<number> {
  const startBlock = await ethers.provider.getBlock('latest');
  const dateStart = new Date(startBlock.timestamp * 1000);
  let dateEnd = new Date();
  dateEnd.setHours(dateStart.getHours() + hours);
  return Math.round(dateEnd.getTime() / 1000.0);
}

// increase and return block timestamp in n days
export async function increaseTimeStampDays(days: number): Promise<number> {
  const startBlock = await ethers.provider.getBlock('latest');
  const dateStart = new Date(startBlock.timestamp * 1000);
  let dateEnd = new Date();
  dateEnd.setDate(dateStart.getDate() + days)
  return Math.round(dateEnd.getTime() / 1000.0);

}

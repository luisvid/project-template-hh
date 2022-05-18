import { ethers } from 'hardhat';
import { BigNumberish } from "ethers";


/**
 * Parse the etherString representation of ether into a 
 * BigNumber instance of the amount of wei.
 * @param value - { toString: () => string; }
 */
export const toWei = (value: { toString: () => string; }) =>
  ethers.utils.parseEther(value.toString());


/**
 * Format an amount of wei into a decimal string representing the amount of ether.
 * @param {BigNumberish} value - BigNumberish
 */
export const fromWei = (value: BigNumberish) =>
  ethers.utils.formatEther(
    typeof value === "string" ? value : value.toString()
  );

/**
 * It mines n blocks
 * @param {number} n - number - The number of blocks to mine.
 */
export async function mineNBlocks(n: number): Promise<void> {
  await ethers.provider.send("hardhat_mine", ['0x' + n.toString(16)]);
}

/**
 * It increases the block time by the number of seconds passed in as an argument
 * @param {number} seconds - The number of seconds to increase the block time by.
 */
export async function increaseBlockTime(seconds: number): Promise<void> {
  await ethers.provider.send("evm_increaseTime", [seconds]);
  await ethers.provider.send("evm_mine", []);
}

/**
 * It returns a timestamp that is `hours` hours in the future
 * @param {number} hours - number - The number of hours to increase the timestamp by.
 * @returns The timestamp of the current block plus the number of hours passed in.
 */
export async function increaseTimeStampHours(hours: number): Promise<number> {
  const startBlock = await ethers.provider.getBlock('latest');
  const dateStart = new Date(startBlock.timestamp * 1000);
  let dateEnd = new Date();
  dateEnd.setHours(dateStart.getHours() + hours);
  return Math.round(dateEnd.getTime() / 1000.0);
}

/**
 * It takes a number of days and returns a timestamp that is that many days in the future
 * @param {number} days - number - The number of days to increase the timestamp by.
 * @returns The timestamp of the block in seconds.
 */
export async function increaseTimeStampDays(days: number): Promise<number> {
  const startBlock = await ethers.provider.getBlock('latest');
  const dateStart = new Date(startBlock.timestamp * 1000);
  let dateEnd = new Date();
  dateEnd.setDate(dateStart.getDate() + days)
  return Math.round(dateEnd.getTime() / 1000.0);
}

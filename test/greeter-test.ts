import { expect } from "chai";
import { ethers, deployments, getNamedAccounts, getUnnamedAccounts } from 'hardhat';
import { Greeter } from "../typechain-types";
// import { fromWei, increaseTimeStampDays, toWei } from './utils';

describe("Greeter", function () {
  let named: { [name: string]: string };
  let users: string[];
  let greeter: Greeter;

  it("Deploys contract", async function () {
    await deployments.fixture(["greeter"]);

    // Get accounts
    named = await getNamedAccounts();
    users = await getUnnamedAccounts();

    // Get contracts
    greeter = await ethers.getContract("Greeter");

    expect(greeter).to.exist;
  });

  it("Should return the new greeting once it's changed", async function () {
    expect(
      await greeter.greet()
    ).to.equal("Hi!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // Wait until the transaction is mined
    await setGreetingTx.wait();

    expect(
      await greeter.greet()
    ).to.equal("Hola, mundo!");
  });
});

import { BOND_IDL } from "../src";
import { expect } from "chai";

describe("IDL Tests", () => {
  it("should return Bond IDL ", () => {
    expect(BOND_IDL).to.not.be.undefined;
  });
  expect(BOND_IDL.name).to.be.equal("bond");
  expect(BOND_IDL.errors.length).to.be.greaterThan(0);
  expect(BOND_IDL.accounts.length).to.be.greaterThan(0);
  expect(BOND_IDL.types.length).to.be.greaterThan(0);
  expect(BOND_IDL.instructions.length).to.be.greaterThan(0);
});

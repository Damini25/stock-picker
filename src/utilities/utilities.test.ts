import { hasKeys } from "./utilities";

/**
 * these below test cases should be checked
 * 1. check for hasKeys handler
 */

describe("[utilities] - test cases", () => {

  it("1. check for hasKeys handler", () => {
    expect(hasKeys({})).toBe(false);
    expect(hasKeys(null)).toBe(false);
    expect(hasKeys(undefined)).toBe(false);
    expect(hasKeys('')).toBe(false);
    expect(hasKeys({a:1})).toBe(true);
  });

});

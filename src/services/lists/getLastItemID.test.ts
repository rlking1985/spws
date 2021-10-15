import { SpwsError } from "../../classes";
import getLastItemID from "./getLastItemID";

describe("getLastItemID", () => {
  it("Passes: ID is returned", async () => {
    const res = await getLastItemID("Get List Items Threshold");
    expect(typeof res.data).toBe("number");
    expect(res.data).toBeTruthy();
  });

  it("Errors: List has no items", async () => {
    let res;
    try {
      res = await getLastItemID("Get List Items Empty");
    } catch (e) {
      const error: SpwsError = e;
      expect(error.message).toMatch(/Unable to get last item ID. No items were returned/i);
    }
    expect(res).toBeUndefined();
  });

  it("Errors: list does not exist", async () => {
    let res;
    try {
      res = await getLastItemID("List Does Not Exist");
    } catch (e) {
      const error: SpwsError = e;
      expect(error.message).toMatch(/The page you selected contains a list that does not exist./i);
    }
    expect(res).toBeUndefined();
  });
});

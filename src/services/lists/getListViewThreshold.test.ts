import { SpwsError } from "../../classes";
import getListViewThreshold from "./getListViewThreshold";

describe("getListViewThreshold", () => {
  it("Passes: Threshold is returned", async () => {
    const res = await getListViewThreshold("Get List Items Threshold");
    expect(res.data).toBe(process.env.TEST_LIST_VIEW_THRESHOLD);
  });

  it("Errors: List not found", async () => {
    let res;
    try {
      res = await getListViewThreshold("Get List Items - Not Found");
    } catch (e) {
      const error: SpwsError = e;
      expect(error.message).toMatch(
        /The page you selected contains a list that does not exist/i
      );
    }
    expect(res).toBeUndefined();
  });
});

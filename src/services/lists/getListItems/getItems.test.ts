import { SpwsError } from "../../../classes";
import getItems from "./getItems";

describe("getItems", () => {
  it("Passes: has no errors", async () => {
    const res = await getItems([{ listName: "Get List Items" }]);
  });

  it("Errors: Incorrect arg type", async () => {
    try {
      //@ts-expect-error
      const res = await getItems("Get List Items");
      expect(res).toBeUndefined;
    } catch (e) {
      const error: SpwsError = e;
      expect(error.message).toMatch(
        /Unable to getItems. Expect array but received string/i
      );
    }
  });

  it("Errors: Incorrect arg type", async () => {
    try {
      const res = await getItems([]);
      expect(res).toBeUndefined;
    } catch (e) {
      const error: SpwsError = e;
      expect(error.message).toMatch(
        /Unable to getItems. Received an empty array/i
      );
    }
  });
});

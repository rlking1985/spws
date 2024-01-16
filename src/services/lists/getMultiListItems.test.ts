import { SpwsError } from "../../classes";
import getMultiListItems from "./getMultiListItems";

describe("getItems", () => {
  it("Passes: has no errors", async () => {
    const res = await getMultiListItems([
      { listName: "Get List Items" },
      { listName: "Get List Items 1" },
    ]);

    // Expect data to be an of objects
    res.data.every((item) => expect(item.ID).toBeDefined());

    // Expect all responses to have length of 2
    expect(res.envelope).toHaveLength(2);
    expect(res.responseText).toHaveLength(2);
    expect(res.responseXML).toHaveLength(2);
    expect(res.status).toHaveLength(2);
    expect(res.statusText).toHaveLength(2);
  });

  it("Errors: Incorrect arg type", async () => {
    let res;
    try {
      //@ts-expect-error
      res = await getMultiListItems("Get List Items");
    } catch (e) {
      const error: SpwsError = e;
      expect(error.message).toMatch(/Unable to getItems. Expect array but received string/i);
    }
    expect(res).toBeUndefined;
  });

  it("Errors: Incorrect arg type", async () => {
    try {
      const res = await getMultiListItems([]);
      expect(res).toBeUndefined;
    } catch (e) {
      const error: SpwsError = e;
      expect(error.message).toMatch(/Unable to getItems. Received an empty array/i);
    }
  });
});

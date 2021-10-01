import { defaults } from "../../..";
import updateListItems, { ResponseError } from ".";

describe("Update List Items", () => {
  // Set list namew
  const listName = "Update List Items";
  //
  it("Response should be parsed", async () => {
    const res = await updateListItems({
      listName,
      updates: "",
    });
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data[0].item.Title).toBe("Demo");
  });
});

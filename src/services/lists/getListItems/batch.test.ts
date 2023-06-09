import CamlBuilder from "camljs";
import getListItems from "./";
import getList from "../getList";

describe("getListItems: Batch Tests", () => {
  it("Should work", async () => {
    // Set list name
    const listName = "Get List Items Threshold";

    // Get list for the item count
    const { data: list } = await getList(listName);

    // Send test request
    const res = await getListItems(listName, {
      fields: ["Modified", "Editor"],
      query: new CamlBuilder().Where().DateField("Modified").IsNotNull().ToString(),
      batch: true,
    });

    // The response should have all the items in the list
    expect(res.data.length).toBe(parseInt(list.ItemCount!));
  }, 45000);
});

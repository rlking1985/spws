import CamlBuilder from "camljs";
import getListItems from "./";
import getList from "../getList";

describe("getListItems: Batch Tests", () => {
  // This has not been implemented 
  xit("Gets List Items with batching and throttled columns", async () => {
    const listName = "Get ListI tems Threshold And Columns";

    // Create fields array
    const fields = ["Modified", "Editor"];

    // Add 10 Date and User fields (these exist in the list)
    for (let i = 0; i <= 3; i++) fields.push(`Date${i}`, `User${i}`);

    // Send test request
    const res = await getListItems(listName, {
      fields,
      query: new CamlBuilder()
        .Where()
        .DateField("Modified")
        .IsNotNull()
        .ToString(),
      batch: true,
    });

    console.log("res.data[0] :>> ", res.data[0]);
  }, 50000);
  it("Get List Items Threshold", async () => {
    // Set list name
    const listName = "Get List Items Threshold";

    // Get list for the item count
    const { data: list } = await getList(listName);

    // Send test request
    const res = await getListItems(listName, {
      fields: ["Modified", "Editor"],
      query: new CamlBuilder()
        .Where()
        .DateField("Modified")
        .IsNotNull()
        .ToString(),
      batch: true,
    });

    // The response should have all the items in the list
    expect(res.data.length).toBe(parseInt(list.ItemCount!));
  }, 45000);

  it("Get List Items 1 Item with batching", async () => {
    const listName = "Get List Items 1 Item";

    // Get list for the item count
    const { data: list } = await getList(listName);

    // Send test request
    const res = await getListItems(listName, {
      fields: ["Modified", "Editor"],
      query: new CamlBuilder()
        .Where()
        .DateField("Modified")
        .IsNotNull()
        .ToString(),
      batch: true,
    });

    // The response should have all the items in the list
    expect(res.data.length).toBe(parseInt(list.ItemCount!));
  });

  it("Get List Items 0 Item with batching", async () => {
    const listName = "Get List Items No Items";

    // Get list for the item count
    const { data: list } = await getList(listName);

    // Send test request
    const res = await getListItems(listName, {
      fields: ["Modified", "Editor"],
      query: new CamlBuilder()
        .Where()
        .DateField("Modified")
        .IsNotNull()
        .ToString(),
      batch: true,
    });

    // The response should have all the items in the list
    expect(res.data.length).toBe(parseInt(list.ItemCount!));
  });

  it("Get batch updates", async () => {
    // Set list name
    const listName = "Get List Items Threshold";

    // Get list for the item count
    const { data: list } = await getList(listName);

    // Get batches (list view threshold / 2000)
    const batchCount = Math.ceil(
      +list.ItemCount! / +list.MaxItemsPerThrottledOperation!
    );

    // Send test request
    const res = await getListItems(listName, {
      fields: ["Modified", "Editor"],
      query: new CamlBuilder()
        .Where()
        .DateField("Modified")
        .IsNotNull()
        .ToString(),
      batch: true,
      onBatchStart: (total) => expect(total).toBe(batchCount),
      onBatchStep: ({ index, total }) => {
        expect(index).toBeLessThanOrEqual(total);
        expect(total).toBe(batchCount);
      },
    });
  }, 30000);
});

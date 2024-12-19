import getVersionCollection from "./getVersionCollection";

describe("getVersionCollection", () => {
  it("getVersionCollection has no errors", async () => {
    const res = await getVersionCollection({
      listName: "Get Versions",
      field: "Title",
      ID: "1",
    });

    expect(res.data.length).toBeGreaterThan(0);
    expect(Object.keys(res.data[0])).toEqual(["Title", "Modified", "Editor"]);
    expect(Object.keys(res.data[0].Editor)).toEqual([
      "ID",
      "label",
      "value",
      "loginName",
      "email",
      "sipAddress",
    ]);
  });
});

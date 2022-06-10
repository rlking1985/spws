import getView from "./getView";

describe("getView", () => {
  it("getView has no errors", async () => {
    const res = await getView("Get View");
    expect(res.data.ViewFields.length > 0).toBeTruthy();
  });
});

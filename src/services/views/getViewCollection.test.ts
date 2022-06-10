import getViewCollection from "./getViewCollection";

describe("getViewCollection", () => {
  it("getViewCollection has no errors", async () => {
    const res = await getViewCollection("Get View Collection");
    expect(res.responseXML).toBeTruthy();
    expect(res.status).toBe(200);
    expect(res.data.length).toBeTruthy();
  });
});

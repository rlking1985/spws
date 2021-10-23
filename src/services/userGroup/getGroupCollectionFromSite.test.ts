import getGroupCollectionFromSite from "./getGroupCollectionFromSite";
import { SpwsError } from "../../classes";

describe("getGroupCollectionFromSite", () => {
  it("getGroupCollectionFromSite type is correct", async () => {
    const res = await getGroupCollectionFromSite();

    expect(res.data[0]).toEqual(
      expect.objectContaining({
        ID: expect.any(String),
        Name: expect.any(String),
        Description: expect.any(String),
        OwnerIsUser: expect.any(Boolean),
        OwnerID: expect.any(Number),
      })
    );
  });

  it("Error when invalid site", async () => {
    try {
      const res = await getGroupCollectionFromSite({ webURL: "invalid" });
      expect(res).toBeFalsy();
    } catch (e) {
      const error = new SpwsError(e);
      expect(error.message).toMatch(/Not Found/i);
    }
  });
});

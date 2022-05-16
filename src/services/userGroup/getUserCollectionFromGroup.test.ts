import getUserCollectionFromGroup from "./getUserCollectionFromGroup";
import { SpwsError } from "../../classes";

describe("getUserCollectionFromGroup", () => {
  fit("getUserCollectionFromGroup type is correct", async () => {
    const res = await getUserCollectionFromGroup("Site Owners");

    expect(res.data[0]).toEqual(
      expect.objectContaining({
        Email: expect.any(String),
        Flags: expect.any(Number),
        ID: expect.any(String),
        IsDomainGroup: expect.any(Boolean),
        IsSiteAdmin: expect.any(Boolean),
        LoginName: expect.any(String),
        Name: expect.any(String),
        Notes: expect.any(String),
        Sid: expect.any(String),
      })
    );
  });

  it("Error when invalid site", async () => {
    try {
      const res = await getUserCollectionFromGroup("Site Owners", { webURL: "invalid" });
      expect(res).toBeFalsy();
    } catch (e) {
      const error = new SpwsError(e);
      expect(error.message).toMatch(/Not Found/i);
    }
  });
});

import getGroupCollectionFromUser from "./getGroupCollectionFromUser";

describe("getGroupCollectionFromUser", () => {
  it("Gets parsed groups", async () => {
    const res = await getGroupCollectionFromUser("drn\\ross.king3");
    expect(res.status).toBe(200);
    expect(res.responseXML).toBeTruthy();
    expect(Array.isArray(res.data)).toBe(true);
  });

  it("Gets unparsed groups", async () => {
    const res = await getGroupCollectionFromUser("drn\\ross.king3", {
      parse: false,
    });
    expect(res.status).toBe(200);
    expect(res.responseXML).toBeTruthy();
    expect(res.data).toBeUndefined();
  });

  it("Error when no user is defined", async () => {
    try {
      // @ts-expect-error
      await getGroupCollectionFromUser();
    } catch (error) {
      expect(error.message).toMatch(/Unable to get current user/i);
    }
  });
});

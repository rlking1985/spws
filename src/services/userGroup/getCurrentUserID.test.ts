import getCurrentUserID from "./getCurrentUserID";

describe("getCurrentUserID", () => {
  it("Get the current user ID with default params", async () => {
    const res = await getCurrentUserID();
    expect(res.data).toBe(process.env.TEST_USER_ID);
  });

  it("Get the current user ID errors with unknown site", async () => {
    try {
      const res = await getCurrentUserID("/sites/other");
      expect(res.data).toBeFalsy();
    } catch (error) {
      expect(error.message).toMatch(/Site not found/i);
    }
  });
});

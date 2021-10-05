import { defaults } from "../..";
import getCurrentUser, { getCurrentUserID } from "./getCurrentUser";

describe("Get Current User", () => {
  it("Current user is received", async () => {
    expect(defaults.currentUser).toBeNull();
    const res = await getCurrentUser();
    expect(res.data.ContentType).toBe("Person");
    expect(res.data.ID).toBe("1");
  });

  it("Current user is from cache", async () => {
    // Expect the default current user to already be loaded
    expect(defaults.currentUser.ID).toBe("1");
    const res = await getCurrentUser();
    expect(res.data.ID).toBe("1");
  });

  it("User with other credentials is received", async () => {
    // Expect the current user to still be "1"
    expect(defaults.currentUser.ID).toBe("1");

    // Send request for another user credentials
    const res = await getCurrentUser({
      username: process.env.TEST_USER_VISITOR,
      password: process.env.TEST_USER_PASSWORD,
    });

    // Expect the correct account to be returned
    expect(
      res.data.Account.toLowerCase().includes(process.env.TEST_USER_VISITOR)
    ).toBe(true);

    // Expect the defaults to have no current user value
    expect(defaults.currentUser).toBeNull();
  });

  it("Invalid user throws error", async () => {
    try {
      await getCurrentUser({
        username: process.env.TEST_USER_VISITOR + "thisWillFail",
        password: process.env.TEST_USER_PASSWORD,
      });
    } catch (error) {
      expect(error.message).toMatch(/Page does not contain the _spUserId/i);
    }
  });

  it("Get the current user ID with default params", async () => {
    const res = await getCurrentUserID();
    expect(res.data).toBe(process.env.TEST_CURRENT_USER_ID);
  });

  it("Get the current user ID errors with unknown site", async () => {
    try {
      const res = await getCurrentUserID({ webURL: "/sites/other" });
      expect(res.data).toBeFalsy();
    } catch (error) {
      expect(error.message).toMatch(/Site not found/i);
    }
  });
});

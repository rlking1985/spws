import { defaults, getCurrentUser } from "../..";
import { SpwsError } from "../../classes";

describe("Get Current User", () => {
  it("Current user with ID passed", async () => {
    const res = await getCurrentUser({ ID: "14" });
    expect(res.data.ContentType).toBe("Person");
    expect(res.data.ID).toBe("14");
  });

  it("Current user with invalid ID errors", async () => {
    try {
      const res = await getCurrentUser({ ID: "NotARealID" });
      expect(res).toBeFalsy();
    } catch (e) {
      const error: SpwsError = e;
      expect(error.message).toMatch(/Bad Request - Error in query syntax/i);
    }
  });

  it("Current user is received", async () => {
    const res = await getCurrentUser();
    expect(res.data.ContentType).toBe("Person");
    expect(res.data.ID).toBe(process.env.TEST_USER_ID);
  });

  it("Current user is from cache", async () => {
    // Expect the default current user to already be loaded
    expect(defaults.currentUser.ID).toBe(process.env.TEST_USER_ID);
    const res = await getCurrentUser();
    expect(res.data.ID).toBe(process.env.TEST_USER_ID);
  });

  it("User with other credentials is received", async () => {
    // Expect the current user to still be process.env.TEST_USER_ID
    expect(defaults.currentUser.ID).toBe(process.env.TEST_USER_ID);

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
});

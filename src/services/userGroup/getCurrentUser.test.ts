import { defaults, getCurrentUser } from "../..";
import { cache } from "./getCurrentUser";
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
    // Clear cahce
    cache.currentUser[defaults.webURL] = null;

    // Send request as this will cache the result;
    const res = await getCurrentUser();

    // Expect the default current user to already be loaded
    expect(cache.currentUser[defaults.webURL].ID).toBe(process.env.TEST_USER_ID);
    expect(res.data.ID).toBe(process.env.TEST_USER_ID);
  });
});

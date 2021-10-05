import { SpwsError } from "../../classes";
import getListCollection from "./getListCollection";

describe("Get List Collection", () => {
  it("Response should be parsed by using no params", async () => {
    const res = await getListCollection();
    expect(Array.isArray(res.data)).toBeTruthy();
  });

  it("An error is thrown as Bad Request when using a bad URL", async () => {
    try {
      await getListCollection({ webURL: new Date().toISOString() });
    } catch (error: any) {
      let err: SpwsError = error;
      expect(err.statusText).toMatch(/Bad Request/i);
    }
  });

  it("An error is thrown as Not Found relative webURL doesn't exist", async () => {
    try {
      await getListCollection({ webURL: "This Site Does Not Exist" });
    } catch (error: any) {
      let err: SpwsError = error;
      expect(err.statusText).toMatch(/Not Found/i);
    }
  });

  it("An error is thrown as Not Found absolute webURL doesn't exist", async () => {
    try {
      const res = await getListCollection({ webURL: "/sites/other" });
      expect(res).toBeFalsy();
    } catch (e: any) {
      const error: SpwsError = e;
      expect(error.message).toMatch(/Not Found/i);
    }
  });
});

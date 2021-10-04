import { SpwsError } from "../../classes";
import getListCollection from "./getListCollection";

describe("Get List Collection", () => {
  it("Response should be parsed by using no params", async () => {
    const res = await getListCollection();
    expect(Array.isArray(res.data)).toBeTruthy();
  });

  it("An error is thrown as Bad Request when using a bad URL", async () => {
    try {
      await getListCollection(new Date().toISOString());
    } catch (error: any) {
      let err: SpwsError = error;
      expect(err.statusText).toMatch(/Bad Request/i);
    }
  });

  it("An error is thrown as Not Found webURL doesn't exist", async () => {
    try {
      await getListCollection("This Site Does Not Exist");
    } catch (error: any) {
      let err: SpwsError = error;
      expect(err.statusText).toMatch(/Not Found/i);
    }
  });
});

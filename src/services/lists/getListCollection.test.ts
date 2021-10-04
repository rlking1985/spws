import { SpwsError } from "../..";
import getListCollection from "./getListCollection";

describe("Get List Collection", () => {
  it("Response should be XML only (unparsed)", async () => {
    const res = await getListCollection({
      parse: false,
    });

    expect(res.responseXML).toBeTruthy();
    expect(res.status).toBe(200);
    expect(res.data).toBeUndefined();
  });

  it("Response should be parsed by only using default params", async () => {
    const res = await getListCollection();
    expect(Array.isArray(res.data)).toBeTruthy();
  });

  it("Response should be parsed", async () => {
    const res = await getListCollection({ parse: true });
    expect(Array.isArray(res.data)).toBeTruthy();
  });

  it("An error is thrown as Bad Request when the URL is incorrect", async () => {
    let res = null;
    try {
      res = await getListCollection({ webURL: new Date().toISOString() });
    } catch (error: any) {
      let err: SpwsError = error;
      expect(err.statusText).toMatch(/Bad Request/i);
    }
  });
});

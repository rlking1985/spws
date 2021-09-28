import { defaults } from "../..";
import getList from "./getList";

describe("Get List", () => {
  // Set list namew
  const listName = "Get List";

  it("Response should be XML only (unparsed)", async () => {
    const res = await getList({
      listName,
      attributes: ["Title", "Version", "Fields"],
      webURL: defaults.webURL,
    });

    expect(res.responseXML).toBeTruthy();
    expect(res.status).toBe(200);
    expect(res.data?.Title).toBeTruthy();
  });
  return;
  it("Response should be XML only (unparsed)", async () => {
    const res = await getList({
      listName,
      parse: false,
    });

    expect(res.responseXML).toBeTruthy();
    expect(res.status).toBe(200);
    expect(res.data?.Title).toBeUndefined();
  });

  it("Response should be parsed", async () => {
    const res = await getList({ listName, parse: true });

    expect(res.data!.Title).toBe(listName);
  });

  it("List does not exist and should error", async () => {
    try {
      await getList({ listName: "Lorem Ipsum List", parse: false });
    } catch (error: any) {
      expect(error.data.detail).toMatch(/list does not exist/i);
    }
  });

  it("Get list that contains XML in Title", async () => {
    try {
      const res = await getList({ listName: "Get List <XML>" });
      expect(res.status).toBe(200);
    } catch (error: any) {
      expect(error).toBeFalsy();
    }
  });
});

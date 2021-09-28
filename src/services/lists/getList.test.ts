import { defaults } from "../..";
import getList from "./getList";

describe("Get List", () => {
  // Set list namew
  const listName = "Get List";

  it("Response should be parsed with all attributes", async () => {
    const res = await getList({
      listName,
      webURL: defaults.webURL,
    });

    expect(res.responseXML).toBeTruthy();
    expect(res.status).toBe(200);
    expect(Object.keys(res.data).length).toBeGreaterThan(50);
    expect(res.data.Fields.length).toBeGreaterThan(0);
    expect(typeof res.data.Fields[0]).toBe("object");
  });

  it("Response should be parsed with all only Title and Fields", async () => {
    const res = await getList({
      listName,
      webURL: defaults.webURL,
      attributes: ["Title", "Fields"],
    });

    expect(res.responseXML).toBeTruthy();
    expect(res.status).toBe(200);
    expect(Object.keys(res.data).length).toBe(2);
    expect(res.data.Fields.length).toBeGreaterThan(0);
    expect(typeof res.data.Fields[0]).toBe("object");
  });

  it("Response should be parsed with all only Titles", async () => {
    const res = await getList({
      listName,
      webURL: defaults.webURL,
      attributes: ["Title"],
    });

    expect(res.responseXML).toBeTruthy();
    expect(res.status).toBe(200);
    expect(Object.keys(res.data).length).toBe(1);
    expect(res.data.Title).toBe(listName);
    expect(res.data.Fields).toBeUndefined();
  });

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

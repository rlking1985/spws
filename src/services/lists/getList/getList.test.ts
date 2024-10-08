import { defaults, getList } from "../../..";
import { SpwsError } from "../../../classes";

describe("Get List", () => {
  // Set list namew
  const listName = "Get List";

  it("Multiple Choice fields have choices", async () => {
    const res = await getList(listName, {
      webURL: defaults.webURL,
    });
    const field = res.data.Fields!.find(({ StaticName }) => StaticName === "MultipleReason")!;
    expect(res.responseXML).toBeTruthy();
    expect(res.status).toBe(200);
    expect(field.Choices).toHaveLength(3);
  });

  it("Default values are loaded", async () => {
    const res = await getList(listName, {
      webURL: defaults.webURL,
    });

    // Get the field
    const field = res.data.Fields!.find(({ StaticName }) => StaticName === "Gender")!;

    expect(res.responseXML).toBeTruthy();
    expect(res.status).toBe(200);
    expect(field.Default).toMatch(/Male/i);
  });

  it("Validation values are loaded", async () => {
    const res = await getList(listName, {
      webURL: defaults.webURL,
    });

    // Get the field
    const field = res.data.Fields!.find(({ StaticName }) => StaticName === "FavouriteColor")!;

    expect(res.responseXML).toBeTruthy();
    expect(res.status).toBe(200);
    expect(field.Validation).toMatch(/<Validation/i);
  });

  it("Formula values are loaded", async () => {
    const res = await getList(listName, {
      webURL: defaults.webURL,
    });

    // Get the field
    const field = res.data.Fields!.find(({ StaticName }) => StaticName === "CalculatedField")!;

    expect(res.responseXML).toBeTruthy();
    expect(res.status).toBe(200);
    expect(field.Formula).toMatch(/<Formula/i);
  });

  it("Response should be parsed with all attributes", async () => {
    const res = await getList(listName, {
      webURL: defaults.webURL,
    });
    expect(res.responseXML).toBeTruthy();
    expect(res.status).toBe(200);
    expect(Object.keys(res.data).length).toBeGreaterThan(50);
    expect(res.data.Fields!.length).toBeGreaterThan(0);
    expect(typeof res.data.Fields![0]).toBe("object");
  });

  it("Response should be parsed with all only Title and Fields", async () => {
    const res = await getList(listName, {
      webURL: defaults.webURL,
      attributes: ["Title", "Fields"],
    });

    expect(res.responseXML).toBeTruthy();
    expect(res.status).toBe(200);
    expect(Object.keys(res.data).length).toBe(2);
    expect(res.data.Fields!.length).toBeGreaterThan(0);
    expect(typeof res.data.Fields![0]).toBe("object");
  });

  it("Response should be parsed with all only Titles", async () => {
    const res = await getList(listName, {
      webURL: defaults.webURL,
      attributes: ["Title"],
    });

    expect(res.responseXML).toBeTruthy();
    expect(res.status).toBe(200);
    expect(Object.keys(res.data).length).toBe(1);
    expect(res.data.Title).toBe(listName);
    expect(res.data.Fields).toBeUndefined();
  });

  it("Request with no options", async () => {
    const res = await getList(listName);

    expect(res.data!.Title).toBe(listName);
  });

  it("List does not exist and should error", async () => {
    try {
      await getList("Lorem Ipsum List");
    } catch (error: any) {
      const err: SpwsError = error;
      expect(err.data!.detail).toMatch(/list does not exist/i);
    }
  });

  it("Get list that contains XML in Title", async () => {
    const res = await getList("Get List <XML>");
    expect(res.status).toBe(200);
  });
});

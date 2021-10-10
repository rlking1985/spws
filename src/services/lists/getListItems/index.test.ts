import { defaults } from "../../..";
import { SpwsError } from "../../../classes";
import getListItems from "./";

describe("getListItems", () => {
  it("Passes: Batching request", async () => {
    const res = await getListItems("Get List Items", { batch: true });
  });

  it("Passes: default options", async () => {
    const res = await getListItems("Get List Items");
    const item = res.data[0];

    expect(res.data.length).toBeGreaterThanOrEqual(1);
    expect(typeof item.ID).toBe("string");
    expect(Object.entries(item).length).toBeGreaterThan(10);

    // Check envelope (case sensitive)
    expect(res.envelope[0]).toMatch(/<listName>Get List Items<\/listName>/);
    expect(res.envelope[0]).toMatch(/<viewName><\/viewName>/);
    expect(res.envelope[0]).toMatch(
      /<query><Query><Query\/><\/Query><\/query>/
    );
    expect(res.envelope[0]).toMatch(
      /<viewFields><ViewFields Properties='True' \/><\/viewFields>/
    );
    expect(res.envelope[0]).toMatch(/<rowLimit>0<\/rowLimit>/);
    expect(res.envelope[0]).toMatch(/<QueryOptions><\/QueryOptions>/);
  });

  it("Passes: Limited Fields", async () => {
    const res = await getListItems("Get List Items", { fields: ["ID"] });
    const item = res.data[0];
    // Expect ID and Encoded Abs URL data to be returned
    expect(Object.keys(item)).toHaveLength(7);
    expect(item.Created).toBeUndefined;
    expect(item.DispFormUrl).toMatch(/http:/i);

    // Check envelope (case sensitive)
    expect(res.envelope[0]).toMatch(
      /<viewFields><ViewFields><FieldRef Name="ID" \/><FieldRef Name="EncodedAbsUrl" \/><\/ViewFields><\/viewFields>/
    );
    // Expect query options to still be empty even though an options object is used
    expect(res.envelope[0]).toMatch(/<QueryOptions><\/QueryOptions>/);
  });

  it("Passes: Fields that don't exist return as empty string", async () => {
    const res = await getListItems("Get List Items", {
      fields: ["ID", "DoesNotExist"],
    });
    expect(res.data[0].DoesNotExist).toBe("");
  });

  it("Passes: Undefined queryOptions", async () => {
    const res = await getListItems("Get List Items", {
      queryOptions: { DatesInUtc: undefined, ExpandUserField: true },
    });

    // DateInUtc is not added to query Options
    expect(res.envelope[0]).toMatch(
      /<queryOptions><QueryOptions><ExpandUserField>true<\/ExpandUserField><\/QueryOptions><\/queryOptions>/
    );
  });

  it("Passes: All Options", async () => {
    const res = await getListItems("Get List Items", {
      fields: ["ID", "Author"],
      webURL: defaults.webURL,
      queryOptions: {
        DatesInUtc: true,
        ExpandUserField: true,
        Folder: "",
        IncludeAttachmentUrls: true,
        IncludeMandatoryColumns: true,
        IncludePermissions: true,
        IncludeAttachmentVersion: true,
        OptimizeLookups: true,
        RemoveInvalidXmlCharacters: true,
      },
    });
    const item = res.data[0];
    // Expect ID and Encoded Abs URL data to be returned
    expect(Object.keys(item)).toHaveLength(8);
    expect(item.Created).toBeUndefined;
    expect(item.DispFormUrl).toMatch(/http:/i);

    // Expect query options to be exactly
    expect(res.envelope[0]).toMatch(
      /<queryOptions><QueryOptions><DatesInUtc>true<\/DatesInUtc><ExpandUserField>true<\/ExpandUserField><Folder><\/Folder><IncludeAttachmentUrls>true<\/IncludeAttachmentUrls><IncludeMandatoryColumns>true<\/IncludeMandatoryColumns><IncludePermissions>true<\/IncludePermissions><IncludeAttachmentVersion>true<\/IncludeAttachmentVersion><OptimizeLookups>true<\/OptimizeLookups><RemoveInvalidXmlCharacters>true<\/RemoveInvalidXmlCharacters><\/QueryOptions><\/queryOptions>/
    );
  });

  it("Passes: Query works if tags are included", async () => {
    const res = await getListItems("Get List Items", {
      fields: ["Modified", "Editor"],
      query: `<Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">Demo Item</Value></Eq></Where></Query>`,
    });

    expect(res.data).toHaveLength(1);
    expect(res.envelope[0]).toMatch(
      /<query><Query><Where><Eq><FieldRef Name="Title" \/><Value Type="Text">Demo Item<\/Value><\/Eq><\/Where><\/Query><\/query>/
    );
  });

  it("Passes: Query returns no items", async () => {
    const res = await getListItems("Get List Items", {
      fields: ["Modified", "Editor"],
      query: `<Where><Eq><FieldRef Name="ID" /><Value Type="Text">0</Value></Eq></Where>`,
    });

    expect(res.data).toHaveLength(0);
    expect(res.envelope[0]).toMatch(
      /<query><Query><Where><Eq><FieldRef Name="ID" \/><Value Type="Text">0<\/Value><\/Eq><\/Where><\/Query><\/query>/
    );
  });

  it("Passes: Query returns 1 item", async () => {
    const res = await getListItems("Get List Items", {
      fields: ["Modified", "Editor"],
      query: `<Where><Eq><FieldRef Name="Title" /><Value Type="Text">Demo Item</Value></Eq></Where>`,
    });

    expect(res.data).toHaveLength(1);
  });

  it("Passes: Query returns mutliple items", async () => {
    const res = await getListItems("Get List Items", {
      fields: ["Modified", "Editor"],
      query: `<Where><Contains><FieldRef Name="Title" /><Value Type="Text">Contains Test </Value></Contains></Where>`,
    });

    expect(res.data).toHaveLength(3);
  });

  // This is important as it's better to error then return all items
  it("Errors: Invalid Query", async () => {
    let res;
    try {
      res = await getListItems("Get List Items", {
        query: `<Where><Eq><FieldRef Name="FieldDostNotExist" /><Value Type="Text">Demo Item</Value></Eq></Where>`,
      });
    } catch (e) {
      const error: SpwsError = e;
      expect(error.message).toMatch(
        /One or more field types are not installed properly. Go to the list settings page to delete these fields./i
      );
    }
    expect(res).toBeUndefined();
  });

  it("Errors: Incorrect listName type", async () => {
    let res;
    try {
      // @ts-expect-error
      res = await getListItems({ listName: "Get List Items" });
    } catch (e) {
      const error: SpwsError = e;
      expect(error.message).toMatch(
        /Expected string for listName but received object/i
      );
    }
    expect(res).toBeUndefined();
  });

  it("Errors: Incorrect listName type", async () => {
    let res;
    try {
      res = await getListItems("");
    } catch (e) {
      const error: SpwsError = e;
      expect(error.message).toMatch(
        /Expected listName to be a valid string but received an empty string/i
      );
    }
    expect(res).toBeUndefined();
  });

  it("Errors: Incorrect fields", async () => {
    let res;
    try {
      // @ts-expect-error
      res = await getListItems("Get List Items", { fields: { Title: null } });
    } catch (e) {
      const error: SpwsError = e;
      expect(error.message).toMatch(
        /Expected fields to be an array but recieved object/i
      );
    }
    expect(res).toBeUndefined();
  });

  it("Errors: List View Threshold Exceeded", async () => {
    let res;
    try {
      res = await getListItems("Get List Items Threshold");
    } catch (e) {
      const error: SpwsError = e;
      expect(error.message).toMatch(
        /The attempted operation is prohibited because it exceeds the list view threshold enforced by the administrator./i
      );
    }
    expect(res).toBeUndefined();
  }, 600000);
});

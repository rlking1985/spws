import { SpwsError } from "../../classes";
import updateList from "./updateList";
import getList from "./getList";

describe("Get List Collection", () => {
  const listName = "UpdateList";

  beforeAll(async () => {
    // Get list
    const res = await getList(listName, { attributes: ["Fields"] });

    // Get custom columns
    const customColumns = res.data
      .Fields!.filter(({ StaticName }) => StaticName !== "Title")
      .map(({ StaticName }) => StaticName);

    // Delete all custom columns
    await updateList({ listName, deleteFields: customColumns });
  });

  it("Test", async () => {
    const res = await updateList({
      listName: "UpdateList",
      listProperties: {
        EnableAttachments: true,
        EnableVersioning: true,
        Hidden: false,
        Ordered: true,
        Direction: "LTR",
        Description: new Date().toISOString(),
      },
      updateFields: [
        {
          StaticName: "Title",
          DisplayName: "Title",
          Type: "Text",
          // @ts-ignore
          // AllowDeletion: false, // Y
        },
      ],
      newFields: [
        {
          StaticName: "TextField",
          DisplayName: "01) Text Field",
          Type: "Text",
          // Filterable: false, // Y
          Sortable: false,
          // Sealed: true, // Y
          // LinkToItem: true, // Y
          // Hidden: true, // Y
          // ReadOnly: false,
          // Indexed: true,
          // Hidden: true, // Y
          // EnforceUniqueValues: true, // Y
          // EnableLookup: true, // N
          // DisplayImage // N
          // Dir: "RTL", // Y
          // Customization: "Something", // N
          // AllowHyperlink: false, // N
          // AllowDeletion: false, // Y
          // CanToggleHidden: false, // N
          // ClassInfo: "demo-class", // N
          // ColName // Do not use
          // ColName2 // Do not use
        },
        {
          StaticName: "NumberField",
          DisplayName: "02) Number Field",
          Type: "Number",
          // @ts-ignore
          // Decimals: 0, // Y
          // Commas: false, // N
          // Viewable: true, // N
        },
        {
          StaticName: "NotePlaintTextField",
          DisplayName: "03) Note Plaint Text Field",
          Type: "Note",
          // RichText: true,
          // RichTextMode: "FullHtml", // Y
          // BaseType // Maybe but do not use
          // AuthoringInfo: "Author Demo", // N
          // AppendOnly: false, // N
          // Required: true, // Y
          // Description: "Demo", // Y
          // NumLines: 3, // Y
          // AllowHyperlink: false, // N
          // HTMLEncode: false, // N
          // Viewable: false, // N
          // AllowDeletion: false, // Y
        },
        {
          StaticName: "04) DateOnly",
          DisplayName: "Date Only",
          Type: "DateTime",
          // CalType: 15 // N
        },
        {
          StaticName: "ChoiceField",
          DisplayName: "05) ChoiceField",
          Type: "Choice",
          FillInChoice: true,
          Choices: ["Demo"],
        },
      ],
    });

    expect(1).toBe(1);
  });
});

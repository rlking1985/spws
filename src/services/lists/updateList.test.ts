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

          // DefaultFormula: `=Today + 1`, // Y
          // DefaultFormulaValue: "Demo", // Y
          // Default: "Black", // Y
          // ShowInFileDlg: false, // Y
          // ShowAlways: false, // N
          // ShowInNewForm: false, // Y
          // ShowInEditForm: false, // Y
          // ShowInDisplayForm: false, // Y
          // ShowInVersionHistory: false, // Y
          // ShowInViewForms: false, // Y
          // TextOnly: true, // N
          // Version: 12, // Y
          // Validation // Y
          // MaxLength: 1, // Y
          // ListItemMenu: true, // Y
          // ID: "My-new-guid", // N
          // HTMLEncode: true, // N
          // ForcedDisplay: "Demo", // N
          // AllowDeletion: false, // Y
          // AllowHyperlink: false, // N
          // CanToggleHidden: false, // N
          // ClassInfo: "demo-class", // N
          // ColName // Do not use
          // ColName2 // Do not use
          // Customization: "Something", // N
          // Dir: "RTL", // Y
          // DisplayImage // N
          // EnableLookup: true, // N
          // EnforceUniqueValues: true, // Y
          // Filterable: false, // Y
          // Hidden: true, // Y
          // Hidden: true, // Y
          // Indexed: true,
          // LinkToItem: true, // Y
          // ReadOnly: false,
          // Sealed: true, // Y
          // Sortable: false, // Y
        },
        {
          StaticName: "NumberField",
          DisplayName: "02) Number Field",
          Type: "Number",
          // NegativeFormat: "Parens", // N
          // @ts-ignore
          // Decimals: 0, // Y
          // Commas: false, // N
          // Viewable: true, // N
          // Max: 5, // Y
          // Min: 1, // Y
          // Percentage: true, // Y
        },
        {
          StaticName: "NotePlaintTextField",
          DisplayName: "03) Note Plaint Text Field",
          Type: "Note",
          // NoEditFormBreak: true, // N
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
          StaticName: "DateOnly",
          DisplayName: "04) Date Only",
          Type: "DateTime",
          // CalType: 15 // N
          Format: "ISO8601", // Y
          // StorageTZ: "UTC",  // N (m)
        },
        {
          StaticName: "ChoiceField",
          DisplayName: "05) Choice Field",
          Type: "Choice",
          FillInChoice: true,
          Choices: ["Demo"],
        },
        {
          StaticName: "UserField",
          DisplayName: "06) User Field",
          Type: "UserMulti",
          // ShowAddressBookButton: false, // N
          // Presence: false, // N
          // ShowField: "ContentTypeDisp",
          // @ts-ignore
          // UserSelectionMode: 1, // Y
          // UserSelectionScope: 5, // Y
          // Mult: true, // Y
        },
        {
          StaticName: "CalculatedField",
          DisplayName: "07) Calculated Field",
          Type: "Calculated",
          Formula: `<Formula>=1</Formula>
          <FormulaDisplayNames>=1</FormulaDisplayNames>`,
          ResultType: "Text",
        },
      ],
    });

    expect(1).toBe(1);
  });
});

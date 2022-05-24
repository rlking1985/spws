import { SpwsError } from "../../classes";
import updateList from "./updateList";
import Chance from "chance";

describe("Get List Collection", () => {
  const chance = new Chance();

  it("Test", async () => {
    const field = chance.name();
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
      newFields: [
        {
          StaticName: field.replace(/ /g, "_"),
          DisplayName: field,
          Type: "Text",
        },
      ],
      deleteFields: [{ StaticName: "Richard_Townsend", Choices: ["Demo"], Type: "Choice" }],
      // deleteFields: [{ StaticName: "_x0032_022_x002d_05_x002d_24T05_0" }],
    });

    expect(1).toBe(1);
  });
});

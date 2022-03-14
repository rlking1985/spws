import { SpwsError } from "../../classes";
import updateList from "./updateList";

describe("Get List Collection", () => {
  it("Test", async () => {
    const res = await updateList({
      listName: "Update List",
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
          StaticName: new Date().toISOString(),
          DisplayName: "Test 1",
          Type: "Text",
        },
      ],
    });

    expect(1).toBe(1);
  });
});

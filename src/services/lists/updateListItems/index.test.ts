import Chance from "chance";
import updateListItems, { ResponseError } from ".";

describe("Update List Items", () => {
  const chance = new Chance();

  // Set list name
  const listName = "Update List Items";

  it("Response should be parsed", async () => {
    const Title = chance.word();
    const res = await updateListItems({
      listName,
      methods: [
        {
          cmd: "New",
          values: {
            Title,
          },
        },
      ],
    });

    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data[0].item.Title).toBe(Title);
  });

  it("Response should error", async () => {
    const res = await updateListItems({
      listName,
      methods: [
        {
          cmd: "Delete",
          values: {},
        },
      ],
    });

    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data[0].errorCode).toBe("0x8102000a");
    expect(res.data[0].status).toBe("error");
  });
});

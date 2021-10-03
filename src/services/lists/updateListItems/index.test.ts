import Chance from "chance";
import updateListItems, { ResponseError, Methods } from ".";

describe("Update List Items: New Items", () => {
  const chance = new Chance();

  // Set list name
  const listName = "Update List Items";
  const Title = chance.word();
  const methods: Methods = [{ command: "New", values: { Title } }];

  it("Illegal characters are escaped", async () => {
    const res = await updateListItems({
      listName,
      methods: [{ command: "New", values: { Title: `<Welcome> & 'Hello"` } }],
      parse: false,
    });

    expect(res[0].data.methods).toHaveLength(0);
    expect(res[0].data.success).toBe(null);
    expect(res[0].responseXML).toBeTruthy();
  });

  it("No parsing, returns empty methods and null success", async () => {
    const res = await updateListItems({
      listName,
      methods,
      parse: false,
    });

    expect(res[0].data.methods).toHaveLength(0);
    expect(res[0].data.success).toBe(null);
    expect(res[0].responseXML).toBeTruthy();
  });

  it("Requests are batched", async () => {
    const batchSize = 2;
    const methods: Methods = [
      { command: "New", values: { Title } },
      { command: "New", values: { Title } },
      { command: "New", values: { Title } },
      { command: "New", values: { Title } },
      { command: "New", values: { Title } },
    ];
    const res = await updateListItems({ listName, batchSize, methods });

    // Expect 3 batches (methods length minus batch size)
    expect(res).toHaveLength(Math.ceil(methods.length / batchSize));
    // Expect status to pass
    expect(res.every(({ data }) => data.success)).toBe(true);
  });

  it("New item with long field name", async () => {
    let res = await updateListItems({
      listName,
      methods: [
        {
          command: "New",
          values: {
            Title,
            TheUsersFirstNameAndLastNameAndAddress:
              chance.name() + " " + chance.address(),
          },
        },
      ],
    });
    // Expect this pass as the field name is trimmed
    expect(res[0].data.success).toBe(true);
  });
});

import Chance from "chance";
import updateListItems, { Methods, Operation } from ".";

type Values = {
  Title?: string;
  ThisIsAExtremelyLongTextFieldNam?: string;
  ThisIsAExtremelyLongTextFieldNam0?: string;
};

// TODO: Add "Update" and "Delete" Commands. This needs to be done after get list items
describe("Update List Items: New Items", () => {
  const chance = new Chance();

  // Set list name
  const listName = "Update List Items";
  const Title = chance.word();
  const methods: Methods = [{ command: "New", values: { Title } }];

  it("32+ Character Field Names are updated", async () => {
    const values: Values = {
      Title: "Testing Field Name 1",
      ThisIsAExtremelyLongTextFieldNam: chance.address(),
      ThisIsAExtremelyLongTextFieldNam0: chance.address(),
    };
    const res = await updateListItems(listName, [{ command: "New", values }], {
      allowLongFieldNames: true,
    });

    expect(res[0].data.methods).toHaveLength(1);
    expect(res[0].data.success).toBe(true);
    expect(res[0].responseXML).toBeTruthy();
  });

  it("Illegal characters are escaped", async () => {
    const res = await updateListItems(listName, [
      { command: "New", values: { Title: `<Welcome> & 'Hello"` } },
    ]);

    expect(res[0].data.methods).toHaveLength(1);
    expect(res[0].data.success).toBe(true);
    expect(res[0].responseXML).toBeTruthy();
  });

  it("Continues on failed method", async () => {
    const res = await updateListItems(listName, [
      ...methods,
      { command: "Update", ID: "0", values: { Title } },
      { command: "Delete", ID: "1" },
    ]);
    // Expect the first batch to have a failed method
    expect(res[0].data.success).toBe(false);
    // Expect the overall status to be 200
    expect(res[0].status).toBe(200);
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
    const res = await updateListItems(listName, methods, { batchSize });

    // Expect 3 batches (methods length minus batch size)
    expect(res).toHaveLength(Math.ceil(methods.length / batchSize));

    // Expect status to pass
    expect(res.every(({ data }) => data.success)).toBe(true);
  });

  it("Requests are batched with callback invoked", async () => {
    const batchSize = 2;
    const methods: Methods = [
      { command: "New", values: { Title } },
      { command: "New", values: { Title } },
      { command: "New", values: { Title } },
      { command: "New", values: { Title } },
      { command: "New", values: { Title } },
    ];

    let results: Operation[] = [];
    await updateListItems(listName, methods, {
      batchSize,
      onBatchComplete: async (result) => {
        results.push(result);
      },
    });

    // Expect 3 batches (methods length minus batch size)
    expect(results).toHaveLength(Math.ceil(methods.length / batchSize));
  });

  it("New item with long field name", async () => {
    let res = await updateListItems(listName, [
      {
        command: "New",
        values: {
          Title,
          TheUsersFirstNameAndLastNameAndAddress: chance.name() + " " + chance.address(),
        },
      },
    ]);
    // Expect this pass as the field name is trimmed
    expect(res[0].data.success).toBe(true);
  });

  it("Number fields can be saved", async () => {
    const res = await updateListItems(listName, [{ command: "New", values: { Age: 5 as any } }]);
    expect(res[0].data.methods).toHaveLength(1);
    expect(res[0].data.success).toBe(true);
    expect(res[0].responseXML).toBeTruthy();
  });

  it("Folders can be created", async () => {
    const res = await updateListItems(listName, [
      { command: "New", values: { BaseName: chance.apple_token(), FSObjType: "1" } },
    ]);

    expect(res[0].data.methods).toHaveLength(1);
    expect(res[0].data.success).toBe(true);
    expect(res[0].responseXML).toBeTruthy();
  });

  it("Errors with invalid methods", async () => {
    try {
      await updateListItems(
        listName,
        // @ts-expect-error
        ["New"]
      );
    } catch (error) {
      expect(error.message).toMatch(/Expected methods to be an array of objects/i);
    }
  });

  it("Errors with invalid onError string", async () => {
    try {
      await updateListItems(
        listName,
        methods,
        // @ts-expect-error
        { onError: "Stop" }
      );
    } catch (error) {
      expect(error.message).toMatch(/Expected onError to be "Continue" or "Return"/i);
    }
  });

  it("Errors with user that does not exist", async () => {
    const res = await updateListItems(
      listName,
      [
        {
          command: "New",
          values: { Title: "Fails as user does not exist", Manager: "-1;#drn\\doesnt.exist" },
        },
      ],
      {
        onBatchComplete: async (result) => {
          expect(result.errors.length).toBeGreaterThan(0);
        },
      }
    );
  });
});

import Chance from "chance";
import updateListItems, { ResponseError, Methods } from ".";

/**
 * To Do
 * handle all test scenarioes
 * Test for fields that are over 32 characters
 * Test for illegal characts
 * Add functionality for batching
 */
describe("Update List Items: New Items", () => {
  const chance = new Chance();

  // Set list name
  const listName = "Update List Items";
  const Title = chance.word();
  const methods: Methods = [{ command: "New", values: { Title } }];

  it("Batches", async () => {
    const methods: Methods = [
      { command: "New", values: { Title } },
      { command: "New", values: { Title } },
      { command: "New", values: { Title } },
      { command: "New", values: { Title } },
      { command: "New", values: { Title } },
    ];
    const res = await updateListItems({ listName, batchSize: 2, methods });
  });

  // it("Response should be parsed", async () => {
  //   const res = await updateListItems({
  //     listName,
  //     methods,
  //   });

  //   console.log(`res.data`, res.data);

  //   expect(Array.isArray(res.data)).toBe(true);
  //   expect(res.data[0].item.Title).toBe(Title);
  // });

  // it("New item with long field name", async () => {
  //   let res = await updateListItems({
  //     listName,
  //     methods: [
  //       {
  //         command: "New",
  //         values: {
  //           TheUsersFirstNameAndLastNameAndAddress:
  //             chance.name() + " " + chance.address(),
  //         },
  //       },
  //     ],
  //   });
  //   // Expect this pass as the field name is trimmed
  //   expect(res.data.success).toHaveLength(1);
  // });

  // it("Update Item", async () => {
  //   const ID = "193";
  //   const res = await updateListItems({
  //     listName,
  //     methods: [{ command: "Update", ID, values: { Title: "Updated" } }],
  //   });
  //   // Expect 1 item in success
  //   expect(res.data.success).toHaveLength(1);
  //   expect(res.data.methods[0].item.ID).toBe(ID);
  // });

  // it("Response should error", async () => {
  //   const res = await updateListItems({
  //     listName,
  //     methods: [
  //       {
  //         command: "New",
  //         values: {
  //           FieldDoesNotExist: Title,
  //         },
  //       },
  //     ],
  //   });

  //   expect(Array.isArray(res.data)).toBe(true);
  //   expect(res.data[0].errorCode).toBe("0x8102000a");
  //   expect(res.data[0].status).toBe("error");
  // });
});

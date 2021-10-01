import getListCollection, { ResponseError } from "./getListCollection";

describe("Get List Collection", () => {
  it("Response should be XML only (unparsed)", async () => {
    const res = await getListCollection({
      parse: false,
    });

    expect(res.responseXML).toBeTruthy();
    expect(res.status).toBe(200);
    expect(res.data).toBeUndefined();
  });

  it("Response should be parsed by only using default params", async () => {
    const res = await getListCollection();
    expect(Array.isArray(res.data)).toBeTruthy();
  });

  it("Response should be parsed", async () => {
    const res = await getListCollection({ parse: true });
    expect(Array.isArray(res.data)).toBeTruthy();
  });

  it("An error is thrown as Bad Request when the URL is incorrect", async () => {
    let res = null;
    try {
      res = await getListCollection({ webURL: new Date().toISOString() });
    } catch (error: any) {
      let err: ResponseError = error;
      expect(err.statusText).toMatch(/Bad Request/i);
    }
  });

  // it("List does not exist and should error", async () => {
  //   try {
  //     await getListCollection({ listName: "Lorem Ipsum List", parse: false });
  //   } catch (error: any) {
  //     expect(error.data.detail).toMatch(/list does not exist/i);
  //   }
  // });

  // it("Get list that contains XML in Title", async () => {
  //   try {
  //     const res = await getListCollection({ listName: "Get List <XML>" });
  //     expect(res.status).toBe(200);
  //   } catch (error: any) {
  //     console.log(`error`, error);
  //   }
  // });
});

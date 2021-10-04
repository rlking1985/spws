import ResponseError from "./responseError";
import { getList } from "../";

describe("Response Error", () => {
  it("Handles generic errors", () => {
    const error = new ResponseError({ message: "Custom error" });
    expect(error.message).toMatch(/custom error/i);
  });

  it("Parses XML to get error data", async () => {
    try {
      await getList({ listName: "This lit does not exist" });
    } catch (e) {
      const error: ResponseError = e;
      expect(error.data.detail).toMatch(/List does not exist/i);
    }
  });
});

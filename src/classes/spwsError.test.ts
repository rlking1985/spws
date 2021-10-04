import SpwsError from "./spwsError";
import { getList } from "..";

describe("Response Error", () => {
  it("Handles generic errors", () => {
    const error = new SpwsError({ message: "Custom error" });
    expect(error.message).toMatch(/custom error/i);
  });

  it("Parses XML to get error data", async () => {
    try {
      await getList("This list does not exist");
    } catch (e) {
      const error: SpwsError = e;
      expect(error.data.detail).toMatch(/List does not exist/i);
    }
  });
});

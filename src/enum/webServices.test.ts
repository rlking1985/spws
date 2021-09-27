import WebServices from "./webServices";

describe("Web Services", () => {
  it("Enum key and props match", () => {
    for (const key in WebServices) {
      expect(key).toBe(WebServices[key]);
    }
  });
});

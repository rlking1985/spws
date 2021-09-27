import escapeXml from "./escapeXml";
const string = "Lorem & Ipsum";

describe("Test Utility: escapeXml", () => {
  const characters = [
    { unescaped: `&`, escaped: `&amp;` },
    { unescaped: `<`, escaped: `&lt;` },
    { unescaped: `>`, escaped: `&gt;` },
    { unescaped: `"`, escaped: `&quot;` },
    { unescaped: `'`, escaped: `&#039;` },
  ];
  it("All XML characters are escaped correctly", () => {
    characters.forEach(({ unescaped, escaped }) => {
      expect(escapeXml(unescaped)).toBe(escaped);
    });
  });

  it("Error is thrown if a non string parameter is used", () => {
    // Define result, this will be checked after try catch and should be null
    let result: any = null;
    try {
      // @ts-expect-error
      result = escapeXml(false);
    } catch (error) {
      expect(error).toBeTruthy();
    }
    expect(result).toBeNull();
  });
});

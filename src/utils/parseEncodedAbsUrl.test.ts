import parseEncodedAbsUrl from "./parseEncodedAbsUrl";

describe("parseEncodedAbsUrl", () => {
  it("parseEncodedAbsUrl has no errors", () => {
    const data = parseEncodedAbsUrl(
      "http://contoso/sites/test/Lists/Announcements/4_.000"
    );
    expect(data.ID).toBe("4");
    expect(data.ListName).toBe("Announcements");
    expect(data.DispFormUrl).toBe(
      "http://contoso/sites/test/Lists/Announcements/DispForm.aspx?ID=4"
    );
    expect(data.EditFormUrl).toBe(
      "http://contoso/sites/test/Lists/Announcements/EditForm.aspx?ID=4"
    );
    expect(data.NewFormUrl).toBe(
      "http://contoso/sites/test/Lists/Announcements/NewForm.aspx"
    );
    expect(data.ListUrl).toBe("http://contoso/sites/test/Lists/Announcements");
  });

  it("Errors when the incorrect string is used", () => {
    try {
      const data = parseEncodedAbsUrl("/sites/test/Lists/Announcements/4_.000");
      expect(data).toBeUndefined();
    } catch (error) {
      expect(error.message).toMatch(
        "The Encoded Absolute URL was not received as it is missing"
      );
    }
  });

  it("Errors when the incorrect string value is used", () => {
    try {
      //@ts-expect-error
      const data = parseEncodedAbsUrl({
        EncodedAbsUrl:
          "http://contoso/sites/test/Lists/Announcements/NewForm.aspx",
      });
      expect(data).toBeUndefined();
    } catch (error) {
      expect(error.message).toMatch(
        "Unable to parse the encoded absolute URL. Expect a string but received object"
      );
    }
  });
});

import parseUserGroupValue from "./parseUserGroupValue";

describe("parseUserGroupValue", () => {
  it("should return an empty array when given an empty string", () => {
    const result = parseUserGroupValue("");
    expect(result).toEqual([]);
  });

  it("should parse user/group string without expanding user fields", () => {
    const input = "9;#Smith, John MR 1;#17;#Williams, Sharon MRS";
    const result = parseUserGroupValue(input);
    expect(result).toEqual([
      { ID: "9", label: "Smith, John MR 1", value: "9;#Smith, John MR 1" },
      {
        ID: "17",
        label: "Williams, Sharon MRS",
        value: "17;#Williams, Sharon MRS",
      },
    ]);
  });

  it("should parse user/group string with expanding user fields", () => {
    const input = "9;#King,, Ross MR 3,#DRN\\ross.king3,#,#,#King,, Ross MR 3";
    const result = parseUserGroupValue(input, { expandUserField: true });

    expect(result).toEqual([
      {
        ID: "9",
        label: "King, Ross MR 3",
        value: "9;#King, Ross MR 3",
        loginName: "DRN\\ross.king3",
        email: "",
        sipAddress: "",
      },
    ]);
  });
});

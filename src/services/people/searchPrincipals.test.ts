import searchPrincipals from "./searchPrincipals";

describe("searchPrincipals", () => {
  it("searchPrincipals has no errors", async () => {
    const res = await searchPrincipals("John");
    expect(res.data[0].DisplayName).toContain("John");
  });

  it("searchPrincipals has correct maxResults", async () => {
    const res = await searchPrincipals("a", { maxResults: 1 });
    expect(res.data).toHaveLength(1);
  });

  it("searchPrincipals returns groups only", async () => {
    const res = await searchPrincipals("o", { principalType: "SharePointGroup" });
    expect(res.data.every(({ PrincipalType }) => PrincipalType === "SharePointGroup")).toBeTruthy();
  });

  it("searchPrincipals returns users only", async () => {
    const res = await searchPrincipals("o", { principalType: "User" });
    expect(res.data.every(({ PrincipalType }) => PrincipalType === "User")).toBeTruthy();
  });
});

import getUserInformation from "./getUserInformation";

describe("Get User Information", () => {
  it("Returns user ID 1", async () => {
    const res = await getUserInformation("1");
    expect(res.data.ContentType).toBe("Person");
    expect(res.data.ID).toBe("1");
  });

  it("Returns user ID 14", async () => {
    const res = await getUserInformation("14");
    expect(res.data.ContentType).toBe("Person");
    expect(res.data.ID).toBe("14");
  });

  it("Returns Domain Group ID 12", async () => {
    const res = await getUserInformation("12");
    expect(res.data.ContentType).toBe("DomainGroup");
    expect(res.data.ID).toBe("12");
  });

  it("Returns SharePoint Group ID 4", async () => {
    const res = await getUserInformation("4");
    expect(res.data.ContentType).toBe("SharePointGroup");
    expect(res.data.ID).toBe("4");
  });

  it("Invalid user throws error", async () => {
    try {
      await getUserInformation("0");
    } catch (error) {
      expect(error.message).toMatch(
        /No user properties found, unable to get current user/i
      );
    }
  });
});

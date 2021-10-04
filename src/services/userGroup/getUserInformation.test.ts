import getUserInformation from "./getUserInformation";

describe("Get User Information", () => {
  it("Returns user ID 1", async () => {
    const user = await getUserInformation("1");
    expect(user.ContentType).toBe("Person");
    expect(user.ID).toBe("1");
  });

  it("Returns user ID 14", async () => {
    const user = await getUserInformation("14");
    expect(user.ContentType).toBe("Person");
    expect(user.ID).toBe("14");
  });

  it("Returns Domain Group ID 12", async () => {
    const user = await getUserInformation("12");
    expect(user.ContentType).toBe("DomainGroup");
    expect(user.ID).toBe("12");
  });

  it("Returns SharePoint Group ID 4", async () => {
    const user = await getUserInformation("4");
    expect(user.ContentType).toBe("SharePointGroup");
    expect(user.ID).toBe("4");
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

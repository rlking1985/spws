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
});

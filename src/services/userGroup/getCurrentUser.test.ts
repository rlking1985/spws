import getCurrentUser from "./getCurrentUser";

describe("Get Current User", () => {
  it("User ID is scraped", async () => {
    const user = await getCurrentUser();

    expect(user.ContentType).toBe("Person");
    expect(user.ID).toBe("1");
  });
});

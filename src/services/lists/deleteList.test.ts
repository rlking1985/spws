import deleteList from "./deleteList";
import addList from "./addList";

describe("deleteList", () => {
  // Create shared variables
  const listName = "DeleteList";

  // Before all tests, create a list
  beforeAll(async () => {
    try {
      // Create list in order to delete it
      await addList(listName);
    } catch (error) {
      // Do nothing if list already exists
    }
  });

  it("Passes", async () => {
    const res = await deleteList(listName);
    expect(res.data.success).toBe(true);
  });

  it("throws an error when the list does not exist", async () => {
    await expect(deleteList("DoesNotExist")).rejects.toThrowError(
      expect.objectContaining({
        message: expect.stringMatching(/^List does not exist/i),
      })
    );
  });
});

import { ListTemplateId } from "../../types";
import addList from "./addList";
import deleteList from "./deleteList";

describe("addList", () => {
  // Create shared variables
  const listName = "AddList";
  const description = "List created by API";
  const templateId: ListTemplateId = 100;

  // Before all tests, create a list
  beforeAll(async () => {
    try {
      // Create list in order to delete it
      await deleteList(listName);
    } catch (error) {
      // Do nothing if list does not exist
    }
  });

  it("Passes", async () => {
    const res = await addList(listName, { description, templateId });

    expect(res.data.StaticName).toBe(listName);
    expect(res.data.Description).toBe(description);
    expect(+res.data.ServerTemplate!).toBe(templateId);
  });

  it("Error when the list already exist", async () => {
    await expect(addList(listName)).rejects.toThrowError(
      expect.objectContaining({
        message: expect.stringMatching(/already exists in this Web site/i),
      })
    );
  });
});

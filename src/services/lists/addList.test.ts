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
    await deleteList(listName);
    // Create list in order to delete it
  });

  it("Passes", async () => {
    const res = await addList(listName, { description, templateId });

    expect(res.data.StaticName).toBe(listName);
    expect(res.data.Description).toBe(description);
    expect(+res.data.ServerTemplate!).toBe(templateId);
  });

  // it("Error when the list does not exist", async () => {
  //   const res = await addList("DoesNotExist");
  // });
});

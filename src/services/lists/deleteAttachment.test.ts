import deleteAttachment from "./deleteAttachment";

describe("deleteAttachment", () => {
  it("Attachment is deleted", async () => {
    const res = await deleteAttachment({
      listName: "Delete Attachments",
      listItemID: "1",
      url: "http://objectpoint/sites/spws/operations/Lists/DeleteAttachments/Attachments/1/image.png",
    });
    expect(res.status).toBe(200);
  });
});

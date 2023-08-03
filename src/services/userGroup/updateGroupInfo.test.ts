import { SpwsError } from "../../classes";
import updateGroupInfo from "./updateGroupInfo";

describe("updateGroupInfo", () => {
  const payload = {
    oldGroupName: "Update Group Info Test",
    groupName: "Update Group Info Test",
    ownerIdentifier: "Site Owners",
    ownerType: "group" as "user" | "group",
  };

  it("Passes setting owner as group", async () => {
    const res = await updateGroupInfo(payload);

    expect(res.data.success).toBe(true);
  });

  it("Passes setting owner as user", async () => {
    const res = await updateGroupInfo({
      ...payload,
      ownerType: "user",
      ownerIdentifier: "drn\\ross.king3",
    });
    expect(res.data.success).toBe(true);
  });

  it("Passes with illegal XML characters", async () => {
    const res = await updateGroupInfo({
      ...payload,
      oldGroupName: "Update Group Info & Test",
      groupName: "Update Group Info & Test",
      ownerType: "user",
      ownerIdentifier: "drn\\ross.king3",
    });
    expect(res.data.success).toBe(true);
  });

  it("Errors setting owner as user when domain name isn't included", async () => {
    try {
      const res = await updateGroupInfo({
        ...payload,
        ownerType: "user",
        ownerIdentifier: "ross.king3",
      });
      expect(res.data.success).toBe(true);
    } catch (e) {
      const error: SpwsError = e;
      expect(error.message).toMatch(/valid string including the domain /i);
    }
  });

  it("Error: User Group not found", async () => {
    try {
      const res = await updateGroupInfo({
        ...payload,
        oldGroupName: "This is should fail",
      });
      expect(res.data.success).toBe(true);
    } catch (e) {
      const error: SpwsError = e;
      expect(error.message).toMatch(/Group cannot be found/i);
    }
  });
});

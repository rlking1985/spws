import { SpwsError } from "../../classes";
import { asyncForEach } from "../../utils";
import updateGroupInfo from "./updateGroupInfo";

describe("updateGroupInfo", () => {
  const payload = {
    oldGroupName: "Update Group Info Test",
    groupName: "Update Group Info Test",
    ownerIdentifier: "Site Members",
    ownerType: "group" as "user" | "group",
    webURL: window.adminWebURL,
  };
  it("Passes", async () => {
    const res = await updateGroupInfo(payload);
    expect(res.data.success).toBe(true);
  });

  it("User Group not found", async () => {
    try {
      const res = await updateGroupInfo({
        ...payload,
        oldGroupName: "This is should fail",
      });
      expect(res.data.success).toBe(true);
    } catch (e) {
      const error: SpwsError = e;
      console.log("error.message :>> ", error.message);
      expect(error.message).toMatch(/Group cannot be found/i);
    }
  });

  // });

  // it("Error when userLoginName is not valid", async () => {
  //   await asyncForEach(["", false, { userLoginName }], async (userLoginName) => {
  //     try {
  //       const res = await removeUserFromGroup(userLoginName, groupName);
  //       expect(res.data.success).toBe(false);
  //     } catch (e: any) {
  //       const error: SpwsError = e;
  //       expect(error.message).toMatch(/Expected userLoginName of a valid string/i);
  //     }
  //   });
  // });

  // it("Error when groupName does not exist", async () => {
  //   try {
  //     const res = await removeUserFromGroup(userLoginName, "Does Not Exist");
  //     expect(res.data.success).toBe(false);
  //   } catch (e: any) {
  //     const error: SpwsError = e;
  //     expect(error.message).toMatch(/Group cannot be found/i);
  //   }
  // });

  // it("Error when groupName is not valid", async () => {
  //   await asyncForEach(["", false, { groupName }], async (groupName) => {
  //     try {
  //       const res = await removeUserFromGroup(userLoginName, groupName);
  //       expect(res.data.success).toBe(false);
  //     } catch (e: any) {
  //       const error: SpwsError = e;
  //       expect(error.message).toMatch(/Expected groupName of a valid string/i);
  //     }
  //   });
  // });
});

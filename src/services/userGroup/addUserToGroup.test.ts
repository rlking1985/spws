import { SpwsError } from "../../classes";
import { asyncForEach } from "../../utils";
import addUserToGroup from "./addUserToGroup";

describe("addUserToGroup", () => {
  const domain = process.env.TEST_DOMAIN;
  const userLoginName = `${domain}\\${process.env.TEST_USER_VISITOR}`;
  const groupName = "Add User To Group Test";

  it("Passes", async () => {
    const res = await addUserToGroup(userLoginName, groupName);
    expect(res.data.success).toBe(true);
  });

  it("Error when user does not exist", async () => {
    try {
      const res = await addUserToGroup(
        "dev\\Username does not exist",
        groupName
      );
      expect(res.data.success).toBe(false);
    } catch (e: any) {
      const error: SpwsError = e;
      expect(error.message).toMatch(
        /The user does not exist or is not unique/i
      );
    }
  });

  it("Error when userLoginName is not valid", async () => {
    await asyncForEach(
      ["", false, { userLoginName }],
      async (userLoginName) => {
        try {
          // @ts-expect-error
          const res = await addUserToGroup(userLoginName, groupName);
          expect(res.data.success).toBe(false);
        } catch (e: any) {
          const error: SpwsError = e;
          expect(error.message).toMatch(
            /Expected userLoginName of a valid string/i
          );
        }
      }
    );
  });

  it("Error when groupName does not exist", async () => {
    try {
      const res = await addUserToGroup(userLoginName, "Does Not Exist");
      expect(res.data.success).toBe(false);
    } catch (e: any) {
      const error: SpwsError = e;
      expect(error.message).toMatch(/Group cannot be found/i);
    }
  });

  it("Error when groupName is not valid", async () => {
    await asyncForEach(["", false, { groupName }], async (groupName) => {
      try {
          // @ts-expect-error
        const res = await addUserToGroup(userLoginName, groupName);
        expect(res.data.success).toBe(false);
      } catch (e: any) {
        const error: SpwsError = e;
        expect(error.message).toMatch(/Expected groupName of a valid string/i);
      }
    });
  });
});

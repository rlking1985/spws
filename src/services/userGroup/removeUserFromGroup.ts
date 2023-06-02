// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsRequest, SpwsError } from "../../classes";

// Enum
import { WebServices } from "../../enum";

// Services
// import {  } from "../lists";

// Types
import { SpwsResponse } from "../../types";

// Utils
import { escapeXml } from "../../utils";

interface Operation extends SpwsResponse {
  data: { success: boolean };
}

/**
 * Removes the specified user from the specified group.
 * @param userLoginName A string that contains the user name (DOMAIN\User_Alias) of the user.
 * @param groupName A string that contains the name of the group.
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774499(v=office.12)
 * @example
 * ```
 * const res = await removeUserFromGroup("dev\\john.smith", "Site Owners")
 * ```
 */
const removeUserFromGroup = async (
  userLoginName: string,
  groupName: string,
  {
    webURL = defaults.webURL,
  }: {
    /** The SharePoint webURL  */
    webURL?: string;
  } = {}
): Promise<Operation> => {
  try {
    // Validate User Login Name
    if (!userLoginName || typeof userLoginName !== "string" || !userLoginName.includes("\\"))
      throw new SpwsError({
        message: `Expected userLoginName of a valid string including the domain but received type of ${typeof userLoginName} with value ${
          userLoginName || "(no value)"
        }`,
      });

    // Validate Group Name
    if (!groupName || typeof groupName !== "string")
      throw new SpwsError({
        message: `Expected groupName of a valid string but received type of ${typeof groupName} with value ${
          groupName || "(no value)"
        }`,
      });

    // Create request object
    const req = new SpwsRequest({
      webService: WebServices.UserGroup,
      webURL,
      soapAction: "http://schemas.microsoft.com/sharepoint/soap/directory/RemoveUserFromGroup",
    });

    // Create envelope
    req.createEnvelope(
      `<RemoveUserFromGroup xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">
      <groupName>${escapeXml(groupName)}</groupName>
      <userLoginName>${escapeXml(userLoginName)}</userLoginName>
    </RemoveUserFromGroup>`
    );

    // Send request
    const res = await req.send();

    // If fault, throw error
    if (res.responseXML.querySelector("soap\\:Fault, Fault")) throw new SpwsError(res);

    // Return object
    return { ...res, data: { success: true } };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default removeUserFromGroup;

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
// import {  } from "../../utils";

interface Operation extends SpwsResponse {
  data: { success: boolean };
}

/**
 * Updates information for the specified group.
 * @param oldGroupName A string that contains the old name of the group.
 * @param groupName A string that contains the new name of the group.
 * @param ownerIdentifier A string that contains the user name (DOMAIN\User_Alias) for the owner of the group.
 * @param ownerType A string that specifies the type of owner, which can be either user or group.
 * @param description A string that contains the description for the group.
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774703(v=office.12)
 * @example
 * ```
 * const res = await removeUserFromGroup("dev\\john.smith", "Site Owners")
 * ```
 */
const updateGroupInfo = async ({
  oldGroupName,
  groupName,
  ownerIdentifier,
  ownerType,
  webURL = defaults.webURL,
}: {
  oldGroupName: string;
  groupName: string;
  ownerIdentifier: string;
  ownerType: "user" | "group";
  webURL?: string;
}): Promise<Operation> => {
  try {
    // Validate oldGroupName
    if (!oldGroupName || typeof oldGroupName !== "string")
      throw new SpwsError({
        message: `Expected oldGroupName of a valid string but received type of ${typeof oldGroupName} with value ${
          oldGroupName || "(no value)"
        }`,
      });

    // // Validate Group Name
    // if (!groupName || typeof groupName !== "string")
    //   throw new SpwsError({
    //     message: `Expected groupName of a valid string but received type of ${typeof groupName} with value ${
    //       groupName || "(no value)"
    //     }`,
    //   });

    // Create request object
    const req = new SpwsRequest({
      webService: WebServices.UserGroup,
      webURL,
      soapAction: "http://schemas.microsoft.com/sharepoint/soap/directory/UpdateGroupInfo",
    });

    // Create envelope
    req.createEnvelope(
      `<UpdateGroupInfo xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">
        <oldGroupName>${oldGroupName}</oldGroupName>
        ${groupName ? `<groupName>${groupName}</groupName>` : ""}
        ${ownerIdentifier ? `<ownerIdentifier>${ownerIdentifier}</ownerIdentifier>` : ""}
        ${ownerType ? `<ownerType>${ownerType}</ownerType>` : ""}
        <description></description>
    </UpdateGroupInfo>`
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

export default updateGroupInfo;

// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsRequest, SpwsError } from "../../classes";

// Enum
import { WebServices } from "../../enum";

import { SpwsResponse } from "../../types";

interface Operation extends SpwsResponse {
  data: { success: boolean };
}

/**
 * Updates information for the specified group. The API does not support changing the description (Microsoft docs are incorrect).
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
const updateGroupInfo = async (params: {
  oldGroupName: string;
  groupName: string;
  ownerIdentifier: string;
  ownerType: "user" | "group";
  webURL?: string;
}): Promise<Operation> => {
  try {
    // Destruct params
    const { ownerType, ownerIdentifier } = params;

    // Validate ownerIdentifier if ownerType is a user
    if (ownerType === "user" && !ownerIdentifier.includes("\\")) {
      throw new SpwsError({
        message: `Expected ownerIdentifier of a valid string including the domain (e.g. dev\\john.smith) but received type of ${typeof ownerIdentifier} with value ${
          ownerIdentifier || "(no value)"
        }`,
      });
    }

    // Validate while creating envelop xml
    let envelopeXml = Object.entries(params)
      .map(([key, value]) => {
        // Don't validate the webURL
        if (key === "webURL") return "";
        // If the value is empty or not a string
        if (!value || typeof value !== "string")
          // Throw error
          throw new SpwsError({
            message: `Expected ${key} of a valid string but received type of ${typeof value} with value ${
              value || "(no value)"
            }`,
          });

        // Return xml
        return `<${key}>${value}</${key}>`;
      })
      .join("");

    // Create request object
    const req = new SpwsRequest({
      webService: WebServices.UserGroup,
      webURL: params.webURL || defaults.webURL,
      soapAction: "http://schemas.microsoft.com/sharepoint/soap/directory/UpdateGroupInfo",
    });

    // Create envelope
    req.createEnvelope(
      `<UpdateGroupInfo xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">
        ${envelopeXml}
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

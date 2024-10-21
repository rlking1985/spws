// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsRequest, SpwsError } from "../../classes";

// Enum
import { WebServices } from "../../enum";

// Services

// Types
import { Group, SpwsResponse } from "../../types";

// Utils
import { escapeXml } from "../../utils";

interface Operation extends SpwsResponse {
  data: Group[];
}

/**
 * Returns information about the collection of groups of which the specified user is a member
 * @param userLoginName The user login name including the domain
 * https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772552(v=office.12)
 * @example
 * ```
 * // Get groups for current site
 * const res = await getGroupCollectionFromUser("dev\\john.smith");
 *
 * // Get groups for different site
 * const res = await getGroupCollectionFromUser("dev\\john.smith", { webURL: "/sites/other "});
 * ```
 */
const getGroupCollectionFromUser = async (
  userLoginName: string,
  {
    webURL = defaults.webURL,
  }: {
    /** The SharePoint web URL */
    webURL?: string;
  } = {}
): Promise<Operation> => {
  try {
    // If userLoginName is not provided and default user is not null
    if (!userLoginName || typeof userLoginName !== "string") {
      throw new SpwsError({
        message: "Unable to get current user as loginName was not provided",
      });
    }

    // Create Request
    const req = new SpwsRequest({
      webURL,
      webService: WebServices.UserGroup,
    });

    // Create envelope
    req.createEnvelope(`
      <GetGroupCollectionFromUser xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">
        <userLoginName>${escapeXml(userLoginName)}</userLoginName>
      </GetGroupCollectionFromUser>`);

    // Send request
    const res = await req.send();

    // Create data object
    const data = Array.from(res.responseXML.querySelectorAll("Group")).map(
      (el): Group => ({
        ID: el.getAttribute("ID")!,
        Name: el.getAttribute("Name")!,
        Description: el.getAttribute("Description") || "",
        OwnerID: +el.getAttribute("OwnerID")!,
        OwnerIsUser: el.getAttribute("OwnerIsUser") === "True",
      })
    );

    // Return response
    return { ...res, data };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default getGroupCollectionFromUser;

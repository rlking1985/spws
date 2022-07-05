// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsRequest, SpwsError } from "../../classes";

// Enum
import { WebServices } from "../../enum";

// Types
import { SpwsResponse, User } from "../../types";

// Utils
import { escapeXml } from "../../utils";

interface Operation extends SpwsResponse {
  data: User[];
}

/**
 * Returns information about the collection of users in the specified group.
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772554(v=office.12)
 * @example
 * ```
 * // Get users from the group named Site Owners
 * const res = await getUserCollectionFromSite("Site Owners")
 *
 * // Get users from another site
 * const res = await getUserCollectionFromSite("Site Owners", { webURL: "/sites/other" })
 *
 * ```
 */
const getUserCollectionFromGroup = async (
  groupName: string,
  {
    webURL = defaults.webURL,
  }: {
    /** The SharePoint webURL  */
    webURL?: string;
  } = {}
): Promise<Operation> => {
  try {
    // Create request object
    const req = new SpwsRequest({
      webService: WebServices.UserGroup,
      webURL,
      soapAction:
        "http://schemas.microsoft.com/sharepoint/soap/directory/GetUserCollectionFromGroup",
    });

    // Create envelope
    req.createEnvelope(
      `<GetUserCollectionFromGroup xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">
        <groupName>${escapeXml(groupName)}</groupName>
      </GetUserCollectionFromGroup>`
    );

    // Send request
    const res = await req.send();

    // Create data
    const data = Array.from(res.responseXML.querySelectorAll("User")).map((element) => {
      // Create user
      const user: User = {
        Email: element.getAttribute("Email")!,
        Flags: +(element.getAttribute("Flags") || ""),
        ID: element.getAttribute("ID")!,
        IsDomainGroup: new RegExp(element.getAttribute("IsDomainGroup") || "", "i").test("true"),
        IsSiteAdmin: new RegExp(element.getAttribute("IsSiteAdmin") || "", "i").test("true"),
        LoginName: element.getAttribute("LoginName")!,
        Name: element.getAttribute("Name")!,
        Notes: element.getAttribute("Notes")!,
        Sid: element.getAttribute("Sid")!,
      };

      return user;
    });

    // Return object
    return { ...res, data };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default getUserCollectionFromGroup;

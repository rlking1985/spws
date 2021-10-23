// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsRequest, SpwsError } from "../../classes";

// Enum
import { WebServices } from "../../enum";

// Types
import { SpwsResponse, User } from "../../types";

// Utils
// import {  } from "../../utils";

interface Operation extends SpwsResponse {
  data: User[];
}

/**
 * Returns information about the collection of users for the current site collection.
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772702(v=office.12)
 * @example
 * ```
 * // Get users from the current site
 * const res = await getUserCollectionFromSite()
 *
 * // Get users from another site
 * const res = await getUserCollectionFromSite({ webURL: "/sites/other" })
 *
 * ```
 */
const getUserCollectionFromSite = async ({
  webURL = defaults.webURL,
}: {
  /** The SharePoint webURL  */
  webURL?: string;
} = {}): Promise<Operation> => {
  try {
    // Create request object
    const req = new SpwsRequest({
      webService: WebServices.UserGroup,
      webURL,
    });

    // Create envelope
    req.createEnvelope(
      `<GetUserCollectionFromSite xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/" />`
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

export default getUserCollectionFromSite;

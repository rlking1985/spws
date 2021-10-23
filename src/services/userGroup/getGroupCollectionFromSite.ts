// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsRequest, SpwsError } from "../../classes";

// Enum
import { WebServices } from "../../enum";

// Types
import { SpwsResponse, Group } from "../../types";

// Utils
// import {  } from "../../utils";

interface Operation extends SpwsResponse {
  data: Group[];
}

/**
 * Returns information about the collection of groups for the current site collection.
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774594(v=office.12)
 * @example
 * ```
 * // Get groups from the current site
 * const res = await getGroupCollectionFromSite()
 *
 * // Get groups from another site
 * const res = await getGroupCollectionFromSite({ webURL: "/sites/other" })
 *
 * ```
 */
const getGroupCollectionFromSite = async ({
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
      `<GetGroupCollectionFromSite xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/" />`
    );

    // Send request
    const res = await req.send();

    // Create data
    const data = Array.from(res.responseXML.querySelectorAll("Group")).map((element) => {
      // Create group
      const group: Group = {
        ID: element.getAttribute("ID")!,
        Name: element.getAttribute("Name")!,
        Description: element.getAttribute("Description") || "",
        OwnerID: +element.getAttribute("OwnerID")!,
        OwnerIsUser: new RegExp(element.getAttribute("OwnerIsUser") || "", "i").test("true"),
      };

      return group;
    });

    // Return object
    return { ...res, data };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default getGroupCollectionFromSite;

// SPWS Library
import { defaults } from "../../..";

// Classes
import { SpwsRequest, SpwsError } from "../../../classes";

// Enum
import { WebServices } from "../../../enum";

// Services

// Types
import { List, ListAttributes, SpwsResponse } from "../../../types";

// Utils
import { escapeXml } from "../../../utils";
import parseList from "./parseList";

interface Operation extends SpwsResponse {
  data: List;
}

/**
 * Returns a schema for the specified list.
 *
 * @param listName The list display name or GUID
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772709(v=office.12)
 * @example
 * ```
 * // Get list using default parameters
 * const list = await getList({ listName: "Announcements" });
 * // Get list on another site
 * const list = await getList({ listName: "Announcements", webURL: "/sites/hr" });
 * // Get list with only the Title and Fields attributes parsed
 * const list = await getList({ listName: "Title", attributes: ["Title", "Fields"] })
 * ```
 */
const getList = async (
  listName: string,
  {
    webURL = defaults.webURL,
    attributes = [],
  }: {
    /** The SharePoint web URL */ 
    webURL?: string;
    /** The list attributes that should be returned in the data object */
    attributes?: ListAttributes[];
  } = {}
): Promise<Operation> => {
  // Create request object
  const req = new SpwsRequest({ webService: WebServices.Lists, webURL });

  // Create envelope
  req.createEnvelope(
    `<GetList xmlns="http://schemas.microsoft.com/sharepoint/soap/"><listName>${escapeXml(
      listName
    )}</listName></GetList>`
  );

  try {
    // Return request
    const res = await req.send();

    // Get data
    const data = parseList({ res, attributes });

    return { ...res, data };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default getList;

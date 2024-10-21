// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsRequest, SpwsError } from "../../classes";

// Enum
import { WebServices } from "../../enum";

// Types
import { SpwsResponse, ListTemplateId, List } from "../../types";

// Functions
import parseList from "./getList/parseList";

interface Operation extends SpwsResponse {
  data: List;
}

type Params = {
  // The Template ID is an integer that specifies the list template to use. Defaults to 100 (Custom List)
  templateId?: ListTemplateId;
  // A string that contains a description for the list.
  description?: string;
  // The SharePoint web URL, required if on a different site collection
  webURL?: string;
};

/**
 * Creates a new list.
 *
 * @link https://learn.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772560(v=office.12)
 * @example
 * ```
 * // Get list collection for current site
 * const res = await deleteList("Announcements", { webURL: "/sites/other" })
 * ```
 */
const addList = async (
  listName: string,
  options: Params = {}
): Promise<Operation> => {
  // Deconstruct options
  const { webURL = defaults.webURL, templateId = 100, description = "" } = options;
  
  // Create request object
  const req = new SpwsRequest({
    webService: WebServices.Lists,
    webURL,
    soapAction: "http://schemas.microsoft.com/sharepoint/soap/AddList",
  });

  // Create envelope
  req.createEnvelope(`<AddList xmlns="http://schemas.microsoft.com/sharepoint/soap/">
      <listName>${listName}</listName>
      <description>${description}</description>
      <templateID>${templateId}</templateID>
    </AddList>`);

  try {
    // Send request
    const res = await req.send();

    // Parse list data
    const data = parseList({ res });

    // Check for errors
    const errorString =
      res.responseXML.querySelector("errorstring")?.textContent || "";

    // If an error is found, throw error
    if (errorString) throw new SpwsError({ ...res, responseText: errorString });

    // Return res. There is no data/response for this request
    return { ...res, data };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default addList;

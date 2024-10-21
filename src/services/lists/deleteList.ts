// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsRequest, SpwsError } from "../../classes";

// Enum
import { WebServices } from "../../enum";

// Types
import { SpwsResponse } from "../../types";

interface Operation extends SpwsResponse {
  data: { success: boolean };
}

type Params = {
  // The SharePoint web URL, required if on a different site collection
  webURL?: string;
};

/**
 * Deletes the list.
 *
 * https://learn.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms773418(v=office.12)
 * @example
 * ```
 * // Get list collection for current site
 * const res = await deleteList("Announcements", { webURL: "/sites/other" })
 * ```
 */
const deleteList = async (
  listName: string,
  { webURL = defaults.webURL }: Params = {}
): Promise<Operation> => {
  // Create request object
  const req = new SpwsRequest({
    webService: WebServices.Lists,
    webURL,
    soapAction: "http://schemas.microsoft.com/sharepoint/soap/DeleteList",
  });

  // Create envelope
  req.createEnvelope(` <DeleteList xmlns="http://schemas.microsoft.com/sharepoint/soap/">
      <listName>${listName}</listName>
    </DeleteList>`);

  try {
    // Send request
    const res = await req.send();

    // Check for errors
    const errorString =
      res.responseXML.querySelector("errorstring")?.textContent || "";

    // If an error is found, throw error
    if (errorString) throw new SpwsError({ ...res, responseText: errorString });

    // Return res. There is no data/response for this request
    return { ...res, data: { success: true } };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default deleteList;

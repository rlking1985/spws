// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsRequest, SpwsError } from "../../classes";

// Enum
import { WebServices } from "../../enum";

// Types
import { List, ListCollection, SpwsResponse } from "../../types";

interface Operation extends SpwsResponse {}

type Params = {
  // A string that contains either the title or GUID for the list.
  listName: string;
  // A string that contains the ID of the item to delete.
  listItemID: string;
  /** A string that contains the absolute URL for the attachment
   * as follows: http://Server_Name/Site_Name/Lists/List_Name/Attachments/Item_ID/FileName.
   */
  url: string;
  // The SharePoint web URL, required if on a different site collection
  webURL?: string;
};

/**
 * Removes the attachment from the specified list item.
 *
 * @link https://learn.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774770(v=office.12)
 * @example
 * ```
 * // Get list collection for current site
 * const res = await getListCollection()
 *
 * // Get list collection for another site
 * const res = await getListCollection({ webURL: "/sites/other" })
 * ```
 */
const deleteAttachment = async ({
  listName,
  listItemID,
  url,
  webURL = defaults.webURL,
}: Params): Promise<Operation> => {
  // Create request object
  const req = new SpwsRequest({
    webService: WebServices.Lists,
    webURL,
    soapAction: "http://schemas.microsoft.com/sharepoint/soap/DeleteAttachment",
  });

  // Create envelope
  req.createEnvelope(`<DeleteAttachment xmlns='http://schemas.microsoft.com/sharepoint/soap/'>
    <listName>${listName}</listName>
    <listItemID>${listItemID}</listItemID>
    <url>${url}</url>
  </DeleteAttachment>`);

  try {
    // Send request
    const res = await req.send();

    // Return res. There is no data/response for this request
    return { ...res };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default deleteAttachment;

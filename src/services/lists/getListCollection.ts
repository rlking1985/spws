// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsRequest, SpwsError } from "../../classes";

// Enum
import { WebServices } from "../../enum";

// Types
import { List, ListCollection, SpwsResponse } from "../../types";
import getListStaticName from "../../utils/getListStaticName";

interface Operation extends SpwsResponse {
  data: ListCollection;
}

/**
 * Returns the names and GUIDs for all lists in the site.
 *
 * https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774663(v=office.12)?redirectedfrom=MSDN
 * @example
 * ```
 * // Get list collection for current site
 * const res = await getListCollection()
 *
 * // Get list collection for another site
 * const res = await getListCollection({ webURL: "/sites/other" })
 * ```
 */
const getListCollection = async ({
  webURL = defaults.webURL,
}: {
  /** The SharePoint webURL */
  webURL?: string;
} = {}): Promise<Operation> => {
  // Create request object
  const req = new SpwsRequest({ webService: WebServices.Lists, webURL });

  // Create envelope
  req.createEnvelope(
    `<GetListCollection xmlns="http://schemas.microsoft.com/sharepoint/soap/" />`
  );

  try {
    const res = await req.send();

    // Create data object
    const data = Array.from(res.responseXML.querySelectorAll("List")).map(
      (list) => {
        // Create list object
        const listData = Array.from(list.attributes).reduce(
          (object: List, { name, value }) => {
            object[name] = value;
            return object;
          },
          { StaticName: "" }
        );

        // Try to get static name
        try {
          listData.StaticName = getListStaticName({
            DefaultViewUrl: listData.DefaultViewUrl!,
            Title: listData.Title!,
          });
        } catch (error) {}

        return listData;
      }
    );

    return { ...res, data };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default getListCollection;

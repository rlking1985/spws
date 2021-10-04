// SPWS Library
import { defaults } from "../../..";

// Classes
import { SpwsError, SpwsRequest } from "../../../classes";

// Enum
import { WebServices } from "../../../enum";

// Services

// Types
import { SpwsResponse, ListCollection, List } from "../../../types";

// Utils

/**
 * Gets all list items for multiple lists
 */
export interface Operation extends SpwsResponse {
  data?: ListCollection;
}

/**
 * Returns the names and GUIDs for all lists in the site.
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774663(v=office.12)?redirectedfrom=MSDN
 */
const getListCollection = ({
  listNames,
  parse = defaults.parse,
  webURL = defaults.webURL,
}: {
  parse?: boolean;
  webURL?: string;
  listNames: string[];
}): Promise<Operation> =>
  new Promise(async (resolve, reject) => {
    {
      // Create request object
      const req = new SpwsRequest({ webService: WebServices.Lists, webURL });

      // Create envelope
      req.createEnvelope(
        `<GetListCollection xmlns="http://schemas.microsoft.com/sharepoint/soap/" />`
      );

      try {
        // Return request
        let res: Operation = await req.send();

        if (parse) {
          res.data = Array.from(res.responseXML.querySelectorAll("List")).map(
            (list) => {
              return Array.from(list.attributes).reduce(
                (object: List, { name, value }) => {
                  object[name] = value;
                  return object;
                },
                {}
              );
            }
          );
        }

        resolve(res);
      } catch (error: any) {
        reject(new SpwsError(error));
      }
    }
  });

export default getListCollection;

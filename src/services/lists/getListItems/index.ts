// Constants
import { defaults, DefaultParameters, Response, ResponseError } from "../../..";

// Enum
import WebServices from "../../../enum/webServices";

// Interfaces
import ListCollection from "../../../types/listCollection";
import List from "../../../types/list";

// Classes
import Request from "../../../classes/request";

/**
 * Gets all list items for multiple lists
 */
export interface GetListItemsResponse extends Response {
  data?: ListCollection;
}

export interface GetListItemsParameters extends DefaultParameters {
  /** An array of list display names or GUIDS */
  listNames: string[];
}

/**
 * Returns the names and GUIDs for all lists in the site.
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774663(v=office.12)?redirectedfrom=MSDN
 */
const getListCollection = ({
  parse = defaults.parse,
  webURL = defaults.webURL,
}: DefaultParameters = {}): Promise<GetListItemsResponse> =>
  new Promise(async (resolve, reject) => {
    {
      // Create request object
      const req = new Request({ webService: WebServices.Lists, webURL });

      // Create envelope
      req.createEnvelope(
        `<GetListCollection xmlns="http://schemas.microsoft.com/sharepoint/soap/" />`
      );

      try {
        // Return request
        let res: GetListItemsResponse = await req.send();

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
        reject(new ResponseError(error));
      }
    }
  });

export default getListCollection;

// SPWS Library
import { defaults } from "../..";

// Classes
import { Request, SpwsError } from "../../classes";

// Enum
import { WebServices } from "../../enum";

// Services

// Types
import { List, ListCollection, SpwsResponse } from "../../types";

// Utils

interface Operation extends SpwsResponse {
  data?: ListCollection;
}

/**
 * Returns the names and GUIDs for all lists in the site.
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774663(v=office.12)?redirectedfrom=MSDN
 */
const getListCollection = ({
  parse = defaults.parse,
  webURL = defaults.webURL,
}: {
  parse?: boolean;
  webURL?: string;
} = {}): Promise<Operation> =>
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

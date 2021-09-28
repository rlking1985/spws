// Constants
import { defaults, DefaultParameters, Response } from "../..";

// Enum
import WebServices from "../../enum/webServices";

// Interfaces
import ListCollection from "../../types/listCollection";
import List from "../../types/list";

// Classes
import Request from "../../classes/request";
export { default as ResponseError } from "../../classes/responseError";

/**
 * asdasd
 */
export interface GetListCollectionResponse extends Response {
  data?: ListCollection;
}

/**
 * Returns the names and GUIDs for all lists in the site.
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774663(v=office.12)?redirectedfrom=MSDN
 */
const getListCollection = ({
  parse = defaults.parse,
  webURL = defaults.webURL,
}: DefaultParameters = {}): Promise<GetListCollectionResponse> =>
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
        let res: GetListCollectionResponse = await req.send();

        if (parse) {
          // TODO: Figure out how to use the proper type declaration
          const responseXML: any = res.responseXML;
          res.data = [...responseXML.querySelectorAll("List")].map((list) => {
            return [...list.attributes].reduce(
              (object: List, { name, value }) => {
                object[name] = value;
                return object;
              },
              {}
            );
          });
        }

        resolve(res);
      } catch (error: unknown) {
        reject(error);
      }
    }
  });

export default getListCollection;

// Constants
import { defaults, DefaultParameters, Response } from "../..";

// Enum
import WebServices from "../../enum/webServices";

// Interfaces
import List from "../../interfaces/List";

// Classes
import Request from "../../classes/request";
import escapeXml from "../../utils/escapeXml";
export { default as ResponseError } from "../../classes/responseError";

export interface GetListParameters extends DefaultParameters {
  /**
   * A string that contains either the title (not static name) or the GUID for the list.
   */
  listName: string;
}

export interface GetListResponse extends Response {
  /**
   * The data object is available for any requests where parsed is true or an error occurs
   */
  data?: List;
}

/**
 * Returns a schema for the specified list.
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772709(v=office.12)
 * @example
 * ```
 * // Get list using default parameters
 * const list = await getList({ listName: "Announcements" });
 * // Get list on another site without parsing XML
 * const list = await getList({ listName: "Announcements", webURL: "/sites/hr", parse: false });
 * ```
 */
const getList = ({
  listName,
  parse = defaults.parse,
  webURL = defaults.webURL,
}: GetListParameters): Promise<GetListResponse> =>
  new Promise(async (resolve, reject) => {
    {
      // Create request object
      const req = new Request({ webService: WebServices.Lists, webURL });

      // Create envelope
      req.createEnvelope(
        `<GetList xmlns="http://schemas.microsoft.com/sharepoint/soap/"><listName>${escapeXml(
          listName
        )}</listName></GetList>`
      );

      try {
        // Return request
        let res: GetListResponse = await req.send();

        if (parse) {
          // TODO: Figure out how to use the proper type declaration
          const responseXML: any = res.responseXML;
          res.data = [...responseXML.querySelector("List").attributes].reduce(
            (object: List, { name, value }) => {
              object[name] = value;
              return object;
            },
            {}
          );
        }

        resolve(res);
      } catch (error: unknown) {
        reject(error);
      }
    }
  });

export default getList;

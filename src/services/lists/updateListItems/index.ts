// Constants
import { defaults, DefaultParameters, Response } from "../../..";

// Enum
import WebServices from "../../../enum/webServices";

// Types
import { Item, Method, Cmd } from "../../../types";

// Classes
import Request from "../../../classes/request";
export { default as ResponseError } from "../../../classes/responseError";

/**
 * The update list items result
 */
type result = {
  method: Method;
  item: Item;
  errorCode: string;
};

export interface UpdateListItemParameters extends DefaultParameters {
  /**
   * A string that contains either the title (not static name) or the GUID for the list.
   */
  listName: string;
  /**
   *  A Batch element that contains one or more methods for adding, modifying, or deleting items
   * */
  updates: string;
}

export interface UpdateListItemsResponse extends Response {
  /**
   * The data object is available for any requests where parsed is true or an error occurs
   */
  data?: result[];
}

/**
 * Adds, deletes, or updates the specified items in a list on the current site.
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772668(v=office.12)?redirectedfrom=MSDN
 * @example
 * ```
 * // Get list using default parameters
 * const list = await updateListItems({ listName: "Announcements" });
 * // Get list on another site without parsing XML
 * const list = await updateListItems({ listName: "Announcements", webURL: "/sites/hr", parse: false });
 * // Get list with only the Title and Fields parsed
 * const list = await updateListItems({ listName: "Title", attributes: ["Title", "Fields"] })
 * ```
 */
const updateListItems = ({
  listName,
  parse = defaults.parse,
  webURL = defaults.webURL,
  updates,
}: UpdateListItemParameters): Promise<UpdateListItemsResponse> => {
  return new Promise(async (resolve, reject) => {
    {
      // Create request object
      const req = new Request({
        webService: WebServices.Lists,
        webURL,
        soapAction:
          "http://schemas.microsoft.com/sharepoint/soap/UpdateListItems",
      });

      // Create envelope
      req.createEnvelope(
        `<UpdateListItems xmlns="http://schemas.microsoft.com/sharepoint/soap/">
          <listName>${listName}</listName>
          <updates>
            <Batch OnError="Continue">
              <Method ID="1" Cmd="New">
                  <Field Name="Title">Demo</Field>
              </Method>
            </Batch>
          </updates>
        </UpdateListItems>`
      );

      try {
        // Return request
        const res: UpdateListItemsResponse = await req.send();
        // If parse is true
        if (parse) {
          // Get list from the responseXML
          res.data = Array.from(res.responseXML.querySelectorAll("Result")).map(
            (el) => {
              // Example "1,New"
              const methodInfo = el.getAttribute("ID")?.split(",")!;

              // Set ID and Command
              const ID = methodInfo[0] || "";
              let Cmd: Cmd;
              switch ((methodInfo[1] || "").toUpperCase()) {
                case "NEW":
                  Cmd = "New";
                  break;
                case "UPDATE":
                  Cmd = "Update";
                  break;
                default:
                  Cmd = "Delete";
                  break;
              }
              const method: Method = {
                ID,
                Cmd,
              };

              // Object literal to store item
              let item = {};

              // Get row
              const row = el.getElementsByTagName(`z:row`)[0];

              // If for is truthy
              if (row) {
                // Create item
                item = Array.from(row.attributes).reduce(
                  (object: Item, { name, nodeValue }) => {
                    object[name.replace("ows_", "")] = nodeValue || "";
                    return object;
                  },
                  {}
                );
              }

              // Create data object
              let result: result = {
                method,
                errorCode: el.querySelector("ErrorCode")?.textContent || "",
                item,
              };

              return result;
            }
          );
        }

        resolve(res);
      } catch (error: unknown) {
        reject(error);
      }
    }
  });
};

export default updateListItems;

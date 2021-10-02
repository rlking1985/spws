// Constants
import { defaults, DefaultParameters, Response } from "../../..";

// Enum
import WebServices from "../../../enum/webServices";

// Types
import { Item, Method, Cmd, NonEmptyArray } from "../../../types";

// Classes
import Request from "../../../classes/request";
export { default as ResponseError } from "../../../classes/responseError";

/**
 * The update list items result
 */
type result = {
  errorCode: string;
  item: Item;
  method: Method;
  status: "success" | "error";
};

export interface UpdateListItemParameters extends DefaultParameters {
  /**
   * A string that contains either the title (not static name) or the GUID for the list.
   */
  listName: string;
  /**
   * Return — Stops execution of any more methods after the first error is encountered. This is the default.
   * Continue — After an error is encountered, continues executing subsequent methods.
   */
  onError?: "Return" | "Continue";
  /**
   * A Batch element that contains one or more methods for adding, modifying, or deleting items
   * Used in batch processing to specify commands within the Batch element.
   */
  methods: NonEmptyArray<{
    /**  Used in Web services to specify the command to post to the server for updating list items. */
    cmd: Cmd;
    values: {
      /** Any field name and string value */
      [key: string]: string | undefined;
      /** If the cmd is "Update" or "Delete" the ID is required */
      ID?: string;
    };
  }>;
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
  onError = "Continue",
  methods,
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

      try {
        // Create envelope
        req.createEnvelope(
          `<UpdateListItems xmlns="http://schemas.microsoft.com/sharepoint/soap/">
          <listName>${req.escapeXml(listName)}</listName>
          <updates>
            <Batch OnError="${onError}">
              ${methods
                .map(
                  (method, index) => `
                  <Method ID="${index + 1}" Cmd="${method.cmd}">
                    ${Object.entries(method.values)
                      .map(
                        ([field, value = ""]) =>
                          `<Field Name="${field}">${req.escapeXml(
                            value
                          )}</Field>`
                      )
                      .join("")}
                  </Method>`
                )
                .join("")}
            </Batch>
          </updates>
        </UpdateListItems>`
        );

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

              // Create method
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

              // Create errorCode
              const errorCode =
                el.querySelector("ErrorCode")?.textContent || "";

              // Create data object
              let result: result = {
                method,
                status: errorCode === "0x00000000" ? "success" : "error",
                errorCode,
                item,
              };

              return result;
            }
          );
        }

        // Resolve
        resolve(res);
      } catch (error: unknown) {
        reject(error);
      }
    }
  });
};

export default updateListItems;

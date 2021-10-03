// Constants
import { defaults, DefaultParameters, Response } from "../../..";

// Enum
import WebServices from "../../../enum/webServices";

// Types
import { Item, Command } from "../../../types";

// Classes
import Request from "../../../classes/request";
export { Item, Command };
export { default as ResponseError } from "../../../classes/responseError";

// Utils
import asyncForEach from "../../../utils/asyncForEach";

export type Methods = {
  /**  Used in Web services to specify the command to post to the server for updating list items. */
  command: Command;
  /** If the command is "Update" or "Delete" the ID is required */
  ID?: string;
  /** Values are required for "New" and "Update" commands */
  values?: {
    /** Any field name and string value */
    [key: string]: string | undefined;
  };
}[];

/**
 * The update list items result
 */
type Result = {
  errorCode: string;
  errorText?: string;
  item: Item;
  command: Command;
  ID: string;
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
  methods: Methods;
  /**
   * The maximum batch size. Updates are broken into batches to balance server loads and reduce risk of server timeouts.
   */
  batchSize?: number;
}

export interface UpdateListItemsResponse extends Response {
  /**
   * The data object is available for any requests where parsed is true or an error occurs
   */
  data?: {
    methods: Result[];
    errors: Item[];
    success: Item[];
  };
}

/**
 * Adds, deletes, or updates the specified items in a list on the current site.
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772668(v=office.12)?redirectedfrom=MSDN
 * @example
 * ```
 * // Create items and parse results (default params)
 * const list = await updateListItems({
 *   listName: "Announcements",
 *   methods: [{ command: "New", values: { Title: "Demo" } }],
 * });

 * // Update items and without parsing results
 * const list = await updateListItems({
 *    listName: "Announcements",
 *    parse: false, 
 *    methods: [{ command: "Update", ID: "3", values: { Title: "Demo" } }],
 * });
 * 
 * // Delete items
 * const list = await updateListItems({
 *    listName: "Announcements",
 *    parse: false, 
 *    methods: [{ command: "Delete", ID: "3" }],
 * });
 * 
 * // Create, update and delete
 * const list = await updateListItems({
 *    listName: "Announcements",
 *    parse: false, 
 *    methods: [
 *      { command: "New", values: { Title: "Demo" } },
 *      { command: "Update", ID: "3", values: { Title: "Demo" } },
 *      { command: "Delete", ID: "3" },
 *    ],
 * });
 * ```
 */
const updateListItems = async ({
  listName,
  parse = defaults.parse,
  webURL = defaults.webURL,
  onError = "Continue",
  batchSize = 0,
  methods,
}: UpdateListItemParameters): Promise<UpdateListItemsResponse> => {
  // Validate methods
  if (!Array.isArray(methods) || methods.length === 0)
    throw new Error(`Expected methods to be an array of objects`);

  // Validate onError
  if (!["Continue", "Return"].includes(onError))
    throw new Error(
      `Expected onError to be "Continue" or "Return" but received ${onError}`
    );

  // Create array of batches
  const batches: Methods[] =
    !isNaN(batchSize) && +batchSize > 0
      ? methods.reduce((batches: [][], method, index) => {
          // If first batch or batch limit reached, push new batch
          if (index % batchSize === 0) batches.push([]);

          // Get current batch
          let batch: Methods = batches[batches.length - 1];

          // Push method to batch
          batch.push(method);

          // Return accumulator
          return batches;
        }, [])
      : [methods];

  // Iterate through all batches
  await asyncForEach(batches, (batch: Methods) => {});

  const doSomething = () => {};

  // __________________________________________-----------------------------------

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
                  <Method ID="${index + 1}" Cmd="${method.command}">
                  ${
                    method.command !== "New"
                      ? `<Field Name="ID">${method.ID}</Field>`
                      : ""
                  }
                    ${Object.entries(method.values || {})
                      .map(
                        ([field, value = ""]) =>
                          `<Field Name="${field.slice(0, 32)}">${req.escapeXml(
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

        // Create object for data
        res.data = { methods: [], errors: [], success: [] };

        // If parse is true
        if (parse) {
          // Get list from the responseXML
          res.data.methods = Array.from(
            res.responseXML.querySelectorAll("Result")
          ).map((el) => {
            // Example "1,New"
            const methodInfo = el.getAttribute("ID")?.split(",")!;

            // Set ID and Command
            const ID = methodInfo[0] || "";
            let command: Command;
            switch ((methodInfo[1] || "").toUpperCase()) {
              case "NEW":
                command = "New";
                break;
              case "UPDATE":
                command = "Update";
                break;
              default:
                command = "Delete";
                break;
            }

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

            // Create result data
            const errorCode = el.querySelector("ErrorCode")?.textContent || "";
            const errorText = el.querySelector("ErrorText")?.textContent || "";
            const status = errorCode === "0x00000000" ? "success" : "error";

            // Push item
            status === "success"
              ? res.data?.success.push(item)
              : res.data?.errors.push(item);

            // Create data object
            let result: Result = {
              ID,
              command: command,
              status,
              errorCode,
              errorText,
              item,
            };

            return result;
          });
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

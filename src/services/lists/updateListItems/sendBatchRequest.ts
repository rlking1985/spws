import { Item, Command, Request, ResponseError } from "../../..";
import { Methods, UpdateListItemsResponse, Result } from ".";

// Enum
import { WebServices } from "../../../enum";

const sendBatchRequest = ({
  listName,
  methods,
  onError,
  parse,
  webURL,
}: {
  listName: string;
  methods: Methods;
  onError: "Continue" | "Return";
  parse: boolean;
  webURL: string;
}): Promise<UpdateListItemsResponse> => {
  // Create Promise
  return new Promise(async (resolve, reject) => {
    try {
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

      // Send Request
      const res: UpdateListItemsResponse = await req.send();

      // Create object for data
      res.data = { methods: [], success: null };

      // If parse is true
      if (parse) {
        // Default success to true when parsing
        res.data.success = true;

        // Get Result from the responseXML
        res.data.methods = Array.from(
          res.responseXML.querySelectorAll("Result")
        ).map((el) => {
          // Example "1,New"
          const methodInfo = el.getAttribute("ID")?.split(",")!;

          // Set ID and Command
          const ID = methodInfo[0] || "";

          // Create command string
          let command: Command;

          // Assign correct string value
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

          // If any methods fail, set the overall success boolean to false
          if (res.data!.success && status === "error")
            res.data!.success = false;

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

      // Resolve request
      resolve(res);
    } catch (error: any) {
      reject(new ResponseError(error));
    }
  });
};

export default sendBatchRequest;

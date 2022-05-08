// SPWS Library

// Classes
import { SpwsError, SpwsRequest } from "../../../classes";

// Enum
import { WebServices } from "../../../enum";

// Services

// Types
import { Item, Command, SpwsResponse } from "../../../types";

// Utils

// Local
import { Methods, Operation, Result } from ".";

const sendBatchRequest = async ({
  listName,
  methods,
  onError,
  webURL,
}: {
  listName: string;
  methods: Methods;
  onError: "Continue" | "Return";
  webURL: string;
}): Promise<Operation> => {
  try {
    // Create request object
    const req = new SpwsRequest({
      webService: WebServices.Lists,
      webURL,
      soapAction: "http://schemas.microsoft.com/sharepoint/soap/UpdateListItems",
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
                ${method.command !== "New" ? `<Field Name="ID">${method.ID}</Field>` : ""}
                  ${Object.entries(method.values || {})
                    .map(
                      ([field, value = ""]) =>
                        `<Field Name="${field.slice(0, 32)}">${req.escapeXml(value)}</Field>`
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
    const res: SpwsResponse = await req.send();

    // Create object for data
    const data: { methods: Result[]; success: boolean | null } = {
      methods: [],
      success: null,
    };

    // Default success to true when parsing
    data.success = true;

    // BUG: Potential bug where res.responseXML may be blank???
    data.methods = Array.from(res.responseXML.querySelectorAll("Result")).map((el) => {
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
      let item = {} as Item;

      // Get row
      const row = el.querySelector(`z\\:row, row`);

      // If for is truthy
      if (row) {
        // Create item
        Array.from(row.attributes).forEach(({ name, nodeValue }) => {
          item[name.replace("ows_", "")] = nodeValue || "";
        });
      }

      // Create result data
      const errorCode = el.querySelector("ErrorCode")?.textContent || "";
      const errorText = el.querySelector("ErrorText")?.textContent || "";
      const status = errorCode === "0x00000000" ? "success" : "error";

      // If any methods fail, set the overall success boolean to false
      if (data!.success && status === "error") data!.success = false;

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

    // Resolve request
    return { ...res, data };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default sendBatchRequest;

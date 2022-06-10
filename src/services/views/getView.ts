// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsRequest, SpwsError } from "../../classes";

// Enum
import { WebServices } from "../../enum";

// Types
import { SpwsResponse, ListView } from "../../types";

// Utils
// import {  } from "../../utils";

interface Operation extends SpwsResponse {
  data: ListView;
}

/**
 * Returns the schema of the specified view for the specified list.
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772612(v=office.12)?redirectedfrom=MSDN
 * @param {string} listName A string that contains the internal name of the list.
 * @param {string} [viewName=""] A string that contains the GUID for the view. If the view name is blank, the default view is returned.
 * @example
 * ```
 * const res = await getView("Announcements", "{397586A7-1738-4837-9F5D-4F6D54B4FB39}")
 * ```
 */
const getView = async (
  listName: string,
  viewName: string = "",
  {
    webURL = defaults.webURL,
  }: {
    /** The SharePoint webURL  */
    webURL?: string;
  } = {}
): Promise<Operation> => {
  try {
    // Create request object
    const req = new SpwsRequest({ webService: WebServices.Views, webURL });

    // Create envelope
    req.createEnvelope(
      `<GetView xmlns="http://schemas.microsoft.com/sharepoint/soap/">
        <listName>${listName}</listName>
        <viewName>${viewName}</viewName>
      </GetView>`
    );

    // Send request
    const res = await req.send();

    // Get view as node
    const node = res.responseXML.querySelector("View");

    // Handle invalid response XML
    if (!node) {
      const error = new Error("View was not found in the response XML");
      throw new SpwsError(error);
    }

    // Create the view
    const view = Array.from(node.attributes).reduce(
      (object: { [key: string]: any }, { name, value }) => {
        switch (name as keyof ListView) {
          case "DefaultView":
          case "MobileView":
          case "MobileDefaultView":
            object[name] = value === "TRUE";
            break;

          default:
            object[name] = value;
            break;
        }

        // Return accumulator
        return object;
      },
      {}
    ) as ListView;

    // Create Dom Parsers
    const serializer = new XMLSerializer();

    // Parse Query
    const query = node.querySelector("Query");
    view.Query = query ? serializer.serializeToString(query) : `<Query />`;

    // Parse ViewFields
    view.ViewFields = Array.from(node.querySelectorAll("ViewFields FieldRef"))
      .map((node) => node.getAttribute("Name") || "")
      // Remove empty fields
      .filter((field) => field);

    // Parse ViewFields
    const rowLimit = node.querySelector("RowLimit");
    if (rowLimit)
      view.RowLimit = {
        size: +rowLimit.textContent!,
        Paged: rowLimit.getAttribute("Paged") === "TRUE",
      };

    // Parse Aggregations
    const aggregations = node.querySelector("Aggregations");
    if (aggregations)
      view.Aggregations = {
        Value: aggregations.getAttribute("Value") === "Off" ? "Off" : "On",
      };

    // Return object
    return { ...res, data: view };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default getView;

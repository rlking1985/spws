// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsRequest, SpwsError } from "../../classes";

// Enum
import { WebServices } from "../../enum";

// Services
// import {  } from "../lists";

// Types
import { SpwsResponse } from "../../types";

// Utils
// import {  } from "../../utils";

interface Operation extends SpwsResponse {
  data: object;
}

/**
 * Adds the user to the specified group
 * @param listName A string that contains either the display name or the GUID for the list
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772599(v=office.12)
 * @example
 * ```
 * const res = await getListItems("Task Tracker")
 * ```
 */
const getListItems = async (
  listName: string,
  {
    viewName = "",
    viewFields = [],
    query = `<Query/>`,
    webURL = defaults.webURL,
    queryOptions = `<QueryOptions></QueryOptions>`,
    rowLimit = 0,
  }: {
    /**
     * A string that contains the GUID for the view surrounded by curly braces ({}),
     * which determines the view to use for the default view attributes represented by the query, viewFields, and rowLimit parameters.
     * If this parameter contains an empty string, the default view is used.
     * If the view GUID is supplied, the value of the query, viewFields, or rowLimit parameter overrides the
     * equivalent setting within the view.
     * For example, if the view specified by the viewFields parameter has a row limit of 100 rows but the rowLimit
     * parameter contains 1000, then 1,000 rows are returned in the response.
     */
    viewName?: string;
    /** A Query xml string containing the query that determines which records are returned and in what order */
    query?: string;
    /** An array of strings that specifies which fields to return in the query and in what order */
    viewFields?: string[] | string;
    /** rowLimit */
    rowLimit?: number;
    /** An XML fragment in the following form that contains separate nodes for the various properties of the SPQuery object */
    queryOptions?: string;
    /** The SharePoint webURL  */
    webURL?: string;
  } = {}
): Promise<Operation> => {
  try {
    // Create request object
    const req = new SpwsRequest({ webService: WebServices.Lists, webURL });

    let fields =
      Array.isArray(viewFields) && viewFields.length > 0
        ? viewFields.map((field) => `<FieldRef Name="${field}" />`).join("")
        : `<ViewFields Properties='True' />`;

    console.log(`fields`, fields);

    const envelope = `
    <GetListItems xmlns="http://schemas.microsoft.com/sharepoint/soap/">
      <listName>${listName}</listName>
      <viewName>${viewName}</viewName>
      <query>${query}</query>
      <viewFields>${fields}</viewFields>
      <rowLimit>${rowLimit}</rowLimit>
      <queryOptions>${queryOptions}</queryOptions>
    </GetListItems>`;

    console.log(`envelope`, envelope);
    // Create envelope
    req.createEnvelope(envelope);

    // Send request
    const res = await req.send();
    console.log(`res.responseText`, res.responseText);

    // Create data
    const data = Array.from(res.responseXML.querySelectorAll("z\\:row")).map(
      (row) => {
        console.log(`row`, row);

        // Do something with element
        return {
          key: "value",
        };
      }
    );

    // Return object
    return { ...res, data };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default getListItems;

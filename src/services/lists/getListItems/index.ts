// SPWS Library
import { defaults } from "../../..";

// Classes
import { SpwsRequest, SpwsError } from "../../../classes";

// Enum
import { WebServices, Fields } from "../../../enum";

// Services
// import {  } from "../lists";

// Types
import { SpwsResponse } from "../../../types";

// Utils
// import {  } from "../../utils";

interface Operation extends SpwsResponse {
  data: object;
}

/**
 * Adds the user to the specified group
 * @param listName A string that contains either the display name or the GUID for the list
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772599(v=office.12)
 * @link https://docs.microsoft.com/en-us/openspecs/sharepoint_protocols/ms-listsws/fa650bde-c79b-4a2a-bb5d-c43e74166322?redirectedfrom=MSDN
 * @example
 * ```
 * const res = await getListItems("Task Tracker")
 * ```
 */
const getListItems = async (
  listName: string,
  {
    viewName = "",
    fields = [],
    query = `<Query/>`,
    webURL = defaults.webURL,
    queryOptions,
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
    fields?: string[];
    /** rowLimit */
    rowLimit?: number;
    /** An XML fragment in the following form that contains separate nodes for the various properties of the SPQuery object */
    queryOptions?: {
      /** Specifies the format in which dates are returned.
       * If True, dates returned are in Coordinated Universal Time (UTC) format.
       * If False, dates returned are in [ISO-8601] format. */
      datesInUtc?: boolean;
      /** If set to True, specifies that fields in list items that are lookup fields
       * to the user information list are returned as if they were multi-value lookups,
       * including "Name", "EMail", "SipAddress", and "Title" fields from the user
       * information list for the looked up item. These values are separated by ";#",
       * and any commas in the lookup field name are encoded as ",,". */
      expandUserField?: boolean;
      /** If set to True, the server MUST remove all characters that have an
       * ASCII valuein the range 0-31,other than 9, 10, or 13, in the field values
       * of the list items returned. */
      removeInvalidXmlCharacters?: boolean;
    };
    /** The SharePoint webURL  */
    webURL?: string;
  } = {}
): Promise<Operation> => {
  try {
    // Create request object
    const req = new SpwsRequest({ webService: WebServices.Lists, webURL });

    // Creat viewFields string
    let viewFields = `<ViewFields Properties='True' />`;

    // If true, only specified fields will be returned with data instead of all item attributes
    const parseFields = Array.isArray(fields) && fields.length > 0;

    // If fields is an array and has fields
    if (parseFields) {
      // Create fieldRef string
      const fieldRefs = [...new Set([...fields, Fields.EncodedAbsUrl])]
        .map((field) => `<FieldRef Name="${field}" />`)
        .join("");

      // Wrap fieldRefs with viewFields tag
      viewFields = `<ViewFields>${fieldRefs}</ViewFields>`;
    }

    // Create query string and include <Query/> tags
    const camlQuery = /<query>/i.test(query)
      ? query
      : `<Query>${query}</Query>`;

    // Create queryOptions
    let queryOpt = "<QueryOptions>";
    // If queryOptions are defined
    if (queryOptions) {
      if (typeof queryOptions.datesInUtc !== "undefined")
        queryOpt += `<DatesInUtc>${queryOptions.datesInUtc}</DatesInUtc>`;

      if (typeof queryOptions.expandUserField !== "undefined")
        queryOpt += `<ExpandUserField>${queryOptions.expandUserField}</ExpandUserField>`;

      if (typeof queryOptions.removeInvalidXmlCharacters !== "undefined")
        queryOpt += `<RemoveInvalidXmlCharacters>${queryOptions.removeInvalidXmlCharacters}</RemoveInvalidXmlCharacters>`;
    }
    // Close Query Options Tag
    queryOpt += "</QueryOptions>";

    console.log(`queryOpt`, queryOpt);
    //<QueryOptions></QueryOptions>
    // Create envelope
    req.createEnvelope(`<GetListItems xmlns="http://schemas.microsoft.com/sharepoint/soap/">
      <listName>${listName}</listName>
      <viewName>${viewName}</viewName>
      <query>${camlQuery}</query>
      <viewFields>${viewFields}</viewFields>
      <rowLimit>${rowLimit}</rowLimit>
      <queryOptions>${queryOpt}</queryOptions>
    </GetListItems>`);

    // Send request
    const res = await req.send();

    // Get rows
    const rows = Array.from(res.responseXML.querySelectorAll("z\\:row"));

    // if ()
    // Create data
    const data = parseFields
      ? // Create items with field data
        rows.map((row) => {
          const item = fields.reduce(
            (object: { [key: string]: string }, field) => {
              object[field] = row.getAttribute(`ows_${field}`) || "";
              return object;
            },
            {}
          );
          // Parse Encoded Abs URL

          return item;
        })
      : // Create items with all attributes
        rows.map((row) => {
          const item = Array.from(row.attributes).reduce(
            (object: { [key: string]: string }, { nodeName, nodeValue }) => {
              object[nodeName.replace("ows_", "")] = nodeValue || "";
              return object;
            },
            {}
          );

          // Parse Encoded Abs URL
          return item;
        });

    // Return object
    return { ...res, data };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default getListItems;

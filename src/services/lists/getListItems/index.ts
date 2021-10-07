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
import { parseEncodedAbsUrl } from "../../../utils";

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
      DatesInUtc?: boolean;
      /** If set to True, specifies that fields in list items that are lookup fields
       * to the user information list are returned as if they were multi-value lookups,
       * including "Name", "EMail", "SipAddress", and "Title" fields from the user
       * information list for the looked up item. These values are separated by ";#",
       * and any commas in the lookup field name are encoded as ",,". */
      ExpandUserField?: boolean;
      /** If set to True, the server MUST remove all characters that have an
       * ASCII valuein the range 0-31,other than 9, 10, or 13, in the field values
       * of the list items returned. */
      RemoveInvalidXmlCharacters?: boolean;
      /** Specifies a URL used to filter document library items for items in the specified folder.*/
      Folder?: string;
      /** Specifies that required fields and fields used by specified calculated fields
       * be returned in addition to the fields specified by the viewFields parameter, if set to True */
      IncludeMandatoryColumns?: boolean;
      /** If it is True, the EffectivePermMask attribute is returned when the permissions of a
       * given row differ from the base permissions of the list */
      IncludePermissions?: boolean;
      /** If set to True, specifies that the value returned for the Attachments field is a list of full URLs
       * separated by the delimiter ";#". */
      IncludeAttachmentUrls?: boolean;
      /** This MUST be used only in conjunction with IncludeAttachmentUrls.
       * Specifying True causes the GUID and version number to be returned for attachments that
       * can be used for conflict detection on update. */
      IncludeAttachmentVersion?: boolean;
      /** Specifies how to return lookup values when a list item that is the target of a lookup
       * is in an incomplete or draft state.
       * When False, the data returned will include the current lookup field values
       * When True, the query returns published lookup field values, if present, regardless of
       * whether the list item that is the target of the lookup is in an incomplete or draft state */
      OptimizeLookups?: boolean;
      /** When this element is supplied, it overrides any view attributes that can be retrieved
       * from the persisted view specified by the viewName parameter. */
      ViewAttributes?: boolean;
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

    // Array literal to store fields if parseFields is true
    let fieldsClone: string[] = [];

    // If fields is an array and has fields
    if (parseFields) {
      // Add to fields clone
      fieldsClone = [...new Set([...fields, Fields.EncodedAbsUrl])];

      // Create fieldRef string
      const fieldRefs = fieldsClone
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
      // Iterate through all queryOptions
      Object.entries(queryOptions).forEach(([tagName, value]) => {
        // If value is not undefined
        if (typeof value !== "undefined") {
          // Add to query opt string
          queryOpt += `<${tagName}>${value}</${tagName}>`;
        }
      });
    }
    // Close Query Options Tag
    queryOpt += "</QueryOptions>";

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

    // Create data
    const data = parseFields
      ? // Create items with field data
        rows.map((row) => {
          let item = fieldsClone.reduce(
            (object: { [key: string]: string }, field) => {
              object[field] = row.getAttribute(`ows_${field}`) || "";
              return object;
            },
            {}
          );
          console.log(`item`, item);
          // Parse Encoded Abs URL
          item = { ...item, ...parseEncodedAbsUrl(item.EncodedAbsUrl) };

          return item;
        })
      : // Create items with all attributes
        rows.map((row) => {
          let item = Array.from(row.attributes).reduce(
            (object: { [key: string]: string }, { nodeName, nodeValue }) => {
              object[nodeName.replace("ows_", "")] = nodeValue || "";
              return object;
            },
            {}
          );

          // Parse Encoded Abs URL
          item = { ...item, ...parseEncodedAbsUrl(item.EncodedAbsUrl) };

          return item;
        });

    // Return object
    return { ...res, data };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default getListItems;

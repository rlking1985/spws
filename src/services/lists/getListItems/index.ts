// Libraries
import { defaults, getListViewThreshold, getLastItemID, getFirstItemID } from "../../..";
// TODO: Remove this library dependency
import CamlBuilder from "camljs";

// Classes
import { SpwsRequest, SpwsError } from "../../../classes";

// Enum
import { WebServices, Fields } from "../../../enum";

// Types
import { Item, SpwsBatchResponse } from "../../../types";

// Utils
import { asyncForEach } from "../../../utils";

// Local
import sendRequest from "./sendRequest";

interface Operation extends SpwsBatchResponse {
  data: Item[];
}

export type GetListItemsOptions = {
  /** The SharePoint webURL  */
  webURL?: string;
  /**
   * If true, requests are batched to not exceed the list view threshold.
   * Batch sizes are automatically assigned to match the list view threshold limit.
   */
  batch?: boolean;
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
  };
};

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
    batch = false,
    viewName = "",
    fields = [],
    query = `<Query/>`,
    webURL = defaults.webURL,
    queryOptions,
    rowLimit = 0,
  }: GetListItemsOptions = {}
): Promise<Operation> => {
  try {
    // Validate type
    if (typeof listName !== "string")
      throw new SpwsError({
        message: `Expected string for listName but received ${typeof listName}`,
      });

    // Validate truthy string
    if (!listName)
      throw new SpwsError({
        message: "Expected listName to be a valid string but received an empty string",
      });

    // Validate fields
    if (fields && !Array.isArray(fields))
      throw new SpwsError({
        message: `Expected fields to be an array but recieved ${typeof fields}`,
      });

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
      const fieldRefs = fieldsClone.map((field) => `<FieldRef Name="${field}" />`).join("");

      // Wrap fieldRefs with viewFields tag
      viewFields = `<ViewFields>${fieldRefs}</ViewFields>`;
    }

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

    // Create query string and include <Query/> tags
    const camlQuery = /<query>|<\/query>|<query\/>/i.test(query)
      ? query
      : `<Query>${query}</Query>`;

    // Create variables to handle batching
    let lastItemID = 0;
    let firstItemID = 0;
    let batchCount = 1;
    let listViewThreshold = 0;

    // If batch is true
    if (batch) {
      // TODO: Add LVT result to internal cache so we don't request this over and over
      // Get list view threshold
      const { data: viewThreshold } = await getListViewThreshold(listName);
      listViewThreshold = viewThreshold;

      // Get last item ID
      const { data: lastID } = await getLastItemID(listName);
      lastItemID = lastID;

      // Get first item ID
      const { data: firstID } = await getFirstItemID(listName);
      firstItemID = firstID;

      // Calculate batchCount
      batchCount = Math.ceil((lastItemID - firstID) / viewThreshold);
    }

    // Create batches array
    const batches = Array.from(new Array(batchCount));

    // Create response object
    const response: Operation = {
      data: [],
      responseText: [],
      responseXML: [],
      status: [],
      statusText: [],
      envelope: [],
    };

    // Iterate over all batches
    await asyncForEach(batches, async (b, index) => {
      // Create request payload
      let payload = {
        listName,
        viewName,
        camlQuery,
        viewFields,
        rowLimit,
        queryOpt,
        parseFields,
        fields: fieldsClone,
        req: new SpwsRequest({ webService: WebServices.Lists, webURL }),
      };

      // if (index > 0) return;
      if (batch) {
        // Get from the first ID (-1)
        let fromID = firstItemID + listViewThreshold * index - 1;
        // Add the list view threshold (-1)
        let toID = firstItemID + (listViewThreshold - 1) * (index + 1);
        // Use lastItemID if the less than the toID
        if (toID > lastItemID) toID = lastItemID;

        // If the query has no children
        if (camlQuery.length < 15) {
          payload.camlQuery = `<Query>${new CamlBuilder()
            .Where()
            .CounterField("ID")
            .GreaterThan(fromID)
            .And()
            .CounterField("ID")
            .LessThanOrEqualTo(toID)
            .ToString()}</Query>`;
        } else {
          // Append to the query if it had children
          payload.camlQuery = CamlBuilder.FromXml(camlQuery)
            .ModifyWhere()
            .AppendAnd()
            .CounterField("ID")
            .GreaterThan(fromID)
            .And()
            .CounterField("ID")
            .LessThanOrEqualTo(toID)
            .ToString();
        }
      }
      // Send Request (using local function)
      const res = await sendRequest(payload);

      // Push to responses
      response.data.push(...res.data);
      response.responseText.push(res.responseText);
      response.responseXML.push(res.responseXML);
      response.status.push(res.status);
      response.statusText.push(res.statusText);
      response.envelope!.push(res.envelope!);
    });

    // Return response
    return response;
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default getListItems;

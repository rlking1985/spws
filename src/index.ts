export * from "./services/lists";
export * from "./services/userGroup";
declare global {
  interface Window {
    readonly L_Menu_BaseUrl: string;
    readonly _spUserId?: number;
  }
}

/**
 * The default options used in every web request.
 * These can be changed globally or passed to specific requests.
 * @example Set the webURL to your current site instead of the root of the site collection.
 * ```
 * import { defaults } from "spws";
 * defaults.webURL = "/sites/my-site"
 * ```
 */
export const defaults: {
  /**
   * The absolute or relative webURL.
   * @default ""
   */
  webURL: string;
  /** An XML fragment in the following form that contains separate nodes for the various properties of the SPQuery object */
  queryOptions: {
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
} = {
  webURL: "",
  queryOptions: {},
};

/** The data type of the field. Windows SharePoint Services includes the following data types by default */
export type FieldType =
  | "AllDayEvent"
  | "Attachments"
  | "Boolean"
  | "Calculated"
  | "Choice"
  | "Computed"
  | "ContentTypeId"
  | "Counter"
  | "CrossProjectLink"
  | "Currency"
  | "DateTime"
  | "File"
  | "GridChoice"
  | "Guid"
  | "Integer"
  | "Lookup"
  | "LookupMulti"
  | "ModStat"
  | "MultiChoice"
  | "MultiColumn"
  | "Note"
  | "Number"
  | "PageSeparator"
  | "Recurrence"
  | "Text"
  | "ThreadIndex"
  | "Threading"
  | "URL"
  | "User"
  | "UserMulti"
  | "WorkflowEventType"
  | "WorkflowStatus";

/**
 * Defines the internal data types used in the list infrastructure of a SharePoint Web site.
 * A field is a column or attribute of information that a user can add to a list.
 *
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms437580(v=office.12)
 */
type Field = {
  [key: string]: string | boolean | number | unknown;
  Choices?: string[];
  Aggregation?:
    | "sum"
    | "count"
    | "average"
    | "min"
    | "max"
    | "merge"
    | "plaintext"
    | "first"
    | "last";
  AllowDeletion?: boolean;
  AllowHyperlink?: boolean;
  AllowMultiVote?: boolean;
  AppendOnly?: boolean;
  AuthoringInfo?: string;
  BaseType?: number | string;
  CalType?: number;
  CanToggleHidden?: boolean;
  ClassInfo?: string;
  ColName?: string;
  Commas?: boolean;
  Decimals?: number;
  Default?: any;
  Description?: string;
  Dir?: string;
  DisplaceOnUpgrade?: boolean;
  DisplayImage?: string;
  DisplayName?: string;
  DisplayNameSrcField?: string;
  Div?: number;
  EnableLookup?: boolean;
  ExceptionImage?: string;
  FieldRef?: string;
  FillInChoice?: boolean;
  Filterable?: boolean;
  FilterableNoRecurrence?: boolean;
  ForcedDisplay?: string;
  Format?: string;
  FromBaseType?: boolean;
  Group?: string;
  HeaderImage?: string;
  Height?: number;
  Hidden?: boolean;
  HTMLEncode?: boolean;
  ID?: string;
  IMEMode?: string;
  Indexed?: boolean;
  IsolateStyles?: boolean;
  JoinColName?: string;
  JoinRowOrdinal?: number;
  JoinType?: "INNER" | "LEFT OUTER" | "RIGHT OUTER";
  LCID?: number;
  List?: string;
  Max?: number;
  MaxLength?: number;
  Min?: number;
  Mult?: boolean;
  Name?: string;
  NegativeFormat?: "MinusSign" | "Parens";
  Node?: string;
  NoEditFormBreak?: boolean;
  NumLines?: number;
  Percentage?: boolean;
  PIAttribute?: string;
  PITarget?: string;
  PrependId?: boolean;
  Presence?: boolean;
  PrimaryKey?: boolean;
  PrimaryPIAttribute?: string;
  PrimaryPITarget?: string;
  ReadOnly?: boolean;
  ReadOnlyEnforced?: boolean;
  RenderXMLUsingPattern?: boolean;
  Required?: boolean;
  RestrictedMode?: boolean;
  ResultType?: string;
  RichText?: boolean;
  RichTextMode?: string;
  RowOrdinal?: number;
  Sealed?: boolean;
  SeparateLine?: boolean;
  SetAs?: string;
  ShowAddressBookButton?: boolean;
  ShowField?: string;
  ShowInDisplayForm?: boolean;
  ShowInEditForm?: boolean;
  ShowInFileDlg?: boolean;
  ShowInListSettings?: boolean;
  ShowInNewForm?: boolean;
  ShowInVersionHistory?: boolean;
  ShowInViewForms?: boolean;
  Sortable?: boolean;
  SourceID?: string;
  StaticName?: string;
  StorageTZ?: boolean;
  StripWS?: boolean;
  SuppressNameDisplay?: boolean;
  TextOnly?: boolean;
  Title?: string;
  Type?: FieldType;
  UniqueId?: string;
  UnlimitedLengthInDocumentLibrary?: boolean;
  URLEncode?: boolean;
  URLEncodeAsUrl?: boolean;
  UserSelectionMode?: string;
  UserSelectionScope?: number;
  Viewable?: boolean;
  Width?: number;
  WikiLinking?: boolean;
  XName?: string;
};

export default Field;

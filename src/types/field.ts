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
  /** -1 for automatic */
  Decimals?: -1 | 0 | 1 | 2 | 3 | 4 | 5;
  Default?: any;
  Description?: string;
  Dir?: "LTR" | "RTL";
  DisplaceOnUpgrade?: boolean;
  DisplayImage?: string;
  DisplayName?: string;
  /**
   * Contains the default formula used for a field.
   * https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2010/ms455738(v=office.14)
   * */
  DefaultFormula?: string;
  /**
   * Contains the default value for a field that has a formula.
   * https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2010/ms438854(v=office.14)
   */
  DefaultFormulaValue?: string;
  DisplayNameSrcField?: string;
  Div?: number;
  EnableLookup?: boolean;
  EnforceUniqueValues?: boolean;
  ExceptionImage?: string;
  FieldRef?: string;
  FillInChoice?: boolean;
  Filterable?: boolean;
  FilterableNoRecurrence?: boolean;
  ForcedDisplay?: string;
  Format?: "DateOnly" | "DateTime" | "ISO8601" | "ISO8601Basic";
  /**
   * XML String
   * https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2010/ms454057(v=office.14)
   * https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2010/ms467801(v=office.14)
   */
  Formula?: string;
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
  ListItemMenu?: boolean;
  Max?: number;
  // prettier-ignore
  MaxLength?:  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 132 | 133 | 134 | 135 | 136 | 137 | 138 | 139 | 140 | 141 | 142 | 143 | 144 | 145 | 146 | 147 | 148 | 149 | 150 | 151 | 152 | 153 | 154 | 155 | 156 | 157 | 158 | 159 | 160 | 161 | 162 | 163 | 164 | 165 | 166 | 167 | 168 | 169 | 170 | 171 | 172 | 173 | 174 | 175 | 176 | 177 | 178 | 179 | 180 | 181 | 182 | 183 | 184 | 185 | 186 | 187 | 188 | 189 | 190 | 191 | 192 | 193 | 194 | 195 | 196 | 197 | 198 | 199 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 209 | 210 | 211 | 212 | 213 | 214 | 215 | 216 | 217 | 218 | 219 | 220 | 221 | 222 | 223 | 224 | 225 | 226 | 227 | 228 | 229 | 230 | 231 | 232 | 233 | 234 | 235 | 236 | 237 | 238 | 239 | 240 | 241 | 242 | 243 | 244 | 245 | 246 | 247 | 248 | 249 | 250 | 251 | 252 | 253 | 254 | 255;
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
  ResultType?: "Text" | "Number" | "Currency" | "DateTime" | "Boolean";
  RichText?: boolean;
  RichTextMode?: "Text" | "FullHtml";
  RowOrdinal?: number;
  Sealed?: boolean;
  SeparateLine?: boolean;
  SetAs?: string;
  ShowAddressBookButton?: boolean;
  ShowField?:
    | "Title"
    | "Name"
    | "EMail"
    | "MobilePhone"
    | "SipAddress"
    | "Department"
    | "JobTitle"
    | "FirstName"
    | "LastName"
    | "WorkPhone"
    | "UserName"
    | "Office"
    | "ID"
    | "Modified"
    | "Created"
    | "ImnName"
    | "NameWithPicture"
    | "NameWithPictureAndDetails"
    | "ContentTypeDisp";
  ShowInDisplayForm?: boolean;
  ShowInEditForm?: boolean;
  /**
   * This attribute is valid only for fields within document library schemas.
   * If false, the field does not show up in the property dialog box for saving forms
   * that appears when saving from client applications.
   * For example, the Title field has this attribute because this is set directly in the document
   * being saved to the document library.
   */
  ShowInFileDlg?: boolean;
  ShowInListSettings?: boolean;
  ShowInNewForm?: boolean;
  /** If false, the column is hidden in version history. */
  ShowInVersionHistory?: boolean;
  /** If false, fields are not visible in views. They are still visible in forms. */
  ShowInViewForms?: boolean;
  LinkToItem?: boolean;
  Sortable?: boolean;
  SourceID?: string;
  StaticName?: string;
  StorageTZ?: "UTC" | "Abstract";
  StripWS?: boolean;
  SuppressNameDisplay?: boolean;
  TextOnly?: boolean;
  Title?: string;
  Type?: FieldType;
  UniqueId?: string;
  UnlimitedLengthInDocumentLibrary?: boolean;
  URLEncode?: boolean;
  URLEncodeAsUrl?: boolean;
  /**
   * 0 - Only the names of individuals can be selected.
   * 1 - The names of both individuals and groups can be selected.
   */
  UserSelectionMode?: 0 | 1;
  /**
   * Optional Integer.
   * Specifies a scope for selecting user names in a user field on an item form.
   * If the value is 0, there is no restriction to a SharePoint group.
   * If the value is greater than 0, user selection is restricted to members of the
   * SharePoint group whose ID equals the value that is specified.
   */
  UserSelectionScope?: number;
  Validation?: string;
  Version?: number;
  Viewable?: boolean;
  Width?: number;
  WikiLinking?: boolean;
  XName?: string;
};

export default Field;

// SPWS Library
import { defaults } from "../../..";

// Classes
import { SpwsRequest, SpwsError } from "../../../classes";

// Enum
import { WebServices } from "../../../enum";

// Types
import { SpwsResponse, FieldType, Field as SpwsField } from "../../../types";

// Functions
import createFieldsXml from "./createFieldsXml";

interface Operation extends SpwsResponse {
  data: { success: boolean };
}

export type ListProperties = {
  // 	true to allow multiple responses to the survey.
  AllowMultiResponses?: boolean;
  // A string that contains the description for the list.
  Description?: string;
  // A string that contains LTR if the reading order is left-to-right, RTL if it is right-to-left, or None.
  Direction?: "LTR" | "RTL" | "none";
  // true to enable assigned-to e-mail for the issues list.
  EnableAssignedToEmail?: boolean;
  // true to enable attachments to items in the list. Does not apply to document libraries.
  EnableAttachments?: boolean;
  // true to enable Content Approval for the list.
  EnableModeration?: boolean;
  // true to enable versioning for the list.
  EnableVersioning?: boolean;
  // true to hide the list so that it does not appear on the Documents and Lists page, Quick Launch bar, Modify Site Content page, or Add Column page as an option for lookup fields.
  Hidden?: boolean;
  // true to specify that the list in a Meeting Workspace site contains data for multiple meeting instances within the site.
  MultipleDataList?: boolean;
  // true to specify that the option to allow users to reorder items in the list is available on the Edit View page for the list.
  Ordered?: boolean;
  // true to specify that names of users are shown in the results of the survey.
  ShowUser?: boolean;
  // A string that contains the title of the list.
  Title?: string;
};

export type Field = {
  StaticName: string;
  DisplayName: string;
  Type: FieldType;
} & Pick<
  SpwsField,
  | "AllowDeletion"
  | "Choices"
  | "Default"
  | "DefaultFormula"
  | "DefaultFormulaValue"
  | "Description"
  | "EnforceUniqueValues" // Column must be indexed first or error will occur
  | "FillInChoice"
  | "Filterable"
  | "Format"
  | "Formula"
  | "Formula" // When using formula a result type is required
  | "Hidden" // Deprecated. use Sealed unless the field is 'Title'
  | "Indexed" // Deleting an indexed field will cause a unfixable breaking error in the list
  | "LinkToItem"
  | "ListItemMenu"
  | "Max"
  | "MaxLength"
  | "Min"
  | "Mult"
  | "NumLines"
  | "Percentage"
  | "Required"
  | "ResultType" // Required when using a formula
  | "RichText"
  | "RichTextMode"
  | "Sealed" // Supersedes AllowDeletion but does not work on Title field
  | "ShowField"
  | "ShowInDisplayForm"
  | "ShowInEditForm"
  | "ShowInFileDlg"
  | "ShowInNewForm"
  | "ShowInVersionHistory"
  | "ShowInViewForms"
  | "Sortable"
  | "UnlimitedLengthInDocumentLibrary"
  | "UserSelectionMode"
  | "UserSelectionScope"
  | "Validation"
  | "Version"
>;

export interface NewField extends Field {
  StaticName: string;
  DisplayName: string;
  Type: FieldType;
}

export interface UpdateField extends Field {
  StaticName: string;
  Type: FieldType;
  // Must have a display name, else, the display name is cleared
  DisplayName: string;
}

/** An array of static names */
type DeleteField = string;

// Create List Params
type UpdateListParams = {
  /** A string that contains the Display Name or GUID for the list. */
  listName: string;
  /** The SharePoint webURL */
  webURL?: string;
  /** List Properties */
  listProperties?: ListProperties;
  /** New Fields */
  newFields?: NewField[];
  /** Update Fields */
  updateFields?: UpdateField[];
  /** Delete Fields */
  deleteFields?: DeleteField[];
};

/**
 * Updates a list based on the specified field definitions and list properties.
 *
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774660(v=office.12)
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2010/ms437580(v=office.14)
 * @example
 * ```
 * // Update list
 * const res = await updateList({
 *  listName: "Announcements",
 *  webURL: "/sites/other",
 *  listProperties: { Description: "Demo description" },
 *  deleteFields: ["Age"],
 *  newFields: [
 *    {
 *      StaticName: "DateOfBirth",
 *      DisplayName: "Date of Birth",
 *      Type: "DateTime",
 *      Format: "DateOnly",
 *    },
 *  ],
 *});
 * ```
 */
const updateList = async ({
  listName,
  webURL = defaults.webURL,
  listProperties = {},
  deleteFields = [],
  newFields = [],
  updateFields = [],
}: UpdateListParams): Promise<Operation> => {
  // Create request object
  const req = new SpwsRequest({
    webService: WebServices.Lists,
    webURL,
    soapAction: "http://schemas.microsoft.com/sharepoint/soap/UpdateList",
  });

  // Create envelope
  req.createEnvelope(
    `<UpdateList xmlns="http://schemas.microsoft.com/sharepoint/soap/">
      <listName>${listName}</listName>
      <listProperties>
       <List 
       ${Object.entries(listProperties).reduce((string, [key, prop]) => {
         string += `${key}="${prop}" `;
         return string;
       }, "")}
       />
      </listProperties>
      <newFields>${createFieldsXml(
        newFields.map((object) => {
          // Clone field
          let field = { ...object };
          field.DisplayName = field.StaticName || field.DisplayName;
          return field;
        }),
        "New"
      )}</newFields>
      <updateFields>${createFieldsXml(updateFields, "Update")}</updateFields>
      <deleteFields><Fields>${deleteFields
        .map(
          (field, index) =>
            `<Method ID="${index + 1}"><Field Name="${field}"/></Method>`
        )
        .join("")}</Fields></deleteFields>
      <listVersion></listVersion>
    </UpdateList>
`
  );

  try {
    // Send request
    const res = await req.send();

    // If new fields were defined and static names are different to display names
    if (
      newFields.length > 0 &&
      newFields.some(
        ({ StaticName, DisplayName }) => StaticName !== DisplayName
      )
    ) {
      try {
        // Resend the update to set correct display names
        await updateList({ listName, updateFields: newFields, webURL });
      } catch (error) {
        console.error(error);
      }
    }

    // Return result
    return { ...res, data: { success: true } };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default updateList;

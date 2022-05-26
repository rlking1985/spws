// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsRequest, SpwsError } from "../../classes";

// Enum
import { WebServices } from "../../enum";

// Types
import { SpwsResponse, FieldType, Field as SpwsField, KnownKeys } from "../../types";

interface Operation extends SpwsResponse {
  data: undefined;
}

export type ListProperties = {
  // 	true to allow multiple responses to the survey.
  AllowMultiResponses?: boolean;
  // A string that contains the description for the list.
  Description?: string;
  // A string that contains LTR if the reading order is left-to-right, RTL if it is right-to-left, or None.
  Direction?: "LTR" | "RTL" | "None";
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
type Command = "Update" | "New" | "Delete";
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
 * Creates an xml fields string
 */
const createFieldsXml = (fields: NewField[] | UpdateField[], type: Command) => {
  // Keys that are excluded based on type of operation (command)
  const excludedKeys: (keyof KnownKeys<SpwsField>)[] = [
    "Choices",
    "Default",
    "DefaultFormula",
    "Formula",
    "Validation",
    "Name",
  ];
  switch (type) {
    case "New":
      excludedKeys.push("EnforceUniqueValues", "Filterable");
      break;

    default:
      break;
  }

  // Create xml
  const xml = fields
    // Iterate through each field
    .map((field, index) => {
      // Create field xml string
      let fieldXml = "";

      switch (type) {
        case "Delete":
          fieldXml = `<Field Name="${field.StaticName}"/>`;
          break;

        case "New":
        case "Update":
          // Create field xml string
          fieldXml = `<Field Name="${field.StaticName}" ${Object.entries(field).reduce(
            // Iterate through each field key and prop
            (string, [key, prop]: [any, any]) => {
              // Get value from prop
              let value: string = "";
              let fieldKey: keyof KnownKeys<SpwsField> = key;

              // Exclude keys which are not allowed
              if (excludedKeys.includes(fieldKey)) return string;

              // Switch by type of prop
              switch (typeof prop) {
                case "boolean":
                  value = prop ? "TRUE" : "FALSE";
                  break;

                default:
                  value = prop;
                  break;
              }

              // Append to string
              string += `${fieldKey}="${value}" `;

              // Return string (accumulator)
              return string;
            },
            ""
          )}>`;
          break;
      }

      // Handle Field Types
      switch (field.Type) {
        case "Calculated":
          if (typeof field.Formula === "string") fieldXml += field.Formula;
          break;

        case "Choice":
        case "MultiChoice":
          // Handle Choice Fields
          if (Array.isArray(field.Choices))
            fieldXml += `<CHOICES>${field.Choices.map(
              (choice) => `<CHOICE>${choice}</CHOICE>`
            ).join("")}</CHOICES>`;

          break;

        default:
          break;
      }

      // Handle Child Elements
      if (typeof field.Validation === "string") fieldXml += field.Validation;
      if (typeof field.DefaultFormula === "string")
        fieldXml += `<DefaultFormula>${field.DefaultFormula}</DefaultFormula>`;
      if (typeof field.DefaultFormulaValue === "string")
        fieldXml += `<DefaultFormulaValue>${field.DefaultFormulaValue}</DefaultFormulaValue>`;

      if (typeof field.Default === "string") fieldXml += `<Default>${field.Default}</Default>`;

      // Append to fieldXml
      fieldXml += "</Field>";

      // Return method
      return `<Method ID="${index + 1}">${fieldXml}</Method>
     `;
    })
    .join("");

  // Return xml
  return `<Fields>${xml}</Fields>`;
};

/**
 * Updates a list based on the specified field definitions and list properties.
 *
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774660(v=office.12)
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2010/ms437580(v=office.14)
 * @example
 * ```
 * // Update list
 * const res = await getListCollection()
 *
 * // Get list collection for another site
 * const res = await getListCollection({ webURL: "/sites/other" })
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
        .map((field, index) => `<Method ID="${index + 1}"><Field Name="${field}"/></Method>`)
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
      newFields.some(({ StaticName, DisplayName }) => StaticName !== DisplayName)
    ) {
      try {
        // Resend the update to set correct display names
        await updateList({ listName, updateFields: newFields });
      } catch (error) {
        console.error(error);
      }
    }

    // Return result
    return { ...res, data: undefined };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default updateList;

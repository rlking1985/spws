// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsRequest, SpwsError } from "../../classes";

// Enum
import { WebServices } from "../../enum";

// Types
import { List, ListCollection, SpwsResponse, Field, FieldType } from "../../types";

interface Operation extends SpwsResponse {
  data: undefined;
}

type ListProperties = {
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

interface NewField extends Field {
  StaticName: string;
  // Sharepoint Bug that creates the display name as the static name.
  DisplayName: string;
  Type: FieldType;
}

type UpdateListParams = {
  /** A string that contains the Display Name or GUID for the list. */
  listName: string;
  /** The SharePoint webURL */
  webURL?: string;
  /** List Properties */
  listProperties?: ListProperties;
  /** New Fields */
  newFields?: NewField[];
};

const createFieldsXml = (fields: NewField[]) => {
  const xml = fields
    .map((field, index) => {
      return `<Fields>
       <Method ID="${index + 1}">
       
      <Field Name="${field.StaticName}" ${Object.entries(field).reduce((string, [key, prop]) => {
        string += `${key}="${prop}" `;
        return string;
      }, "")}/>


       </Method>
    
    
       </Fields>
     `;
    })
    .join("");
  console.log("xml :>> ", xml);
  return xml;
};

/**
 * Updates a list based on the specified field definitions and list properties.
 *
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774660(v=office.12)
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
  newFields = [],
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
      <newFields>${createFieldsXml(newFields)}</newFields>
      <updateFields></updateFields>
      <deleteFields></deleteFields>
      <listVersion></listVersion>
    </UpdateList>
`
  );

  try {
    const res = await req.send();
    console.log("res :>> ", res.responseText);
    // Create data object
    // const data = Array.from(res.responseXML.querySelectorAll("List")).map((list) => {
    //   return Array.from(list.attributes).reduce((object: List, { name, value }) => {
    //     object[name] = value;
    //     return object;
    //   }, {});
    // });

    return { ...res, data: undefined };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default updateList;

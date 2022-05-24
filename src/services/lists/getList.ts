// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsRequest, SpwsError } from "../../classes";

// Enum
import { Field as FieldEnum, ListAttributes as ListAttributesEnum, WebServices } from "../../enum";

// Services

// Types
import { Field as ListField, List, ListAttributes, SpwsResponse, FieldType } from "../../types";

// Utils
import { escapeXml } from "../../utils";

interface Operation extends SpwsResponse {
  data: List;
}

/**
 * Returns a schema for the specified list.
 *
 * @param listName The list display name or GUID
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772709(v=office.12)
 * @example
 * ```
 * // Get list using default parameters
 * const list = await getList({ listName: "Announcements" });
 * // Get list on another site
 * const list = await getList({ listName: "Announcements", webURL: "/sites/hr" });
 * // Get list with only the Title and Fields attributes parsed
 * const list = await getList({ listName: "Title", attributes: ["Title", "Fields"] })
 * ```
 */
const getList = async (
  listName: string,
  {
    webURL = defaults.webURL,
    attributes = [],
  }: {
    /** The SharePoint web URL */
    webURL?: string;
    /** The list attributes that should be returned in the data object */
    attributes?: ListAttributes[];
  } = {}
): Promise<Operation> => {
  // Create request object
  const req = new SpwsRequest({ webService: WebServices.Lists, webURL });

  // Create envelope
  req.createEnvelope(
    `<GetList xmlns="http://schemas.microsoft.com/sharepoint/soap/"><listName>${escapeXml(
      listName
    )}</listName></GetList>`
  );

  try {
    // Return request
    const res = await req.send();

    // Check that list exists
    const list = res.responseXML.querySelector("List");

    // If the list cannot be found
    if (!list) throw new SpwsError(res);

    // Create array of attributes either from params or all of the list attributes
    const attributesArray =
      attributes.length > 0 ? attributes : Array.from(list.attributes).map((el) => el.name);

    // Create data object with only specified attributes
    const data = attributesArray.reduce((object: List, attribute) => {
      object[attribute] = list.getAttribute(attribute) || "";
      return object;
    }, {});

    // If the attributes param is empty, or it included fields
    if (attributes.length === 0 || attributes.includes(ListAttributesEnum.Fields))
      // Add fields to data
      data[ListAttributesEnum.Fields] = Array.from(
        // Field attributes must be an array
        list.querySelectorAll(`${ListAttributesEnum.Fields} > Field`)
      ).map((fieldElement) => {
        // Create field object
        let field: ListField = {};

        // Get the default element
        const defaultElement = fieldElement.querySelector("Default");

        // Set the default field value
        field.Default = defaultElement ? defaultElement.textContent || "" : undefined;

        // Get the field type
        const fieldType = fieldElement.getAttribute(FieldEnum.Type) as FieldType;

        // If the field type is a choice field
        if (fieldType === "Choice" || fieldType === "MultiChoice") {
          // Add choicess to the field
          field.Choices = Array.from(fieldElement.querySelectorAll("CHOICE"))
            // Return text content
            .map(({ textContent }) => textContent!)
            // Remove empty choices
            .filter((choice) => choice);
        }

        // Reduce field from available attributes
        return Array.from(fieldElement.attributes).reduce((object: ListField, element) => {
          // Get field name and value
          const key = element.nodeName;
          let value: string | boolean = element.textContent || "";

          // If the value is true or false
          if (["TRUE", "FALSE"].includes(value)) {
            // Cast to boolean
            value = value === "TRUE";
          }

          // Assign key and prop
          object[key] = value;
          return object;
        }, field);
      });

    return {
      ...res,
      data,
    };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default getList;

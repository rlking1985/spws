// Classes
import { SpwsError } from "../../../classes";

// Enum
import {
  Field as FieldEnum,
  ListAttributes as ListAttributesEnum,
} from "../../../enum";

// Services

// Types
import {
  Field as ListField,
  FieldType,
  List,
  ListAttributes,
  SpwsResponse,
} from "../../../types";

// Utils
import getListStaticName from "../../../utils/getListStaticName";

// Create type
type Params = { res: SpwsResponse; attributes?: ListAttributes[] };

/**
 * Parses a list from the provided parameters.
 *
 * @param params - The parameters for parsing the list.
 * @param params.res - The response object containing the XML data.
 * @param params.attributes - An optional array of attribute names to include in the parsed data.
 *
 * @returns An object containing the parsed list data.
 *
 * @throws {SpwsError} If the list cannot be found in the response XML.
 *
 * @remarks
 * - If the `attributes` parameter is empty or includes `StaticName`, the function attempts to get the static name.
 * - If the `attributes` parameter is empty or includes `Fields`, the function adds fields to the data.
 * - The function handles various child elements such as Choices, Validation, DefaultFormula, DefaultFormulaValue, Default, and Formula.
 */
const parseList = (params: Params) => {
  // Destructure params
  const { res, attributes = [] } = params;

  // Check that list exists
  const list = res.responseXML.querySelector("List");

  // If the list cannot be found
  if (!list) throw new SpwsError(res);

  // Create array of attributes either from params or all of the list attributes
  const attributesArray =
    attributes.length > 0
      ? attributes
      : Array.from(list.attributes).map((el) => el.name);

  // Create data object with only specified attributes
  const data = attributesArray.reduce((object: List, attribute) => {
    object[attribute] = list.getAttribute(attribute) || "";
    return object;
  }, {});

  // If the attributes param is empty, or it included StaticName
  if (attributes.length === 0 || attributes.includes("StaticName")) {
    // Try to get the static name
    try {
      data.StaticName = getListStaticName({
        DefaultViewUrl: data.DefaultViewUrl!,
        Title: data.Title!,
      });
    } catch (error) {
      // On error do nothing
    }
  }

  // Create parser
  const serializer = new XMLSerializer();

  // If the attributes param is empty, or it included fields
  if (attributes.length === 0 || attributes.includes(ListAttributesEnum.Fields))
    // Add fields to data
    data[ListAttributesEnum.Fields] = Array.from(
      // Field attributes must be an array
      list.querySelectorAll(`${ListAttributesEnum.Fields} > Field`)
    ).map((fieldElement) => {
      // Create field object
      let field: ListField = {};

      // Get the field type
      const fieldType = fieldElement.getAttribute(FieldEnum.Type) as FieldType;

      // Reduce field from available attributes
      field = Array.from(fieldElement.attributes).reduce(
        (object: ListField, element) => {
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
        },
        field
      );

      // Handle Child Elements: Choices
      if (fieldType === "Choice" || fieldType === "MultiChoice") {
        // Add choicess to the field
        field.Choices = Array.from(fieldElement.querySelectorAll("CHOICE"))
          // Return text content
          .map(({ textContent }) => textContent!)
          // Remove empty choices
          .filter((choice) => choice);
      }

      // Handle Child Elements: Validation
      const validation = fieldElement.querySelector("Validation");
      if (validation)
        field.Validation = serializer.serializeToString(validation);

      // Handle Child Elements: Default Formula
      const defaultFormula = fieldElement.querySelector("DefaultFormula");
      if (defaultFormula)
        field.DefaultFormula = defaultFormula.textContent || "";

      // Handle Child Elements: Default Formula Value
      const defaultFormulaValue = fieldElement.querySelector(
        "DefaultFormulaValue"
      );
      if (defaultFormulaValue)
        field.DefaultFormulaValue = defaultFormulaValue.textContent || "";

      // Handle Child Elements: Default Value
      const defaultValue = fieldElement.querySelector("Default");
      if (defaultValue) field.Default = defaultValue.textContent || "";

      // Handle Child Elements: Formula
      if (field.Type === "Calculated") {
        // String to store formula xml
        let xml = "";

        // Check each xml node and append to xml string
        const formula = fieldElement.querySelector("Formula");
        if (formula) xml += serializer.serializeToString(formula);
        const formulaDisplayNames = fieldElement.querySelector(
          "FormulaDisplayNames"
        );
        if (formulaDisplayNames)
          xml += serializer.serializeToString(formulaDisplayNames);
        const fieldRefs = fieldElement.querySelector("FieldRefs");
        if (fieldRefs) xml += serializer.serializeToString(fieldRefs);

        // If xml string is truthy, assign to field
        if (xml) field.Formula = xml;
      }

      // Return
      return field;
    });

  return data;
};

export default parseList;

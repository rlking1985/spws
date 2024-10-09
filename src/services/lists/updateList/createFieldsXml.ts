// Types
import { Field as SpwsField, Command, KnownKeys } from "../../../types";
import { UpdateField, NewField } from ".";

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
          fieldXml = `<Field Name="${field.StaticName}" ${Object.entries(
            field
          ).reduce(
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

      if (typeof field.Default === "string")
        fieldXml += `<Default>${field.Default}</Default>`;

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


export default createFieldsXml
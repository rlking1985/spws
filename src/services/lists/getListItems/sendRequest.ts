import { SpwsError, SpwsRequest } from "../../../classes";
import { parseEncodedAbsUrl } from "../../../utils";

const sendRequest = async ({
  req,
  listName,
  viewName,
  camlQuery,
  viewFields,
  rowLimit,
  queryOpt,
  parseFields,
  fields,
}: {
  req: SpwsRequest;
  listName: string;
  viewName: string;
  camlQuery: string;
  viewFields: string;
  rowLimit: number;
  queryOpt: string;
  parseFields: boolean;
  fields: string[];
}) => {
  // Create envelope
  req.createEnvelope(`<GetListItems xmlns="http://schemas.microsoft.com/sharepoint/soap/">
      <listName>${listName}</listName>
      <viewName>${viewName}</viewName>
      <query>${camlQuery}</query>
      <viewFields>${viewFields}</viewFields>
      <rowLimit>${rowLimit}</rowLimit>
      <queryOptions>${queryOpt}</queryOptions>
    </GetListItems>`);

  // Send request
  const res = await req.send();

  // Check for row data parent
  const rsData = res.responseXML.querySelector("rs\\:data, data");

  // If row data is not found, throw error
  if (!rsData) throw new SpwsError(res);

  // Get rows
  const rows = Array.from(rsData.querySelectorAll("z\\:row, row"));

  // Create data
  const data = parseFields
    ? // Create items with field data
      rows.map((row) => {
        let item = fields.reduce((object: { [key: string]: string }, field) => {
          object[field] = row.getAttribute(`ows_${field}`) || "";
          return object;
        }, {});
        // Parse Encoded Abs URL
        item = { ...item, ...parseEncodedAbsUrl(item.EncodedAbsUrl) };

        return item;
      })
    : // Create items with all attributes
      rows.map((row) => {
        let item = Array.from(row.attributes).reduce(
          (object: { [key: string]: string }, { nodeName, nodeValue }) => {
            object[nodeName.replace("ows_", "")] = nodeValue!;
            return object;
          },
          {}
        );

        // Parse Encoded Abs URL
        item = { ...item, ...parseEncodedAbsUrl(item.EncodedAbsUrl) };

        return item;
      });

  // Return object
  return { ...res, data };
};

export default sendRequest;

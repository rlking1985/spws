import { SpwsError, SpwsRequest } from "../../../classes";
import { parseEncodedAbsUrl } from "../../../utils";
import { Item, SpwsResponse } from "../../../types";
import { Worker } from "worker_threads";
const sendRequest = async <T extends object>({
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
}): Promise<SpwsResponse & { data: Array<Item & T> }> => {
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

  // Create fields array
  const fieldsArray = parseFields
    ? // Use existing fields if they exist
      [...fields]
    : // Get fields from the first row
      Array.from((rows[0] || {}).attributes || []).map(({ nodeName }) =>
        nodeName.replace("ows_", "")
      );

  // Create data
  const data = rows.map((row) => {
    let item = fieldsArray.reduce((object: { [key: string]: string }, field) => {
      object[field] = row.getAttribute(`ows_${field}`) || "";
      return object;
    }, {}) as Item;
    // Parse Encoded Abs URL
    item = { ...item, ...parseEncodedAbsUrl(item.EncodedAbsUrl) };

    return item as Item & T;
  });

  // Return object
  return { ...res, data };
};

export default sendRequest;

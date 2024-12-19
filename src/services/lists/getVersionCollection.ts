// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsRequest, SpwsError } from "../../classes";

// Enum
import { WebServices } from "../../enum";

// Types
import { SpwsResponse } from "../../types";
import parseUserGroupValue, {
  ExpandedUserGroup,
} from "../../utils/parseUserGroupValue";

type Version<Field extends string> = {
  Modified: string;
  Editor: ExpandedUserGroup;
} & Record<Field, string>;

interface Operation extends SpwsResponse {}

type Params<Field extends string> = {
  // A string that contains a description for the list.
  ID: string;
  listName: string;
  field: Field;
  // The SharePoint web URL, required if on a different site collection
  webURL?: string;
};

/**
 * Gets the versions for a field in an item.
 *
 * @link https://learn.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774544(v=office.12)
 * @example
 * ```
 * Returns version information for the specified field in a SharePoint list.
 * const res = await addList("Announcements", { webURL: "/sites/other", templateId: 100, description: "Demo List" })
 * ```
 */
const getVersionCollection = async <Field extends string>(
  params: Params<Field>
): Promise<{ data: Version<Field>[] }> => {
  // Deconstruct options
  const { webURL = defaults.webURL, ID, field, listName } = params;

  // Create request object
  const req = new SpwsRequest({
    webService: WebServices.Lists,
    webURL,
    // soapAction: "http://schemas.microsoft.com/sharepoint/soap/GetVersionCollection",
  });

  // Create envelope
  req.createEnvelope(`<GetVersionCollection xmlns="http://schemas.microsoft.com/sharepoint/soap/">
      <strlistID>${listName}</strlistID>
      <strlistItemID>${ID}</strlistItemID>
      <strFieldName>${field}</strFieldName>
    </GetVersionCollection>`);

  try {
    // Send request
    const res = await req.send();

    // Get data
    const data: Version<Field>[] = Array.from(
      res.responseXML.querySelectorAll("Version")
    ).map((node) => {
      // Create version
      const version = {
        [field]: (node.getAttribute(field) || "") as string,
        Modified: node.getAttribute("Modified") || "",
        Editor: parseUserGroupValue(node.getAttribute("Editor") || "", {
          expandUserField: true,
        })[0],
      };

      // Return version
      return version as Version<Field>;
    });

    // Check for errors
    const errorString =
      res.responseXML.querySelector("errorstring")?.textContent || "";

    // If an error is found, throw error
    if (errorString) throw new SpwsError({ ...res, responseText: errorString });

    // Return res. There is no data/response for this request
    return { ...res, data };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default getVersionCollection;

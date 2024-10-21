// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsRequest, SpwsError } from "../../classes";

// Enum
import { WebServices } from "../../enum";

// Types
import { SpwsResponse, View } from "../../types";

interface Operation extends SpwsResponse {
  data: View[];
}

/**
 * Returns the display names, internal names, and URLs for the collection of views of the specified list.
 * https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772703(v=office.12)
 * @param listName A string that contains the internal name of the list.
 * @example
 * ```
 * const res = await getViewCollection("Announcements");
 * ```
 */
const getViewCollection = async (
  listName: string,
  {
    webURL = defaults.webURL,
  }: {
    /** The SharePoint webURL  */
    webURL?: string;
  } = {}
): Promise<Operation> => {
  try {
    // Create request object
    const req = new SpwsRequest({ webService: WebServices.Views, webURL });

    // Create envelope
    req.createEnvelope(
      `<GetViewCollection xmlns="http://schemas.microsoft.com/sharepoint/soap/">
        <listName>${listName}</listName>
      </GetViewCollection>`
    );

    // Send request
    const res = await req.send();

    // Create data
    const data = Array.from(res.responseXML.querySelectorAll("View")).map((node) => {
      // Create the view
      const view = Array.from(node.attributes).reduce(
        (object: { [key: string]: any }, { name, value }) => {
          switch (name as keyof View) {
            case "DefaultView":
            case "MobileView":
            case "MobileDefaultView":
              object[name] = value === "TRUE";
              break;

            default:
              object[name] = value;
              break;
          }

          // Return accumulator
          return object;
        },
        {}
      ) as View;

      // Return mapped view
      return view;
    });

    // Return object
    return { ...res, data };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default getViewCollection;

import { defaults } from "../..";
import { SpwsRequest, SpwsError } from "../../classes";
import { WebServices } from "../../enum";
import { SpwsResponse, WebPartProperties } from "../../types";

type GetWebPartProps = {
  pageURL: string;
  webURL?: string;
};

export interface Operation extends SpwsResponse {
  data: WebPartProperties[];
}

/**
 * @description Fetches the Web Part properties for a specified page within a SharePoint site.
 * This function retrieves all the Web Parts on a given Web Part page, including their metadata,
 * such as IDs, titles, visibility status, and layout details, as well as the full XML representation of each Web Part.
 *
 * @param {string} pageURL - The relative URL of the Web Part page (e.g., "/sites/mysite/pages/sample.aspx")
 * where the Web Part resides.
 * @param {string} [webURL] - The optional base URL of the SharePoint site. If not provided, it defaults to the value in `defaults.webURL`.
 * @returns {Promise<Operation>} - A promise that resolves to an Operation object containing an array of Web Part properties.
 */
const getWebPartProperties = async ({
  pageURL,
  webURL,
}: GetWebPartProps): Promise<Operation> => {
  try {
    // Create request object
    const req = new SpwsRequest({
      webService: WebServices.WebPartPages,
      webURL: webURL || defaults.webURL,
    });

    // Create envelope for SOAP request
    req.createEnvelope(
      `<GetWebPartProperties xmlns="http://microsoft.com/sharepoint/webpartpages">
        <pageUrl>${pageURL}</pageUrl>
        <behavior>Version3</behavior>
        <storage>Shared</storage>
      </GetWebPartProperties>`
    );

    // Send request
    const res = await req.send();
    const responseXML = res.responseXML;

    if (!responseXML) {
      throw new SpwsError({ message: "Invalid response XML" });
    }

    // Get all WebPart nodes from the response
    const allNodes = responseXML.getElementsByTagName("WebPart");

    if (allNodes.length === 0) {
      return {
        ...res,
        data: [],
      };
    }

    // Parse each WebPart node and map to WebPartProperties
    const webPartProperties: WebPartProperties[] = Array.from(allNodes).map(
      (node: Element) => {
        return {
          webPartXml: new XMLSerializer().serializeToString(node), // The full XML for the WebPart
          xmlns_xsi: node.getAttribute("xmlns:xsi") || "",
          xmlns_xsd: node.getAttribute("xmlns:xsd") || "",
          xmlns: node.getAttribute("xmlns") || "",
          ID: node.getAttribute("ID") || "",
          Title: node.getAttribute("Title") || "",
          FrameType: node.getAttribute("FrameType") || "",
          Description: node.getAttribute("Description") || "",
          IsIncluded: node.getAttribute("IsIncluded") === "TRUE",
          ZoneID: node.getAttribute("ZoneID") || "",
          PartOrder: parseInt(node.getAttribute("PartOrder") || "0"),
          FrameState: node.getAttribute("FrameState") || "",
          Height: node.getAttribute("Height") || undefined,
          Width: node.getAttribute("Width") || undefined,
          AllowRemove: node.getAttribute("AllowRemove") === "TRUE",
          AllowZoneChange: node.getAttribute("AllowZoneChange") === "TRUE",
          AllowMinimize: node.getAttribute("AllowMinimize") === "TRUE",
          AllowConnect: node.getAttribute("AllowConnect") === "TRUE",
          AllowEdit: node.getAttribute("AllowEdit") === "TRUE",
          AllowHide: node.getAttribute("AllowHide") === "TRUE",
          IsVisible: node.getAttribute("IsVisible") === "TRUE",
          DetailLink: node.getAttribute("DetailLink") || undefined,
          HelpLink: node.getAttribute("HelpLink") || undefined,
          HelpMode: node.getAttribute("HelpMode") || "",
          Dir: node.getAttribute("Dir") || "",
          PartImageSmall: node.getAttribute("PartImageSmall") || undefined,
          MissingAssembly: node.getAttribute("MissingAssembly") || undefined,
          PartImageLarge: node.getAttribute("PartImageLarge") || undefined,
          IsIncludedFilter: node.getAttribute("IsIncludedFilter") || undefined,
          ExportControlledProperties:
            node.getAttribute("ExportControlledProperties") === "TRUE",
          ConnectionID: node.getAttribute("ConnectionID") || "",
          ID_: node.getAttribute("ID_") || "",
          Assembly: node.getAttribute("Assembly") || "",
          TypeName: node.getAttribute("TypeName") || "",
          HeaderTitle: node.getAttribute("HeaderTitle") || undefined,
        };
      }
    );

    // Return the array of WebPartProperties
    return {
      ...res,
      data: webPartProperties,
    };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default getWebPartProperties;

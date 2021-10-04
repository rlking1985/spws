// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsRequest, SpwsError } from "../../classes";

// Enum
import { WebServices } from "../../enum";

// Services
// import {  } from "../lists";

// Types
import { SpwsResponse } from "../../types";

// Utils
// import {  } from "../../utils";

interface Operation extends SpwsResponse {
  data?: object;
}

/**
 * Returns the names and GUIDs for all lists in the site.
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774663(v=office.12)?redirectedfrom=MSDN
 */
const getListCollection = async (
  webURL = defaults.webURL
): Promise<Operation> => {
  try {
    // Create request object
    const req = new SpwsRequest({ webService: WebServices.Lists, webURL });

    // Create envelope
    req.createEnvelope(
      `<GetListCollection xmlns="http://schemas.microsoft.com/sharepoint/soap/" />`
    );

    // Return request
    let res = await req.send();

    const data = Array.from(
      res.responseXML.querySelectorAll("Some Element")
    ).map((element) => {
      return {
        key: "value",
      };
    });

    return { ...res, data };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default getListCollection;

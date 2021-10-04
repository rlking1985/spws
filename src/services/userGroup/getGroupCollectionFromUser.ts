import { defaults, Response, Group, ResponseError } from "../..";
import Request from "../../classes/request";
import WebServices from "../../enum/webServices";

interface GetGroupCollectionFromUserResponse extends Response {
  data?: Group[];
}

/**
 * Gets the group collection for the user
 */
const getGroupCollectionFromUser = (
  userLoginName: string,
  {
    webURL = defaults.webURL,
    parse = defaults.parse,
  }: { webURL?: string; parse?: boolean } = {}
): Promise<GetGroupCollectionFromUserResponse> =>
  new Promise(async (resolve, reject) => {
    try {
      // If userLoginName is not provided and default user is not null
      if (!userLoginName || typeof userLoginName !== "string") {
        throw new ResponseError({
          message: "Unable to get current user as loginName was not provided",
        });
      }

      // Create Request
      const req = new Request({
        webURL,
        webService: WebServices.UserGroup,
      });

      // Create envelope
      req.createEnvelope(`
  <GetGroupCollectionFromUser xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">
    <userLoginName>${userLoginName}</userLoginName>
  </GetGroupCollectionFromUser>`);

      // Send request
      const res: GetGroupCollectionFromUserResponse = await req.send();

      if (parse && res.responseXML) {
        res.data = Array.from(res.responseXML.querySelectorAll("Group")).map(
          (el): Group => ({
            ID: el.getAttribute("ID") || "",
            Name: el.getAttribute("Name") || "",
            Description: el.getAttribute("Description") || "",
            OwnerID: el.getAttribute("OwnerID") || "",
            OwnerIsUser: el.getAttribute("OwnerIsUser") === "True",
          })
        );
      }

      // Return response
      resolve(res);
    } catch (error: any) {
      reject(new ResponseError(error));
    }
  });

export default getGroupCollectionFromUser;

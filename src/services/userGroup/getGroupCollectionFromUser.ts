// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsRequest, SpwsError } from "../../classes";

// Enum
import { WebServices } from "../../enum";

// Services

// Types
import { Group, SpwsResponse } from "../../types";

// Utils

interface Operation extends SpwsResponse {
  data: Group[];
}

/**
 * Gets the group collection for the user
 */
const getGroupCollectionFromUser = async (
  userLoginName: string,
  { webURL = defaults.webURL }: { webURL?: string } = {}
): Promise<Operation> => {
  try {
    // If userLoginName is not provided and default user is not null
    if (!userLoginName || typeof userLoginName !== "string") {
      throw new SpwsError({
        message: "Unable to get current user as loginName was not provided",
      });
    }

    // Create Request
    const req = new SpwsRequest({
      webURL,
      webService: WebServices.UserGroup,
    });

    // Create envelope
    req.createEnvelope(`
      <GetGroupCollectionFromUser xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">
        <userLoginName>${userLoginName}</userLoginName>
      </GetGroupCollectionFromUser>`);

    // Send request
    const res = await req.send();

    const data = Array.from(res.responseXML.querySelectorAll("Group")).map(
      (el): Group => ({
        ID: el.getAttribute("ID") || "",
        Name: el.getAttribute("Name") || "",
        Description: el.getAttribute("Description") || "",
        OwnerID: el.getAttribute("OwnerID") || "",
        OwnerIsUser: el.getAttribute("OwnerIsUser") === "True",
      })
    );

    // Return response
    return { ...res, data };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default getGroupCollectionFromUser;

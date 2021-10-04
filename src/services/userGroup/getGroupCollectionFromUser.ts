import { defaults, DefaultParameters } from "../..";
import Request from "../../classes/request";
import WebServices from "../../enum/webServices";

const getGroupCollectionFromUser = async (
  userLoginName?: string,
  { webURL, parse }: { webURL: string; parse: boolean } = { ...defaults }
) => {
  // If userLoginName is not provided and default user is not null
  if (!userLoginName) {
    if (defaults.currentUser && defaults.currentUser.Account) {
      userLoginName = defaults.currentUser.Account;
    } else {
      throw new Error(
        "Unable to get current user as loginName was not provided"
      );
    }
  }

  const req = new Request({
    webURL,
    webService: WebServices.UserGroup,
  });

  req.createEnvelope(`
  <GetGroupCollectionFromUser xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">
    <userLoginName>${userLoginName}</userLoginName>
  </GetGroupCollectionFromUser>`);
  const res = await req.send();

  console.log(`res`, res);
};

export default getGroupCollectionFromUser;

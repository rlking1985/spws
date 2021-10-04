import { defaults, CurrentUser, Response, ResponseError } from "../..";
import getUserInformation from "./getUserInformation";

interface GetCurrentUserResponse extends Response {
  data?: CurrentUser;
}
export const getCurrentUserID = (
  webURL: string,
  username?: string,
  password?: string
): Promise<string> =>
  new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `${webURL}/_layouts/viewlsts.aspx`, false);

    // If username and password are truthy
    if (username && password) {
      xhr.setRequestHeader("username", username);
      xhr.setRequestHeader("password", password);
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Get SharePoint User ID variable
          const spUserId = xhr.responseText.match(/_spUserId=[0-9]+/gim);

          // If not found, reject with error
          if (!spUserId)
            return reject(
              new ResponseError({
                message:
                  "Page does not contain the _spUserId, unable to getCurrentUser",
              })
            );

          // Return the ID from the matched string
          return resolve(spUserId[0].split("=")[1]);
        } else {
          // Create response error
          reject(
            new ResponseError({ message: "Unable to get SharePoint User ID" })
          );
        }
      }
    };
    xhr.send();
  });

/**
 * Gets the current logged in user
 */
const getCurrentUser = ({
  webURL = defaults.webURL,
  username,
  password,
}: {
  webURL?: string;
  username?: string;
  password?: string;
} = {}): Promise<GetCurrentUserResponse> =>
  new Promise(async (resolve, reject) => {
    try {
      // If current user has already been set, return current user
      if (defaults.currentUser && !username && !password)
        return resolve({
          responseText: "",
          responseXML: new Document(),
          status: 200,
          statusText: "OK",
          data: defaults.currentUser,
        });

      // Get User ID
      const ID = await getCurrentUserID(webURL, username, password);

      // Get current user
      const res = await getUserInformation(ID, webURL);

      // If a username or password was supplied
      if (username || password) {
        // Clear the cached current user
        defaults.currentUser = null;
      } else {
        // Update defaults of currentUser
        defaults.currentUser = res.data!;
      }

      // Return the current user
      resolve(res);
    } catch (error: any) {
      reject(new ResponseError(error));
    }
  });

export default getCurrentUser;

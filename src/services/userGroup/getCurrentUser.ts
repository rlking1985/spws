// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsError } from "../../classes";

// Enum

// Services
import { getUserInformation } from "../../";

// Types
import { CurrentUser, SpwsResponse } from "../../types";

// Utils

/**
 * Gets the current user's ID
 * @param webURL The SharePoint web URL
 * @param username The username if authenticating as another user (testing only)
 * @param password The password if authenticating as another user (testing only)
 */
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
              new SpwsError({
                message:
                  "Page does not contain the _spUserId, unable to getCurrentUser",
              })
            );

          // Return the ID from the matched string
          return resolve(spUserId[0].split("=")[1]);
        } else {
          // Create response error
          reject(
            new SpwsError({ message: "Unable to get SharePoint User ID" })
          );
        }
      }
    };
    xhr.send();
  });

interface Operation extends SpwsResponse {
  data?: CurrentUser;
}

/**
 * Gets the current authenticated user.
 *
 * @remark Authentication can be changed using a proxy server and supplying a username and password. This is not recommended and should be used for testing purposes only.
 * @param {object} options
 * @param {string} [option.webURL=defaults.webURL] The SharePoint web URL
 * @param {string} [options.username] A username if authenticating as another user (spws-proxy package needed)
 * @param {string} [options.password] A password if authenticating as another user (spws-proxy package needed)
 */
const getCurrentUser = ({
  webURL = defaults.webURL,
  username,
  password,
}: {
  webURL?: string;
  username?: string;
  password?: string;
} = {}): Promise<Operation> =>
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
      reject(new SpwsError(error));
    }
  });

export default getCurrentUser;

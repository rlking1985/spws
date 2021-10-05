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

interface CurrentUserID extends SpwsResponse {
  data: string;
}

/**
 * Gets the current user's ID
 * @param webURL The SharePoint web URL
 * @example
 * ```
 * // Get the current user ID
 * const res = await getCurrentUserID();
 * ```
 */
export const getCurrentUserID = ({
  webURL = defaults.webURL,
  username,
  password,
}: {
  /** The SharePoint web URL */
  webURL?: string;
  /** The username if authenticating as another user (testing only) */
  username?: string;
  /** The password if authenticating as another user (testing only) */
  password?: string;
} = {}): Promise<CurrentUserID> =>
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
          return resolve({
            data: spUserId[0].split("=")[1],
            responseText: xhr.responseText,
            responseXML: xhr.responseXML!,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        } else if (xhr.status === 404) {
          // Create response error
          reject(
            new SpwsError({
              status: xhr.status,
              statusText: xhr.statusText,
              message: "Site not found",
            })
          );
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
  data: CurrentUser;
}

/**
 * Gets the current authenticated user.
 * @remark Authentication can be changed using a proxy server and supplying a username and password. This is not recommended and should be used for testing purposes only.
 */
const getCurrentUser = ({
  webURL = defaults.webURL,
  username,
  password,
  ID,
}: {
  /** The SharePoint web URL */
  webURL?: string;
  /** A username if authenticating as another user (spws-proxy package needed) */
  username?: string;
  /** A password if authenticating as another user (spws-proxy package needed) */
  password?: string;
  /** The user ID. If defined, the page scrape is skipped and user info is returned\
   * This is useful for testing as scraping pages is flaky
   */
  ID?: string;
} = {}): Promise<Operation> =>
  new Promise(async (resolve, reject) => {
    try {
      // If current user has already been set, return current user
      if (
        defaults.currentUser &&
        defaults.currentUser.ID === ID &&
        !username &&
        !password
      )
        return resolve({
          responseText: "",
          responseXML: new Document(),
          status: 200,
          statusText: "OK",
          data: defaults.currentUser,
        });

      // Create userID variable
      let userID = ID;

      // If no user ID is supplied
      if (!userID) {
        // Get User ID
        const res = await getCurrentUserID({
          webURL,
          username,
          password,
        });
        // Assign to userID
        userID = res.data;
      }

      // Get current user
      const res = await getUserInformation(userID, { webURL });

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

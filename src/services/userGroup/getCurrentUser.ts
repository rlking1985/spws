// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsError } from "../../classes";

// Enum

// Services
import { getUserInformation, getCurrentUserID } from "../../";

// Types
import { CurrentUser, SpwsResponse } from "../../types";

// Utils
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

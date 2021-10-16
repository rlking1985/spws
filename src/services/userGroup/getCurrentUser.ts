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

// Create cache
export const cache: { currentUser: { [key: string]: CurrentUser } } = { currentUser: {} };

/**
 * Gets the current authenticated user.
 * @remark Authentication can be changed using a proxy server and supplying a username and password. This is not recommended and should be used for testing purposes only.
 */
const getCurrentUser = ({
  webURL = defaults.webURL,
  ID,
}: {
  /** The SharePoint web URL */
  webURL?: string;
  /** The user ID. If defined, the page scrape is skipped and user info is returned\
   * This is useful for testing as scraping pages is flaky
   */
  ID?: string;
} = {}): Promise<Operation> =>
  new Promise(async (resolve, reject) => {
    try {
      // If the current user for the webURL has already been set, return the cached user
      if (cache.currentUser[webURL]) {
        if (ID && ID === cache.currentUser[webURL].ID) {
          return resolve({
            responseText: "",
            responseXML: new Document(),
            status: 200,
            statusText: "OK",
            data: cache.currentUser[webURL],
          });
        }
      }

      // Create userID variable
      let userID = ID;

      // If no user ID is supplied
      if (!userID) {
        // Get User ID
        const res = await getCurrentUserID(webURL);

        // Assign to userID
        userID = res.data;
      }

      // Get current user
      const res = await getUserInformation(userID, { webURL });

      // Set the cahced current user
      cache.currentUser[webURL] = res.data;

      // Return the current user
      resolve(res);
    } catch (error: any) {
      reject(new SpwsError(error));
    }
  });

export default getCurrentUser;

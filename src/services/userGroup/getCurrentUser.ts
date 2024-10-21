// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsError } from "../../classes";

// Enum

// Services
import { getUserInformation, getCurrentUserID } from "../../";

// Types
import { UserInformation, SpwsResponse } from "../../types";

// Utils
interface Operation extends SpwsResponse {
  data: UserInformation;
}

// Create cache
export const cache: { currentUser?: UserInformation } = { currentUser: undefined };

/**
 * Gets the current authenticated user.
 * Authentication can be changed using a proxy server and supplying a username and password. This is not recommended and should be used for testing purposes only.
 */
const getCurrentUser = ({
  webURL = defaults.webURL,
  getFromWindow = true,
  ID,
}: {
  /** The SharePoint web URL */
  webURL?: string;
  /** If false, the user ID will be scraped from a SharePoint page */
  getFromWindow?: boolean;
  /** The user ID. If defined, the page scrape is skipped and user info is returned\
   * This is useful for testing as scraping pages is flaky
   */
  ID?: string;
} = {}): Promise<Operation> =>
  new Promise(async (resolve, reject) => {
    try {
      // If the current user for the webURL has already been set, return the cached user
      if (cache.currentUser) {
        if (ID && ID === cache.currentUser.ID) {
          return resolve({
            responseText: "",
            responseXML: document.implementation.createHTMLDocument(""),
            status: 200,
            statusText: "OK",
            data: cache.currentUser,
          });
        }
      }

      // Create userID variable
      let userID = ID;

      // If no user ID is supplied
      if (!userID) {
        // Get User ID
        const res = await getCurrentUserID({ webURL, getFromWindow });

        // Assign to userID
        userID = res.data;
      }

      // Create response variable
      let res: Operation;

      // Get user information
      try {
        res = await getUserInformation(userID, { webURL });
      } catch (error) {
        /**
         * A known bug exists in production SharePoint where this request may sometimes fail
         * Retry the request if the initial request fails
         */
        res = await getUserInformation(userID, { webURL });
      }

      // Set the cahced current user
      cache.currentUser = res.data;

      // Return the current user
      resolve(res);
    } catch (error: any) {
      reject(new SpwsError(error));
    }
  });

export default getCurrentUser;

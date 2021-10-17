// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsError } from "../../classes";

// Enum

// Services
// import {  } from "../..";

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
const getCurrentUserID = (webURL = defaults.webURL): Promise<CurrentUserID> =>
  new Promise((resolve, reject) => {
    // If the user ID exists in window
    if (window._spUserId) return { data: window._spUserId };

    // Create xhr
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `${webURL}/_layouts/viewlsts.aspx`, false);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Get SharePoint User ID variable
          const spUserId = xhr.responseText.match(/_spUserId=[0-9]+/gim);

          // If not found, reject with error
          if (!spUserId)
            return reject(
              new SpwsError({
                message: "Page does not contain the _spUserId, unable to getCurrentUser",
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
          reject(new SpwsError({ message: "Unable to get SharePoint User ID" }));
        }
      }
    };
    xhr.send();
  });

export default getCurrentUserID;

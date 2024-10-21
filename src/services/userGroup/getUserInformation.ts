// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsError } from "../../classes";

// Enum

// Services

// Types
import { UserInformation, SpwsResponse } from "../../types";

// Utils
interface Operation extends SpwsResponse {
  data: UserInformation;
}

/**
 * Returns information about the specified user from the User Information List
 * @param ID The user ID
 * https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2010/ff521587(v=office.14)
 * @example
 * ```
 * // Get user from the current site
 * const res = await getUserInformation("1");
 *
 * // Get user from another site
 * const res = await getUserInformation("1", { webURL: "/sites/other" });
 * ```
 */
const getUserInformation = (
  ID: string,
  {
    webURL = defaults.webURL,
  }: {
    /** The SharePoint webURL */
    webURL?: string;
  } = {}
): Promise<Operation> =>
  new Promise((resolve, reject) => {
    // Create XHR
    let xhr = new XMLHttpRequest();

    // Open the request
    xhr.open("GET", `${webURL}/_vti_bin/ListData.svc/UserInformationList(${ID})`, false);
    xhr.setRequestHeader("Accept", "application/json; charset=utf-8");

    // onChange
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Create object to hold SharePoint response
          let data: any = {};
          try {
            // Parse JSON
            const json = JSON.parse(xhr.responseText);

            // If an error is found
            if (json.error) {
              // reject with error
              reject(
                new SpwsError({
                  responseText: xhr.responseText,
                  status: xhr.status,
                  statusText: xhr.statusText,
                  message: json.error.message.value,
                })
              );
            } else {
              // Assign to data
              data = json.d;
            }
          } catch (error: any) {
            reject(
              new SpwsError({
                responseText: xhr.responseText,
                status: xhr.status,
                statusText: xhr.statusText,
                message: error.message,
              })
            );
          }
          // Prepare data object to be stored as user (fix SharePoint keys)
          data.WorkEmail = data.WorkEMail;
          delete data.WorkEMail;
          data.ID = (data.Id || "").toString();
          delete data.Id;

          // Create user
          const user: UserInformation = { ...data };

          // Create response object
          const response: Operation = {
            responseXML: xhr.responseXML || document.implementation.createHTMLDocument(""),
            responseText: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
            data: user,
          };

          // Resolve response
          resolve(response);
        } else {
          reject(
            new SpwsError({
              message: `Unable to get user information list data for user ID: ${ID || "Unknown"}`,
            })
          );
        }
      }
    };

    // Send request
    xhr.send();
  });

export default getUserInformation;

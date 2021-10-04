import { defaults, CurrentUser } from "../..";

const getCurrentUserID = async (webURL: string): Promise<string> =>
  new Promise((resolve, reject) => {
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
              "Page does not contain the _spUserId, unable to getCurrentUser"
            );

          // Return the ID from the matched string
          return resolve(spUserId[0].split("=")[1]);
        } else {
          // Create response error
          const error = new Error("Unable to get SharePoint User ID");
          reject(error);
        }
      }
    };
    xhr.send();
  });

const getUserInfo = (webURL: string, ID: string): Promise<CurrentUser> =>
  new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `${webURL}/_vti_bin/ListData.svc/UserInformationList(${ID})`,
      false
    );
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Create DOM Parser
          const parser = new DOMParser();
          // Convert string to XML
          const xml = parser.parseFromString(xhr.responseText, "text/xml");

          // Get properties element
          const properties = xml.getElementsByTagName("m:properties")[0];

          // If no properties, reject
          if (!properties) {
            return reject(
              "No user properties found, unable to get current user"
            );
          }

          // Get the value of the properties element
          const getValue = (tagName: string) => {
            // Get the d: element
            const el: Element = properties.getElementsByTagName(
              `d:${tagName}`
            )[0];

            // If element is not found, return empty string
            if (!el) return "";

            // Get the text content
            const value = el.textContent;

            // Return the value or an empty string
            return value || "";
          };

          // Create user
          const user: CurrentUser = {
            AboutMe: getValue("AboutMe"),
            Account: getValue("Account"),
            AskMeAbout: getValue("AskMeAbout"),
            ContentType: getValue("ContentType"),
            ContentTypeID: getValue("ContentTypeID"),
            Created: new Date(getValue("Created")),
            CreatedById: getValue("CreatedById"),
            Deleted: getValue("Deleted") === "true",
            Department: getValue("Department"),
            FirstName: getValue("FirstName"),
            ID,
            IsSiteAdmin: getValue("IsSiteAdmin") === "true",
            LastName: getValue("LastName"),
            MobilePhone: getValue("MobilePhone"),
            Modified: new Date(getValue("Modified")),
            ModifiedById: getValue("ModifiedById"),
            Name: getValue("Name"),
            Office: getValue("Office"),
            Picture: getValue("Picture"),
            SIPAddress: getValue("SIPAddress"),
            Title: getValue("Title"),
            UserName: getValue("UserName"),
            WebSite: getValue("WebSite"),
            WorkEMail: getValue("WorkEMail"),
            WorkPhone: getValue("WorkPhone"),
          };

          resolve(user);
        } else {
          // Create response error
          const error = new Error("Unable to get user information list data");
          reject(error);
        }
      }
    };

    // Send request
    xhr.send();
  });

const getCurrentUser = async (
  { webURL = defaults.webURL }: { webURL: string } = { webURL: defaults.webURL }
): Promise<CurrentUser> => {
  // If current user has already been set, return current user
  if (defaults.currentUser) return defaults.currentUser;

  // Get User ID
  const ID = await getCurrentUserID(webURL);

  // Get current user
  const currentUser = await getUserInfo(webURL, ID);

  // Update defaults of currentUser
  defaults.currentUser = currentUser;

  // Return the current user
  return currentUser;
};

export default getCurrentUser;

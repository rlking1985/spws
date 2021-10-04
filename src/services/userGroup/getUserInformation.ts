import { CurrentUser, defaults } from "../..";

/**
 * Get the user's information from the User InformationList
 * @param webURL The SharePoint webURL
 * @param ID The user's ID
 */
const getUserInformation = (
  ID: string,
  webURL: string = defaults.webURL
): Promise<CurrentUser> =>
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
            const value = el.textContent || "";

            // Return the value or an empty string
            return value;
          };

          // Create user
          let user: CurrentUser = {
            AboutMe: getValue("AboutMe"),
            Account: getValue("Account"),
            AskMeAbout: getValue("AskMeAbout"),
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
            SipAddress: getValue("SIPAddress"),
            Title: getValue("Title"),
            UserName: getValue("UserName"),
            WebSite: getValue("WebSite"),
            WorkEmail: getValue("WorkEMail"),
            WorkPhone: getValue("WorkPhone"),
            ContentType: "Person",
          };

          // Get Content Type
          const contentType = getValue("ContentType");

          // Switch by content type
          switch (contentType) {
            case "DomainGroup":
              user.ContentType = "DomainGroup";

              break;
            case "SharePointGroup":
              user.ContentType = "SharePointGroup";
              break;
            default:
              break;
          }

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

export default getUserInformation;

// SPWS Library
import { defaults } from "../..";

// Classes
import { SpwsRequest, SpwsError } from "../../classes";

// Enum
import { WebServices } from "../../enum";

// Types
import { SpwsResponse, PrincipalType, PrincipalInfo } from "../../types";

// Utils
// import {  } from "../../utils";

interface Operation extends SpwsResponse {
  data: PrincipalInfo[];
}

/**
 * Returns an array of PrincipalInfo objects from the SPUserCollection for the Web site. All instances have the principal logon name specified in searchText. Only the maxResults objects can be added to the array.
 * https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774790(v=office.12)
 * @param searchText Principal logon name.
 * @param maxResults Unless otherwise specified, the maximum number of principals that can be returned from a provider is 10.
 * @param principalType SPPrincipalType object that specifies user scope and other information.
 * @example
 * ```
 * const res = await searchPrincipals("dev\john.smith", "Site Owners")
 * ```
 */
const searchPrincipals = async (
  searchText: string,
  {
    webURL = defaults.webURL,
    maxResults = 10,
    principalType = "All",
  }: {
    /** The SharePoint webURL  */
    webURL?: string;
    maxResults?: number;
    principalType?: PrincipalType;
  } = {}
): Promise<Operation> => {
  try {
    // Validate
    if (typeof searchText !== "string")
      throw new SpwsError({
        message: `Expected string for listName but received ${typeof searchText}`,
      });

    // Create request object
    const req = new SpwsRequest({
      webService: WebServices.People,
      webURL,
      soapAction: "http://schemas.microsoft.com/sharepoint/soap/SearchPrincipals",
    });

    // Create envelope
    req.createEnvelope(
      `<SearchPrincipals xmlns="http://schemas.microsoft.com/sharepoint/soap/">
        <searchText>${searchText}</searchText>
        <maxResults>${maxResults}</maxResults>
        <principalType>${principalType}</principalType>
      </SearchPrincipals>`
    );

    // Send request
    const res = await req.send();

    const getTextContent = (node: Element, name: keyof PrincipalInfo) => {
      const element = node.querySelector(name);
      return element ? element.textContent || "" : "";
    };

    // Create data
    const data = Array.from(res.responseXML.querySelectorAll("PrincipalInfo")).map((node) => {
      const principal: PrincipalInfo = {
        AccountName: getTextContent(node, "AccountName"),
        DisplayName: getTextContent(node, "DisplayName"),
        UserInfoID: +(getTextContent(node, "UserInfoID") || "-1"),
        IsResolved: getTextContent(node, "IsResolved") === "true",
        PrincipalType: getTextContent(node, "PrincipalType") as PrincipalType,
        Department: getTextContent(node, "Department"),
        Email: getTextContent(node, "Email"),
        Title: getTextContent(node, "Title"),
      };

      return principal;
    });

    // Return object
    return { ...res, data };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default searchPrincipals;

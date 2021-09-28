// Constants
import { defaults, DefaultParameters, Response } from "../..";

// Enum
import FieldEnum from "../../enum/field";
import WebServices from "../../enum/webServices";

// Types
import List from "../../types/list";
import ListAttributes from "../../types/listAttributes";
import FieldType from "../../types/field";

// Classes
import Request from "../../classes/request";
import escapeXml from "../../utils/escapeXml";
export { default as ResponseError } from "../../classes/responseError";

export interface GetListParameters extends DefaultParameters {
  /**
   * A string that contains either the title (not static name) or the GUID for the list.
   */
  listName: string;
  /** An array of attributes that are returned in the data object. Only available when parsing is true. */
  attributes?: ListAttributes[];
}

export interface GetListResponse extends Response {
  /**
   * The data object is available for any requests where parsed is true or an error occurs
   */
  data?: List;
}

/**
 * Returns a schema for the specified list.
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772709(v=office.12)
 * @example
 * ```
 * // Get list using default parameters
 * const list = await getList({ listName: "Announcements" });
 * // Get list on another site without parsing XML
 * const list = await getList({ listName: "Announcements", webURL: "/sites/hr", parse: false });
 * ```
 */
const getList = ({
  listName,
  parse = defaults.parse,
  webURL = defaults.webURL,
  attributes = [],
}: GetListParameters): Promise<GetListResponse> =>
  new Promise(async (resolve, reject) => {
    {
      // Create request object
      const req = new Request({ webService: WebServices.Lists, webURL });

      // Create envelope
      req.createEnvelope(
        `<GetList xmlns="http://schemas.microsoft.com/sharepoint/soap/"><listName>${escapeXml(
          listName
        )}</listName></GetList>`
      );

      try {
        // Return request
        let res: GetListResponse = await req.send();

        if (parse) {
          // Get list from the responseXML
          const list: Element = res.responseXML.querySelector("List")!;

          // If attributes are provided
          if (attributes.length > 0) {
            // Create data object with only specified attributes
            res.data = attributes.reduce((object: List, attribute) => {
              // Get value
              const value = list.getAttribute(attribute) || "";
              console.log(`list`, list);
              // Field attributes must be an array
              if (attribute === "Fields") {
                const Fields = Array.from(
                  list.querySelectorAll("Fields > Field")
                ).map((field) => {
                  return Array.from(field.attributes).reduce(
                    (object: FieldType, field) => {
                      const name = field.nodeName;
                      object[name] = field.textContent;
                      console.log(`name`, name);
                      return object;
                    },
                    {}
                  );
                });

                console.log(`fields`, Fields);

                // <Field
                //   ID="{43bdd51b-3c5b-4e78-90a8-fb2087f71e70}"
                //   ColName="tp_Level"
                //   RowOrdinal="0"
                //   ReadOnly="TRUE"
                //   Type="Integer"
                //   Name="_Level"
                //   DisplaceOnUpgrade="TRUE"
                //   DisplayName="Level"
                //   Hidden="TRUE"
                //   Required="FALSE"
                //   SourceID="http://schemas.microsoft.com/sharepoint/v3"
                //   StaticName="_Level"
                //   FromBaseType="TRUE"
                // />;

                return object;
              }

              // Add attribute
              object[attribute] = value;
              return object;
            }, {});
          }
          // Get all list attributes
          else {
            res.data = Array.from(list.attributes).reduce(
              (object: List, { name, value }) => {
                object[name] = value;
                return object;
              },
              {}
            );
          }
        }

        resolve(res);
      } catch (error: unknown) {
        reject(error);
      }
    }
  });

export default getList;

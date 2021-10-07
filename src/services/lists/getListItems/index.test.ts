import { SpwsError } from "../../../classes";
import getListItems from "./";

describe("getListItems", () => {
  it("getListItems has no errors", async () => {
    try {
      const res = await getListItems("User Information List", {
        webURL: global.rootWebURL,
        fields: ["Modified", "Editor"],
        queryOptions: {
          DatesInUtc: false,
          ExpandUserField: true,
          RemoveInvalidXmlCharacters: true,
          IncludeMandatoryColumns: false,
          IncludeAttachmentVersion: true,
        },
        query: `<Where>
            <Eq>
                <FieldRef Name="ID" />
                <Value Type="Text">1</Value>
            </Eq>
          </Where>`,
      });
      console.log(`res.data`, res.data);
    } catch (e) {
      const error: SpwsError = e;
      console.log(`error`, error);
    }
  });
});

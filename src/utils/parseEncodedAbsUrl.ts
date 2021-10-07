/**
 * Parses the Encoded Absolute URL to return an object with useful links
 * @param {string} encodedAbsUrl The Item EncodedAbsUrl string
 * @returns {object} Returns an object contains the ListName, ListUrl, DispFormUrl, EditFormUrl and NewFormUrl
 * @example
 * // Parse the Encoded Abs URL
 * parseEncodedAbsUrl("http://contoso/sites/test/Lists/Announcements/4_.000");
 *
 * // Returns
 * {
 *  ID: "1",
 *  ListName: "Announcements",
 *  ListUrl: "http://contoso/sites/test/Lists/Announcements",
 *  NewFormUrl: "http://contoso/sites/test/Lists/Announcements/NewForm.aspx",
 *  EditFormUrl: "http://contoso/sites/test/Lists/Announcements/EditForm.aspx?ID=4",
 *  DispFormUrl: "http://contoso/sites/test/Lists/Announcements/DispForm.aspx?ID=4"
 * }
 *
 */
const parseEncodedAbsUrl = (encodedAbsUrl?: string) => {
  // Define url object
  let data = {
    ID: "",
    ListUrl: "",
    ListName: "",
    NewFormUrl: "",
    EditFormUrl: "",
    DispFormUrl: "",
  };

  // Validate type
  if (typeof encodedAbsUrl !== "string")
    throw new Error(
      `Unable to parse the encoded absolute URL. Expect a string but received ${typeof encodedAbsUrl}`
    );

  // Validate empty string
  if (!encodedAbsUrl.startsWith("http"))
    throw new Error(
      `The Encoded Absolute URL was not received as it is missing the protocol (http...)`
    );

  // Create a path array
  const path = encodedAbsUrl.split("/");

  // Get the ID and remove the last index from array
  const ID = path.pop() || "";

  // Get the ID from the path array
  data.ID = ID.split("_")[0];
  data.ListName = path[path.length - 1];
  data.ListUrl = path.join("/");
  data.NewFormUrl = `${data.ListUrl}/NewForm.aspx`;
  data.EditFormUrl = `${data.ListUrl}/EditForm.aspx?ID=${data.ID}`;
  data.DispFormUrl = `${data.ListUrl}/DispForm.aspx?ID=${data.ID}`;

  // Return data
  return data;
};

export default parseEncodedAbsUrl;

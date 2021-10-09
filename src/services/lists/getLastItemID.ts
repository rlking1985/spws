// SPWS Library
import { defaults, getListItems } from "../..";

// Classes
import { SpwsError } from "../../classes";

// Enum
// import {  } from "../../enum";

// Services
// import {  } from "../lists";

// Types
import { SpwsResponse } from "../../types";

// Utils
// import {  } from "../../utils";

interface Operation extends SpwsResponse {
  data: string;
}

const getLastItemID = async (
  listName: string,
  { webURL = defaults.webURL }: { webURL?: string } = {}
): Promise<Operation> => {
  try {
    const res = await getListItems(listName, {
      query: `<Where><IsNotNull><FieldRef Name="ID" /></IsNotNull></Where><OrderBy><FieldRef Name="ID" Ascending="FALSE" /></OrderBy>`,
      rowLimit: 1,
      webURL,
    });

    // Validate response
    if (res.data.length !== 1)
      throw new SpwsError({
        message: "Unable to get last item ID. More than 1 item was returned",
      });

    // Get the item ID
    const data = res.data[0].ID!;

    // Return object
    return { ...res, data };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default getLastItemID;

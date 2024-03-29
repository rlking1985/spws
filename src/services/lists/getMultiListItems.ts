// SPWS Library
import { getListItems } from "../..";

// Classes
import { SpwsError } from "../../classes";

// Enum
// import {  } from "../../enum";

// Services
// import {  } from "../lists";

// Types
import { Item } from "../../types";

// Utils
import { asyncForEach } from "../../utils";

// Local
import { GetListItemsOptions } from "./getListItems";

interface Operation {
  data: Item[];
  responseText: string[];
  responseXML: Document[];
  status: number[];
  statusText: string[];
  envelope?: string[];
}

interface GetItemsOptions extends GetListItemsOptions<any> {
  listName: string;
}

const getMultiListItems = async (lists: GetItemsOptions[]): Promise<Operation> => {
  // If lists is not an array
  if (!Array.isArray(lists))
    throw new SpwsError({
      message: `Unable to getItems. Expect array but received ${typeof lists}`,
    });

  // Validate lists length
  if (lists.length === 0)
    throw new SpwsError({
      message: `Unable to getItems. Received an empty array`,
    });

  // Create responses object
  const response: Operation = {
    data: [],
    responseText: [],
    responseXML: [],
    status: [],
    statusText: [],
    envelope: [],
  };

  // Iterate through all lists
  await asyncForEach(lists, async (list) => {
    // Get listName
    const listName = list.listName;

    // Create options for getListItems
    const options: Partial<typeof list> = { ...list };

    // Delete the options list name
    delete options.listName;

    // Send request
    const res = await getListItems(listName, options);

    // Push to responses
    response.data.push(...res.data);
    response.responseText.push(...res.responseText);
    response.responseXML.push(...res.responseXML);
    response.status.push(...res.status);
    response.statusText.push(...res.statusText);
    response.envelope!.push(...res.envelope!);
  });

  // Return response object
  return response;
};

export default getMultiListItems;

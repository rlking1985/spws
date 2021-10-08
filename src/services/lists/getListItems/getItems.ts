// SPWS Library
import { defaults, getListItems } from "../../..";

// Classes
import { SpwsRequest, SpwsError } from "../../../classes";

// Enum
import { WebServices } from "../../../enum";

// Services
// import {  } from "../lists";

// Types
import { SpwsResponse } from "../../../types";

// Utils
import { asyncForEach } from "../../../utils";

// Local
import { GetListItemsOptions } from "./";

interface Operation extends SpwsResponse {
  data: object;
}

interface GetItemsOptions extends GetListItemsOptions {
  listName: string;
}

/**
 * Adds the user to the specified group
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772683(v=office.12)
 * @param userLoginName The users login name including the domain
 * @example
 * ```
 * const res = await getItems("dev\john.smith", "Site Owners")
 * ```
 */
const getItems = async (lists: GetItemsOptions[]): Promise<any> => {
  if (!Array.isArray(lists))
    throw new SpwsError({
      message: `Unable to getItems. Expect array but received ${typeof lists}`,
    });

  if (lists.length === 0)
    throw new SpwsError({
      message: `Unable to getItems. Received an empty array`,
    });

  let responses: any = [];

  await asyncForEach(lists, async (list) => {
    const res = await getListItems(list.listName);
    responses.push(res);
  });

  console.log(`responses`, responses);

  return;
};

export default getItems;

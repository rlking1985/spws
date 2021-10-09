// SPWS Library
import { defaults, getList } from "../..";

// Classes
import { SpwsError } from "../../classes";

// Enum
// import {  } from "../../enum";

// Types
import { SpwsResponse } from "../../types";

// Utils
// import {  } from "../../utils";

interface Operation extends SpwsResponse {
  data: number;
}

const getListViewThreshold = async (
  listName: string,
  { webURL = defaults.webURL }: { webURL?: string } = {}
): Promise<Operation> => {
  try {
    const res = await getList(listName, {
      webURL,
      attributes: ["MaxItemsPerThrottledOperation"],
    });

    // Return object
    return { ...res, data: +res.data.MaxItemsPerThrottledOperation! };
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default getListViewThreshold;

// SPWS Library
import { defaults } from "../../..";

// Classes
import { SpwsError } from "../../../classes";

// Enum

// Services

// Types
import { SpwsResponse, Item, Command, Method } from "../../../types";

// Utils
import { asyncForEach } from "../../../utils";

// Local
import sendBatchRequest from "./sendBatchRequest";

/**
 * Contains the specifics for the create update or delete operation.
 */
export type Methods = Method[];

/**
 * The update list items result
 */
export type Result = {
  command: Command;
  errorCode: string;
  errorText?: string;
  ID: string;
  item: Item;
  status: "success" | "error";
};

export interface Operation extends SpwsResponse {
  data: {
    methods: Result[];
    success: boolean | null;
  };
}

/**
 * Adds, deletes, or updates the specified items in a list on the current site.
 * @param listName A string that contains the name of the list. It is recommended that you use the list GUID
 * @param methods An array that contains one or more methods for adding, modifying, or deleting items
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772668(v=office.12)
 * @example
 * ```
 * // Create, update and delete
 * const res = await updateListItems("Announcements", [
 *   { command: "New", values: { Title: "Hello World" } },
 *   { command: "Update", ID: "2", values: { Title: "Hello World" } },
 *   { command: "Delete", ID: "3" },
 * ]);
 * ```
 */
const updateListItems = async (
  listName: string,
  methods: Methods,
  {
    batchSize = 0,
    onError = "Continue",
    webURL = defaults.webURL,
  }: {
    /** The maximum amount of updates that can be sent per web request */
    batchSize?: number;
    /** Return (stop) or continue execution of the scripts if an error occurs */
    onError?: "Return" | "Continue";
    /** The SharePoint webURL */
    webURL?: string;
  } = {}
): Promise<Operation[]> => {
  try {
    // Validate methods
    if (
      !Array.isArray(methods) ||
      methods.length === 0 ||
      methods.some((method) => typeof method !== "object")
    )
      throw new SpwsError({
        message: `Expected methods to be an array of objects`,
      });

    // Validate onError
    if (!["Continue", "Return"].includes(onError))
      throw new SpwsError({
        message: `Expected onError to be "Continue" or "Return" but received ${onError}`,
      });

    // Create array of batches
    const batches: Methods[] =
      !isNaN(batchSize) && +batchSize > 0
        ? methods.reduce((batches: [][], method, index) => {
            // If first batch or batch limit reached, push new batch
            if (index % batchSize === 0) batches.push([]);

            // Get current batch
            let batch: Methods = batches[batches.length - 1];

            // Push method to batch
            batch.push(method);

            // Return accumulator
            return batches;
          }, [])
        : [methods];

    // Create results array
    const results: Operation[] = [];

    // Iterate through all batches
    await asyncForEach(batches, async (methods) => {
      const batchResult = await sendBatchRequest({
        listName,
        methods,
        webURL,
        onError,
      });

      // Push batch result to results array
      results.push(batchResult);
    });

    // Resolve results
    return results;
  } catch (error: any) {
    throw new SpwsError(error);
  }
};

export default updateListItems;

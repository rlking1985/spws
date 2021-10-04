import {
  defaults,
  DefaultParameters,
  Response,
  ResponseError,
  Item,
  Command,
} from "../../..";

// Utils
import { asyncForEach } from "../../../utils";

// Local
import sendBatchRequest from "./sendBatchRequest";

/**
 * Contains the specifics for the create update or delete operation.
 */
export type Methods = {
  /** The operation type */
  command: Command;
  /** If the command is "Update" or "Delete" the ID is required */
  ID?: string;
  /** Values are required for "New" and "Update" commands */
  values?: {
    /** Any field name and string value */
    [key: string]: string;
  };
}[];

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

export interface UpdateListItemParameters extends DefaultParameters {
  batchSize?: number;
  listName: string;
  methods: Methods;
  onError?: "Return" | "Continue";
}

export interface UpdateListItemsResponse extends Response {
  /**
   * The data object is available for any requests where parsed is true or an error occurs
   */
  data?: {
    methods: Result[];
    success: boolean | null;
  };
}

const updateListItems = ({
  listName,
  parse = defaults.parse,
  webURL = defaults.webURL,
  onError = "Continue",
  batchSize = 0,
  methods,
}: UpdateListItemParameters): Promise<UpdateListItemsResponse[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Validate methods
      if (
        !Array.isArray(methods) ||
        methods.length === 0 ||
        methods.some((method) => typeof method !== "object")
      )
        return reject(
          new ResponseError({
            message: `Expected methods to be an array of objects`,
          })
        );

      // Validate onError
      if (!["Continue", "Return"].includes(onError))
        return reject(
          new ResponseError({
            message: `Expected onError to be "Continue" or "Return" but received ${onError}`,
          })
        );

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
      const results: UpdateListItemsResponse[] = [];

      // Iterate through all batches
      await asyncForEach(batches, async (methods) => {
        const batchResult = await sendBatchRequest({
          listName,
          methods,
          parse,
          webURL,
          onError,
        });

        // Push batch result to results array
        results.push(batchResult);
      });

      // Resolve results
      resolve(results);
    } catch (error: any) {
      reject(new ResponseError(error));
    }
  });
};

export default updateListItems;

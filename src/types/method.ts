export type Command = "Delete" | "New" | "Update";

/**
 * Used in batch processing to specify commands within the Batch element.
 */
type Method = {
  /** The operation type */
  command: Command;
  /** If the command is "Update" or "Delete" the ID is required */
  ID?: string;
  /** Values are required for "New" and "Update" commands */
  values?: {
    /** Any field name and string value */
    [key: string]: string;
  };
};

export default Method;

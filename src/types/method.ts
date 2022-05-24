export type Command = "Delete" | "New" | "Update";

type Values = { [key: string]: string } & {
  /** FSObjType of 1 when created folders */
  FSObjType?: "1";
  /** A base name is required when creating folders */
  BaseName?: string;
};

/**
 * Used in batch processing to specify commands within the Batch element.
 */
type Method = {
  /** The operation type */
  command: Command;
  /** If the command is "Update" or "Delete" the ID is required */
  ID?: string;
  /** Values are required for "New" and "Update" commands */
  values?: Values;
};

export default Method;

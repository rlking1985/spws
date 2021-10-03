export type Command = "Delete" | "New" | "Update";

/**
 * Used in batch processing to specify commands within the Batch element.
 */
type Method = {
  /**  Used in Web services to specify the command to post to the server for updating list items. */
  command: Command;
  /** A freeform identification string that is not actually used by the server but that is returned to the client. */
  ID: string;
};

export default Method;

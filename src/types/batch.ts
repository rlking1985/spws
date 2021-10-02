/**
 * Provides batch processing of commands within HTTP protocol.
 */
type Batch = {
  /**
   * Specifies the version number of the list.
   */
  ListVersion: string;
  /**
   * Return — Stops execution of any more methods after the first error is encountered. This is the default.
   * Continue — After an error is encountered, continues executing subsequent methods.
   */
  OnError?: "Return" | "Continue";
  /**
   * Specifies the version number of Windows SharePoint Services that is running on the server.
   * A version number consists of four integers in the format N.N.N.NNNN,
   * which represent the major, minor, phase, and incremental versions of the product. */
  Version?: string;
  /**
   * Specifies the GUID for the view.
   */
  ViewName?: string;
};

export default Batch;

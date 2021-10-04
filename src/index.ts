// Types
import { CurrentUser } from "./types";

/**
 * The default options used in every web request.
 * These can be changed globally or passed to specific requests.
 * @example Set the webURL to your current site instead of the root of the site collection.
 * ```
 * import { defaults } from "spws";
 * defaults.webURL = "/sites/my-site"
 * ```
 */
const defaults: {
  /**
   * If false, the data object will be empty. The responseXML will need to be used
   * @default true
   */
  parse: boolean;
  /**
   * The absolute or relative webURL.
   * @default ""
   */
  webURL: string;
  currentUser: CurrentUser | null;
} = {
  parse: true,
  webURL: "",
  currentUser: null,
};

export * from "./services/lists";
export * from "./services/userGroup";

export { defaults };

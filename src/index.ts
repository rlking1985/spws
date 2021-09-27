export {
  default as getList,
  GetListParameters,
  GetListResponse,
} from "./services/lists/getList";
export {
  default as getListCollection,
  GetListCollectionResponse,
} from "./services/lists/getListCollection";

// Interfaces
export { List } from "./interfaces";

/**
 * The default parameters used that are available in every web request.
 */
type DefaultParameters = {
  /**
   * If false, the data object will be empty. The responseXML will need to be used
   * @default true
   */
  parse?: boolean;
  /**
   * The absolute or relative webURL.
   * @default ""
   */
  webURL?: string;
};

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
} = {
  parse: true,
  webURL: "",
};

/**
 *
 */
type Response = {
  responseText: string;
  responseXML: Document;
  status: number;
  statusText: string;
};

// Export Interfaces
export { defaults, DefaultParameters, Response };

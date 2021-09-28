"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaults = exports.getListCollection = exports.getList = void 0;
var getList_1 = require("./services/lists/getList");
Object.defineProperty(exports, "getList", { enumerable: true, get: function () { return __importDefault(getList_1).default; } });
var getListCollection_1 = require("./services/lists/getListCollection");
Object.defineProperty(exports, "getListCollection", { enumerable: true, get: function () { return __importDefault(getListCollection_1).default; } });
// Interfaces
__exportStar(require("./types"), exports);
/**
 * The default options used in every web request.
 * These can be changed globally or passed to specific requests.
 * @example Set the webURL to your current site instead of the root of the site collection.
 * ```
 * import { defaults } from "spws";
 * defaults.webURL = "/sites/my-site"
 * ```
 */
var defaults = {
    parse: true,
    webURL: "",
};
exports.defaults = defaults;
//# sourceMappingURL=index.js.map
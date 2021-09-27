"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name escapeHtml
 * @description Escaping HTML is required when sending data to a SharePoint via a web request.
 * @param  {String} string The string to be escaped.
 * @return {String}     Returns a string with escaped HTML
 * @example
 * import escapeHtml from "objectpoint-ui/lib/utils/escapeHtml";
 *
 * // Escape the & (ampersand) in the string
 * escapeHtml("Operations & Development")
 *
 * // Returns
 * "Operations &amp; Development"
 */
var escapeXml = function (xml) {
    return xml
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};
exports.default = escapeXml;
//# sourceMappingURL=escapeXml.js.map
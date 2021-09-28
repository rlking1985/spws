"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseError = /** @class */ (function (_super) {
    __extends(ResponseError, _super);
    function ResponseError(xhr) {
        var _this = _super.call(this, xhr.responseText) || this;
        _this.responseText = xhr.responseText;
        _this.responseXML = xhr.responseXML;
        _this.status = xhr.status;
        _this.statusText = xhr.statusText;
        // Iterate through all xml to find error data
        var xml = _this.responseXML;
        _this.data = !_this.responseXML
            ? {}
            : __spreadArray([], __read(xml.querySelectorAll("*")), false).reduce(function (object, element) {
                // Get element name
                var name = element.nodeName;
                // If name is falsy or starts with soap, skip
                if (!name || name.startsWith("soap"))
                    return object;
                // Assign prop to object
                object[name] = element.textContent
                    .split("\n")
                    .map(function (line) { return line.trim(); })
                    .filter(function (line) { return line; })
                    .join("\n");
                // Return the object
                return object;
            }, {});
        return _this;
    }
    return ResponseError;
}(Error));
exports.default = ResponseError;
//# sourceMappingURL=responseError.js.map
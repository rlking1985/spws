"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Constants
var __1 = require("../..");
// Enum
var listAttributes_1 = __importDefault(require("../../enum/listAttributes"));
var field_1 = __importDefault(require("../../enum/field"));
var webServices_1 = __importDefault(require("../../enum/webServices"));
// Classes
var request_1 = __importDefault(require("../../classes/request"));
// Utils
var escapeXml_1 = __importDefault(require("../../utils/escapeXml"));
/**
 * Returns a schema for the specified list.
 * @link https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772709(v=office.12)
 * @example
 * ```
 * // Get list using default parameters
 * const list = await getList({ listName: "Announcements" });
 * // Get list on another site without parsing XML
 * const list = await getList({ listName: "Announcements", webURL: "/sites/hr", parse: false });
 * // Get list with only the Title and Fields parsed
 * const list = await getList({ listName: "Title", attributes: ["Title", "Fields"] })
 * ```
 */
var getList = function (_a) {
    var listName = _a.listName, _b = _a.parse, parse = _b === void 0 ? __1.defaults.parse : _b, _c = _a.webURL, webURL = _c === void 0 ? __1.defaults.webURL : _c, _d = _a.attributes, attributes = _d === void 0 ? [] : _d;
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var req, res, list_1, attributesArray, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = new request_1.default({ webService: webServices_1.default.Lists, webURL: webURL });
                    // Create envelope
                    req.createEnvelope("<GetList xmlns=\"http://schemas.microsoft.com/sharepoint/soap/\"><listName>" + (0, escapeXml_1.default)(listName) + "</listName></GetList>");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, req.send()];
                case 2:
                    res = _a.sent();
                    // If parse is true
                    if (parse) {
                        list_1 = res.responseXML.querySelector("List");
                        attributesArray = attributes.length > 0
                            ? attributes
                            : Array.from(list_1.attributes).map(function (el) { return el.name; });
                        // Create data object with only specified attributes
                        res.data = attributesArray.reduce(function (object, attribute) {
                            object[attribute] = list_1.getAttribute(attribute) || "";
                            return object;
                        }, {});
                        // If the attributes param is empty, or it included fields
                        if (attributes.length === 0 ||
                            attributes.includes(listAttributes_1.default.Fields))
                            // Add fields to data
                            res.data[listAttributes_1.default.Fields] = Array.from(
                            // Field attributes must be an array
                            list_1.querySelectorAll(listAttributes_1.default.Fields + " > Field")).map(function (fieldElement) {
                                // Create field object
                                var field = {};
                                // If the field type is a choice field
                                if (fieldElement.getAttribute(field_1.default.Type) === "Choice") {
                                    // Add choicess to the field
                                    field.Choices = Array.from(fieldElement.querySelectorAll("CHOICE"))
                                        // Return text content
                                        .map(function (_a) {
                                        var textContent = _a.textContent;
                                        return textContent;
                                    })
                                        // Remove empty choices
                                        .filter(function (choice) { return choice; });
                                }
                                // Reduce field from available attributes
                                return Array.from(fieldElement.attributes).reduce(function (object, element) {
                                    // Get field name and value
                                    var key = element.nodeName;
                                    var value = element.textContent || "";
                                    // If the value is true or false
                                    if (["TRUE", "FALSE"].includes(value)) {
                                        // Cast to boolean
                                        value = value === "TRUE";
                                    }
                                    // Assign key and prop
                                    object[key] = value;
                                    return object;
                                }, field);
                            });
                    }
                    resolve(res);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    reject(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
};
exports.default = getList;
//# sourceMappingURL=getList.js.map
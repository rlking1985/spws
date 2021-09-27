"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// Enum
var webServices_1 = __importDefault(require("../enum/webServices"));
var operations_1 = __importDefault(require("../enum/operations"));
// Define SharePoint schema
var schemaSharePoint = "http://schemas.microsoft.com/sharepoint";
/**
 * @name header
 * @description Uses the operation to create the correct XML string for the request
 * @param operation The operation type for the request
 * @returns A xml string
 */
var header = function (operation) {
    return operation + " xmlns=\"" + schemaSharePoint + "/soap/\"";
};
/**
 * @constant
 */
var OPERATIONS = (_a = {},
    _a[operations_1.default.GetAlerts] = {
        webService: webServices_1.default.Alerts,
        header: "GetAlerts xmlns=\"" + schemaSharePoint + "/soap/2002/1/alerts/\"",
        SOAPAction: schemaSharePoint + "/soap/2002/1/alerts/",
    },
    _a[operations_1.default.GetList] = {
        webService: webServices_1.default.Lists,
        header: header("GetList"),
    },
    _a[operations_1.default.GetListItems] = {
        webService: webServices_1.default.Lists,
        header: header("GetList"),
    },
    _a);
exports.default = OPERATIONS;
//# sourceMappingURL=operations.js.map
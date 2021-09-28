"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var responseError_1 = __importDefault(require("./responseError"));
var Request = /** @class */ (function () {
    function Request(_a) {
        var _this = this;
        var webURL = _a.webURL, webService = _a.webService;
        this.envelope = "";
        /**
         * Adds the body XML between the header and footer.
         *
         * @param body The body XML
         * @example
         * // Creates an envelope for a getList request
         * createEnvelope(`<GetList xmlns="http://schemas.microsoft.com/sharepoint/soap/"><listName>Announcements</listName></GetList>`)
         */
        this.createEnvelope = function (body) {
            _this.envelope = "\n    <soap:Envelope\n      xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n      xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"\n      xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n        <soap:Body>\n          " + body + "\n        </soap:Body>\n    </soap:Envelope>";
            return _this;
        };
        this.send = function () {
            return new Promise(function (resolve, reject) {
                // TODO: Add Error Handling
                _this.xhr.onreadystatechange = function () {
                    if (_this.xhr.readyState === 4) {
                        if (_this.xhr.status === 200) {
                            resolve({
                                responseText: _this.xhr.responseText,
                                responseXML: _this.xhr.responseXML,
                                status: _this.xhr.status,
                                statusText: _this.xhr.statusText,
                            });
                        }
                        else {
                            // Create response error
                            var error = new responseError_1.default(_this.xhr);
                            reject(error);
                        }
                    }
                };
                // Send Request
                _this.xhr.send(_this.envelope);
            });
        };
        this.webService = webService;
        this.webURL = webURL;
        // Create XHR
        var xhr = new XMLHttpRequest();
        xhr.open("POST", this.webURL + "/_vti_bin/" + this.webService + ".asmx");
        xhr.setRequestHeader("Content-Type", "text/xml; charset=\"utf-8\"");
        this.xhr = xhr;
    }
    return Request;
}());
exports.default = Request;
//# sourceMappingURL=request.js.map
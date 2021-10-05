// Types
import { SpwsResponse } from "../types";

// Classes
import SpwsError from "./spwsError";

// Utils
import escapeXml from "../utils/escapeXml";

class SpwsRequest {
  escapeXml = escapeXml;
  private envelope = ``;
  xhr: XMLHttpRequest;

  constructor({
    webURL,
    webService,
    soapAction,
  }: {
    webService: string;
    webURL?: string;
    soapAction?: string;
  }) {
    // Create XHR
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `${webURL}/_vti_bin/${webService}.asmx`);
    xhr.setRequestHeader("Content-Type", `text/xml; charset="utf-8"`);

    // If soap action needed, set header
    if (soapAction) xhr.setRequestHeader("SOAPAction", soapAction);

    // Assign XHR to class
    this.xhr = xhr;
  }

  /**
   * Adds the body XML between the header and footer.
   *
   * @param body The body XML
   * @example
   * // Creates an envelope for a getList request
   * createEnvelope(`<GetList xmlns="http://schemas.microsoft.com/sharepoint/soap/"><listName>Announcements</listName></GetList>`)
   */
  createEnvelope = (body: string) => {
    this.envelope = `
    <soap:Envelope
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:xsd="http://www.w3.org/2001/XMLSchema"
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          ${body}
        </soap:Body>
    </soap:Envelope>`;

    return this;
  };

  send = (): Promise<SpwsResponse> =>
    new Promise((resolve, reject) => {
      // Create  callback
      this.xhr.onreadystatechange = () => {
        if (this.xhr.readyState === XMLHttpRequest.DONE) {
          const xData = {
            responseText: this.xhr.responseText,
            responseXML: this.xhr.responseXML!,
            status: this.xhr.status,
            statusText: this.xhr.statusText,
            message: "",
          };
          if (this.xhr.status === 200) {
            resolve(xData);
          } else {
            switch (this.xhr.status) {
              case 0:
                xData.responseText =
                  "Cross origin http://objectpoint forbidden";

                break;

              default:
                break;
            }
            // Create message string
            xData.message = xData.statusText || xData.responseText;

            // Create response error
            reject(new SpwsError(xData));
          }
        }
      };
      // Send Request
      this.xhr.send(this.envelope);
    });
}

export default SpwsRequest;

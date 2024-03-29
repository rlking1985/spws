class SpwsError extends Error {
  responseText: string;
  responseXML: Document | null;
  status: number;
  statusText: string;
  data?: {
    [key: string]: string;
    errorstring: string;
    detail: string;
  };

  constructor({
    responseText,
    responseXML,
    status,
    statusText,
    message,
  }: {
    message?: string;
    responseText?: string;
    responseXML?: Document;
    status?: number;
    statusText?: string;
  }) {
    super(responseText || message);
    this.responseText = responseText || "";
    this.responseXML = responseXML || null;
    this.status = status || 0;
    this.statusText = statusText || "";

    // Iterate through all xml to find error data
    let xml: any = this.responseXML;

    // BUG: Need to handle this in a try catch as .querySelectorAll will error if xml is undefined. This has occured in prod
    const data = !this.responseXML
      ? {}
      : [...xml.querySelectorAll("*")].reduce((object, element) => {
          // Get element name
          let name = element.nodeName;

          // If name is falsy or starts with soap, skip
          if (!name || name.startsWith("soap")) return object;

          // Assign prop to object
          object[name] = element.textContent
            .split("\n")
            .map((line: string) => line.trim())
            .filter((line: string) => line)
            .join("\n");

          // Return the object
          return object;
        }, {});
    this.data = data;

    // Create error message
    this.message = message || data.errorstring || data.detail || "Unknown Error";
  }
}

export default SpwsError;

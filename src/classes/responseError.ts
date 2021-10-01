class ResponseError extends Error {
  responseText: string;
  responseXML: Document;
  status: number;
  statusText: string;
  data?: {
    [key: string]: string;
    detail: string;
  };

  constructor(xhr: XMLHttpRequest) {
    super(xhr.responseText);
    this.responseText = xhr.responseText;
    this.responseXML = xhr.responseXML!;
    this.status = xhr.status;
    this.statusText = xhr.statusText;

    // Iterate through all xml to find error data
    let xml: any = this.responseXML;

    this.data = !this.responseXML
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
  }
}

export default ResponseError;

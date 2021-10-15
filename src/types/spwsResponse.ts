/**
 * The default Response
 */
type SpwsResponse = {
  responseText: string;
  responseXML: Document;
  status: number;
  statusText: string;
  envelope?: string;
};

export type SpwsBatchResponse = {
  responseText: string[];
  responseXML: Document[];
  status: number[];
  statusText: string[];
  envelope?: string[];
};

export default SpwsResponse;

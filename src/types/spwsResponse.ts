/**
 * The default Response
 */
type SpwsResponse = {
  responseText: string;
  responseXML: Document;
  status: number;
  statusText: string;
};

// Default batch response
export type SpwsBatchResponse = SpwsResponse[];

export default SpwsResponse;

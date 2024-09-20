type Params = {
  // The URL to be processed
  url: string;
  // The path before the 'Forms' part of the URL
  beforePath: string;
};

/**
 * Extracts the preceding path segment from a given URL based on a specified path segment.
 *
 * @param params - An object containing the URL and the path segment to look for.
 * @param params.url - The URL string to be processed.
 * @param params.beforePath - The path segment to find in the URL. The function will return the segment immediately preceding this path segment.
 * @returns The path segment immediately preceding the specified path segment in the URL.
 * @throws Will throw an error if the specified path segment is not found in the URL.
 */
const getPrecedingPathFromUrl = (params: Params) => {
  // Split the URL by '/'
  const array = params.url.split("/");

  // Find the index of 'Forms' and get the part just before it
  const formsIndex = array.indexOf(params.beforePath);

  // Return the part before 'Forms'
  if (formsIndex > 0) return array[formsIndex - 1];

  // Return null if beforePath is not found
  throw new Error(`${params.beforePath} not found in URL`);
};

export default getPrecedingPathFromUrl;

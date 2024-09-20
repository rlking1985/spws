import getPrecedingPathFromUrl from "./getPrecedingPathFromUrl";

type Params = {
  DefaultViewUrl: string;
  Title: string;
};

/**
 * Retrieves a static name from a given set of parameters.
 *
 * @param params - The parameters containing the DefaultViewUrl and Title.
 * @param params.DefaultViewUrl - The default view URL of the list.
 * @param params.Title - The title of the list.
 * @returns The static name derived from the DefaultViewUrl or Title.
 * @throws Will throw an error if both DefaultViewUrl and Title are not provided.
 */
const getListStaticName = (params: Params) => {
  // Destructure params
  const { DefaultViewUrl, Title } = params;
  // Validate URL
  if (!DefaultViewUrl) {
    // Validate Title
    if (!Title) throw new Error("DefaultViewUrl and Title is required");
    // If no DefaultViewUrl, return Title as the StaticName
    return Title;
  }
  // Get URL as lowercase
  const url = DefaultViewUrl.toLowerCase();

  // Check if URL contains '/lists/'
  if (url.includes("/lists/"))
    return DefaultViewUrl.split("/Lists/")[1].split("/")[0];

  // Check if URL contains '/forms/'
  if (url.includes("/forms/"))
    return getPrecedingPathFromUrl({
      url: DefaultViewUrl,
      beforePath: "Forms",
    });

  // Default return name
  const array = DefaultViewUrl.split("/");

  // Return the second to last part of the URL
  return array[array.length - 2];
};

export default getListStaticName;

/**
 * @name parseUserGroupValue
 * @description Converts a SharePoint User/Group string with IDs into an array
 * @param {string} string The user and/or group string to be parsed
 * @param {object} options Options to expand user fields
 * @param {boolean} [options.expandUserField=false] Whether to expand user fields into detailed objects
 * @returns {Array<UserGroup | ExpandedUserGroup>}
 * Returns an array of objects containing the ID, label, and value keys, and optionally loginName, email, and sipAddress when expanded.
 */

// Define a base type for user/group data with minimal information
export type UserGroup = {
  ID: string;
  label: string;
  value: string;
};

// Define an extended type that includes additional user details
export type ExpandedUserGroup = UserGroup & {
  loginName: string; // User's login name
  email: string; // User's email address
  sipAddress: string; // User's SIP address for communication
};

// Define the options type with a generic parameter for the expandUserField option
type ParseOptions<T extends boolean = false> = {
  expandUserField?: T; // Optional boolean to decide whether to expand user details
};

// Use a conditional type to dynamically determine the return type based on expandUserField
type ParseReturnType<T extends boolean> = T extends true
  ? ExpandedUserGroup[] // Return detailed user objects when true
  : UserGroup[]; // Return basic user objects when false

const parseUserGroupValue = <T extends boolean = false>(
  string: string = "", // Default the input string to an empty string if not provided
  options?: ParseOptions<T> // Optional options parameter
): ParseReturnType<T> => {
  const { expandUserField = false } = options || {}; // Destructure and default expandUserField to false

  // If the input string is empty or falsy, return an empty array
  if (!string) return [] as ParseReturnType<T>;

  if (expandUserField) {
    // Expand user details into an array of ExpandedUserGroup objects
    return string
      .split(";#")
      .reduce<ExpandedUserGroup[]>((array, currentString, index) => {
        // Replace any occurrences of double commas with a single comma
        currentString = currentString.replace(/,,/g, ",");

        if (index % 2 === 0) {
          // If the index is even, push a placeholder object with just the ID
          array.push({
            ID: currentString,
            label: "",
            value: "",
            loginName: "",
            email: "",
            sipAddress: "",
          });
        } else {
          // If the index is odd, this string contains additional details
          const arrayIndex = array.length - 1; // Get the index of the last element in the array
          const ID = array[arrayIndex].ID; // Retrieve the ID from the last element

          // Split the string by ",#" to extract detailed user information
          const dataParts = currentString.split(",#");

          // Create an expanded user object using the parsed data
          const user: ExpandedUserGroup = {
            ID,
            label: dataParts[4] || "", // Use the 5th part as the label, or fallback to an empty string
            value: `${ID};#${dataParts[0]}`, // Construct the value using the ID and first part
            loginName: dataParts[1] || "", // Login name, fallback to an empty string
            email: dataParts[2] || "", // Email, fallback to an empty string
            sipAddress: dataParts[3] || "", // SIP address, fallback to an empty string
          };

          // Replace the placeholder object in the array with the expanded user object
          array[arrayIndex] = user;
        }

        return array; // Return the updated array after processing this string
      }, []) as ParseReturnType<T>;
  } else {
    // Parse into an array of BaseUserGroup objects
    const userGroups: UserGroup[] = [];
    const array = string.split(";#"); // Split the input string by ";#"

    for (let i = 0; i < array.length; i += 2) {
      // Process every two elements: one for ID and one for label
      const ID = array[i];
      const label = array[i + 1] || ""; // Use the next element as the label, or fallback to an empty string

      // Add the parsed user/group to the result array
      userGroups.push({
        ID,
        label,
        value: `${ID};#${label}`, // Construct the value using ID and label
      });
    }

    return userGroups as ParseReturnType<T>; // Return the array of BaseUserGroup objects
  }
};

export default parseUserGroupValue;

type PrincipalType =
  // Represents all users of a client computer.
  | "All"
  // Represents a distribution list.
  | "DistributionList"
  // Represents user accounts that have been disabled or cases when the user does not have access to objects on this SharePoint site.
  | "None"
  // Represents a security group.
  | "SecurityGroup"
  // Represents a group of SharePoint site users.
  | "SharePointGroup"
  // Represents an individual user who is associated with a well-known group. If an account is not disabled, this is the default.
  | "User";

export default PrincipalType;

import PrincipalType from "./principalType";

interface PrincipalInfo {
  // E-mail address or account name that is associated with the user of a SharePoint site.
  AccountName: string;
  // Department that is associated with a user of a SharePoint site.
  Department: string;
  // Name that is displayed for a SharePoint site principal.
  DisplayName: string;
  // E-mail address that is associated with a user of a SharePoint site.
  Email: string;
  // Specifies whether the user has been validated against Active Directory Domain Services (AD DS) or some other membership provider.
  IsResolved: boolean;
  // SPWS DOES NOT SUPPORT THIS YET: List that includes all occurrences of a specified principal logon name and principal type that have permissions to access a specific SharePoint site. These permissions are stored in various sources such as membership provider directories, role provider directories, or Active Directory Domain Services (AD DS) directory.
  // MoreMatches?: PrincipalInfo[];
  // Specifies the scope and other information that is associated with a principal of a SharePoint site.
  PrincipalType: PrincipalType;
  // Job title of the principal.
  Title: string;
  // Member identifier (ID) for an SPUser object that is initialized to -1 when the object is created, and then set to a unique value when the object is added to an SPUserCollection.
  UserInfoID: number;
}

export default PrincipalInfo;

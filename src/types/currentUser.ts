type CurrentUser = {
  AboutMe: string;
  Account: string;
  AskMeAbout: string;
  ContentType: "Person" | "SharePointGroup" | "DomainGroup";
  ContentTypeID: string;
  Created: Date;
  CreatedById: string;
  Deleted: boolean;
  Department: string;
  FirstName: string;
  ID: string;
  IsSiteAdmin: boolean;
  LastName: string;
  MobilePhone: string;
  Modified: Date;
  ModifiedById: string;
  Name: string;
  Office: string;
  Picture: string;
  SIPAddress: string;
  Title: string;
  UserName: string;
  WebSite: string;
  WorkEMail: string;
  WorkPhone: string;
};

export default CurrentUser;

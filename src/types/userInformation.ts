type Deferred = {
  __deferred: {
    uri: string;
  };
};

type UserInformation = {
  AboutMe?: string;
  Account: string;
  AskMeAbout?: string;
  Attachments: Deferred;
  ContentType: "Person" | "SharePointGroup" | "DomainGroup";
  ContentTypeID: string;
  Created: Date;
  CreatedBy: Deferred;
  CreatedById: string;
  Deleted: boolean;
  Department?: string;
  FirstName?: string;
  ID: string;
  IsSiteAdmin: boolean;
  LastName?: string;
  MobilePhone?: string;
  Modified: Date;
  ModifiedBy: Deferred;
  ModifiedById: string;
  Name?: string;
  Office?: string;
  Owshiddenversion: number;
  Picture?: string;
  SipAddress: string;
  Path: string;
  Title?: string;
  UserName: string;
  WebSite?: string;
  WorkEmail?: string;
  WorkPhone?: string;
};

export default UserInformation;

type Deferred = {
  __deferred: {
    uri: string;
  };
};

// <d:ContentTypeID>0x010A00891D6A2DE286304CB902CD2350188141</d:ContentTypeID>
// <d:Name>DRN\Administrator</d:Name>
// <d:Account>DRN\administrator</d:Account>
// <d:IsSiteAdmin m:type="Edm.Boolean">true</d:IsSiteAdmin>
// <d:Deleted m:type="Edm.Boolean">false</d:Deleted>
// <d:UserName>Administrator</d:UserName>
// <d:Id m:type="Edm.Int32">1</d:Id>
// <d:ContentType>Person</d:ContentType>
// <d:Modified m:type="Edm.DateTime">2021-10-30T00:00:03</d:Modified>
// <d:Created m:type="Edm.DateTime">2018-11-05T14:22:31</d:Created>
// <d:CreatedById m:type="Edm.Int32">1</d:CreatedById>
// <d:ModifiedById m:type="Edm.Int32">1073741823</d:ModifiedById>
// <d:Owshiddenversion m:type="Edm.Int32">67</d:Owshiddenversion>
// <d:Version>1.0</d:Version>
// <d:Path>/army/wii/_catalogs/users</d:Path>

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

type View = {
  BaseViewID: string;
  ContentTypeID: string;
  DefaultView?: boolean;
  DisplayName: string;
  ImageUrl: string;
  Level: string;
  MobileDefaultView?: boolean;
  MobileView?: boolean;
  Name: string;
  Type: "HTML" | "CALENDAR" | "GRID" | "GANTT";
  Url: string;
};

export interface ListView extends View {
  Query: string;
  ViewFields: string[];
  RowLimit?: {
    Paged: boolean;
    size: number;
  };
  Aggregations?: {
    Value: "Off" | "On";
  };
}

export default View;

type Field = {
  [key: string]: any;
  colName?: string;
  DisplaceOnUpgrade?: boolean;
  DisplayName?: string;
  FromBaseType?: boolean;
  Hidden?: string;
  ID?: string;
  Name?: string;
  ReadOnly?: boolean;
  RowOrdinal?: string;
  Sealed?: boolean;
  SourceID?: string;
  StaticName?: string;
  Type?: string;
  ShowInFileDlg?: boolean;
  Filterable?: boolean;
  Sortable?: boolean;
  Choices?: string[];
};

export default Field;

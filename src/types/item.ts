type Item = {
  [key: string]: string | object | Date | unknown;
  ID?: string;
  Title?: string;
  Modified?: string | Date;
  Editor?: string | object;
  Author?: string | object;
  Created?: string | Date;
  ContentType?: string;
  FileRef?: string;
  FileDirRef?: string;
  EncodedAbsUrl?: string;
  ListUrl?: string;
  ListName?: string;
  NewFormUrl?: string;
  EditFormUrl?: string;
  DispFormUrl?: string;
};

export default Item;

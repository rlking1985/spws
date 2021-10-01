type item = {
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
};

export default item;

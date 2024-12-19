type Version<T extends string> = {
  Modified: string;
  Editor: any;
} & Record<T, string>;

export default Version;

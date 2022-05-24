type KnownKeys<T> = { [K in keyof T as string extends K ? never : K]: T[K] };

export default KnownKeys;

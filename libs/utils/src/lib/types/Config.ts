export interface Config {
  address: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isConfig = (object: any): object is Config => {
  return (object as Config) !== undefined && !!(object as Config).address;
};

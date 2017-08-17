export interface IEndpoint {
  method:
    | "get"
    | "post"
    | "patch"
    | "delete"
    | "put"
    | "copy"
    | "head"
    | "options"
    | "purge"
    | "lock"
    | "unlock";
  url: string;
  headers: IHeader[];
  statusCode: number;
  delay: number;
  response: IResponse;
}

export interface IHeader {
  key: string;
  value: string;
}

export interface IResponse {
  contentType: string;
  content: string;
}

interface ISpec {
  endpoints: IEndpoint[];
  server: {
    port: number;
    staticFolder?: string;
    certificatePath?: string;
    keyPath?: string;
  };
}

export default ISpec;

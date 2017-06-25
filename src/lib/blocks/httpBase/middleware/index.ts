export interface HttpBaseOptions {
  method: string;
  url: string;
}

export default function handleRequest(
  req: any,
  res: any,
  options: HttpBaseOptions
) {}

export interface IError {
  info: { message: string };
  status: 400 | 401 | 402 | 404 | 500;
}

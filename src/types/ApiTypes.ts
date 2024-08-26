export enum Method {
  Put = "PUT",
  Post = "POST",
  Get = "GET",
  Delete = "DELETE",
}

export type options = {
  headers?: HeadersInit;
  body?: Object;
};

export type ApiResponse<Data> = {
  success: boolean;
  errorCode: null | string;
  errorMessage: string | null;
  data: Data;
};

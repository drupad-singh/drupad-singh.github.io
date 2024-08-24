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

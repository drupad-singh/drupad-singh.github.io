import { useState } from "react";
import { Method, options } from "../types/ApiTypes";

const snakeToCamel = (data: object) => {
  Object.values(data).map(([k, v]) => [
    k.replace(/_./g, (match) => match.charAt(1).toUpperCase()),
    v,
  ]);
};

export const callApi = (
  method: Method,
  url: string,
  options: options,
  setShowApiLoader?,
  setError?
) => {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ? options.headers : {}),
    },
    body: options.body ? null : JSON.stringify(options.body),
  })
    .then((response) => response.json())
    .then((response) => {
      if (setShowApiLoader) {
        setShowApiLoader(false);
      }
      if (response.status == "200" || response.status == "201") {
        return snakeToCamel(response.data);
      } else {
        throw response;
      }
    })
    .catch((err) => {
      console.error("API Call Failed:: ", err);
      setError(err);
    });
};

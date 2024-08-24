import React, { useEffect, useState } from "react";
import { Method } from "../types/ApiTypes";
import { callApi } from "../utils/Api";

type props = {
  children: React.ReactNode;
  url: string;
  method: Method;
  body?: object;
  headers?: HeadersInit;
};

const ApiWrapper: React.FC<props> = ({
  url,
  method,
  children,
  body,
  headers,
}) => {
  const [showApiLoader, setShowApiLoader] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [apiResult, setApiResult] = useState(null);

  useEffect(() => {
    callApi(method, url, { headers, body }, setShowApiLoader, setApiError);
  }, []);
};

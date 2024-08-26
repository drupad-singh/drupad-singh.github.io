import React, { useEffect, useState } from "react";
import { Method } from "../types/ApiTypes";
import { callApi, useCallApi } from "../utils/Api";
import { useRecoilValue } from "recoil";
import { AuthState } from "../storage/RecoilState";

type props = {
  children: React.ReactNode;
  url: string;
  method: Method;
  body?: object;
  headers?: HeadersInit;
  useAuthToken?: boolean;
};

export const ApiWrapper: React.FC<props> = ({
  url,
  method,
  children,
  body,
  headers,
}) => {
  const callApi = useCallApi();
  const [showApiLoader, setShowApiLoader] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [apiResult, setApiResult] = useState(null);
  const authToken = useRecoilValue(AuthState);

  useEffect(() => {
    callApi({ method, url, setShowApiLoader, setApiError });
  }, []);
  return <>{children}</>;
};

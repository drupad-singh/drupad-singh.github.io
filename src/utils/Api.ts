import { useState } from "react";
import { ApiResponse, Method, options } from "../types/ApiTypes";
import { Endpoints } from "../Constants";
import { useRecoilState } from "recoil";
import { AuthState } from "../storage/RecoilState";

const snakeToCamel = (data: object) => {
  return Object.fromEntries(
    Object.entries(data).map(([k, v]) => {
      const key = k.replace(/_./g, (match) => match.charAt(1).toUpperCase());
      let value;
      if (typeof v == "object" && !Array.isArray(v) && v != null) {
        value = snakeToCamel(v);
      } else if (Array.isArray(v)) {
        value = v.map((item) => snakeToCamel(item));
      } else {
        value = v;
      }
      return [key, value];
    })
  );
};

const camelToSnake = (data: object) => {
  return Object.fromEntries(
    Object.entries(data).map(([k, v]) => {
      const key = k.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
      let value;
      if (typeof v == "object" && !Array.isArray(v) && v != null) {
        value = camelToSnake(v);
      } else if (Array.isArray(v)) {
        value = v.map((item) => camelToSnake(item));
      } else {
        value = v;
      }
      return [key, value];
    })
  );
};

export const verifyAccessToken = (authToken) => {
  try {
    if (authToken.accessToken == null) {
      return false;
    }
    const [_, payload] = authToken.accessToken.split(".");
    const decoded = JSON.parse(window.atob(payload));
    if (Math.floor(Date.now() / 1000) < decoded.exp) {
      return true;
    }
  } catch (err) {
    console.error("verification failed ", err);
  }
  return false;
};

export const refreshToken = (authToken, setAuthToken) => {
  const endpoint = Endpoints.refreshToken();
  return fetch(endpoint.url, {
    method: endpoint.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh_token: authToken.refreshToken,
    }),
  })
    .then((r) => r.json())
    .then((response) => {
      if (response.success) {
        setAuthToken({
          accessToken: response.data.access_token,
          refreshToken: response.data.refresh_token,
        });
      } else {
        throw response;
      }
    });
};

export const useCallApi = <Data>() => {
  const [authToken, setAuthToken] = useRecoilState(AuthState);
  const dispatch: (_: {
    method: Method;
    url: string;
    options?: options;
    setShowApiLoader?: (_: boolean) => void;
    useAuth?: boolean;
  }) => Promise<ApiResponse<Data>> = ({
    method,
    url,
    options,
    setShowApiLoader,
    useAuth = true,
  }) => {
    const headers = {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
      ...(useAuth ? { Authorization: "Bearer " + authToken.accessToken } : {}),
      ...(options?.headers ? options.headers : {}),
    };
    const body =
      typeof options?.body == "object"
        ? JSON.stringify(camelToSnake(options.body))
        : null;
    return fetch(url, {
      method,
      headers,
      body,
    })
      .then((response: Response) => {
        return response.json().then((data: JSON) => {
          if (setShowApiLoader) {
            setShowApiLoader(false);
          }
          if (response.status == 200 || response.status == 201) {
            return snakeToCamel(data);
          } else if (response.status == 401 && authToken.refreshToken != null) {
            // call refresh api, refresh access token and then hit the api again
            return refreshToken(authToken, setAuthToken).then(() =>
              dispatch({
                method,
                url,
                options,
                setShowApiLoader,
                setApiError,
              })
            );
          } else {
            throw response;
          }
        });
      })
      .catch((err) => {
        if (setShowApiLoader) {
          setShowApiLoader(false);
        }
        throw err;
      });
  };

  return dispatch;
};

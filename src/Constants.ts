import create from "@ant-design/icons/lib/components/IconFont";
import { Method } from "./types/ApiTypes";

export const FormDimens = {
  gutterSizeX: {
    lg: 24,
    md: 18,
    sm: 14,
  },
  gutterSizeY: {
    lg: 48,
    md: 36,
    sm: 18,
  },
  colSpan: {
    lg: 12,
    md: 10,
    sm: 24,
  },
};

export const Constants = {
  reviewListPageSize: 2,
};

export enum Screen {
  MerchantOnboardingScreen,
  MerchantListScreen,
  MerchantUpdateScreen,
  MerchantDeleteScreen,
  RestaurantMenuScreen,
  RestaurantCreateScreen,
  RestaurantUpdateScreen,
  RestaurantListScreen,
  SignUpScreen,
  LogInScreen,
  HomeScreen,
}
const base = import.meta.env.VITE_API_BASE;

export type Endpoint = {
  method: Method;
  url: string;
};

export type Params = {
  pathParams?: { [key in string]: string };
  queryParams?: { [key in string]: string };
};

export const encodeQueryParams = (queryParams: object) => {
  return Object.entries(queryParams)
    .map(([k, v]) => encodeURIComponent(k) + "=" + encodeURIComponent(v))
    .join("&");
};

export const createEndpoint = ({
  method,
  url,
}: {
  method: Method;
  url: string;
}) => {
  return (params?: Params) => {
    if (params?.pathParams) {
      Object.entries(params.pathParams).forEach(([k, v]) => {
        url = url.replaceAll(":" + k, v);
      });
    }
    if (params?.queryParams) {
      const queryString = params?.queryParams
        ? "?" + encodeQueryParams(params.queryParams)
        : "";
      url += queryString;
    }
    return {
      method,
      url,
    };
  };
};

export const Endpoints = {
  userSignup: createEndpoint({
    method: Method.Post,
    url: base + "/users/signup",
  }),
  userLogin: createEndpoint({
    method: Method.Post,
    url: base + "/users/login",
  }),
  refreshToken: createEndpoint({
    method: Method.Post,
    url: base + "/auth/refresh_access_token",
  }),
  assignRoles: createEndpoint({
    method: Method.Post,
    url: base + "/admin/assign_roles",
  }),
  createMerchant: createEndpoint({
    method: Method.Post,
    url: base + "/merchants",
  }),
  updateMerchant: createEndpoint({
    method: Method.Put,
    url: base + "/merchants/:merchantId",
  }),
  searchMerchant: createEndpoint({
    method: Method.Get,
    url: base + "/merchants/search",
  }),
  listRestaurants: createEndpoint({
    method: Method.Get,
    url: base + "/restaurants",
  }),
  createRestaurant: createEndpoint({
    method: Method.Post,
    url: base + "/restaurants",
  }),
};

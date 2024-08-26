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

export type CreateEndpoint<pathParams, queryParams> = (_: {
  pathParams?: pathParams;
  queryParams?: queryParams;
}) => Endpoint;

export const Endpoints = {
  userSignup: () => ({ method: Method.Post, url: base + "/users/signup" }),
  userLogin: () => ({ method: Method.Post, url: base + "/users/login" }),
  refreshToken: () => ({
    method: Method.Post,
    url: base + "/auth/refresh_access_token",
  }),
  assignRoles: () => ({
    method: Method.Post,
    url: base + "/admin/assign_roles",
  }),
  createMerchant: () => ({ method: Method.Post, url: base + "/merchants" }),
  updateMerchant: (params) => ({
    method: Method.Put,
    url: base + "/merchants/" + params.pathParams["merchantId"],
  }),
  searchMerchant: () => ({
    method: Method.Get,
    url: base + "/merchants/search",
  }),
};

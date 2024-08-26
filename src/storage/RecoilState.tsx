import Recoil, { RecoilRootProps, RecoilState } from "recoil";
import { CartItem, MenuItem } from "../types/MenuTypes";

export enum NavItem {
  MerchantOnboarding = "merchant_onboarding",
  MerchantList = "merchant_list",
  Nothing = "nothing",
  RestaurantCreate = "restaurant_create",
  RestaurantList = "restaurant_list",
  MenuDemo = "menu_demo",
}

export const LayoutState = Recoil.atom({
  key: "layoutState",
  default: false,
});

export const SelectedNavItem = Recoil.atom({
  key: "selectedNavItem",
  default: NavItem.MerchantOnboarding,
});

export const CurrentCartItem = Recoil.atom<{ [key: string]: CartItem }>({
  key: "currentCartItems",
  default: {},
});

export type AuthToken = {
  accessToken: null | string;
  refreshToken: null | string;
};

export const AuthState: RecoilState<AuthToken> = Recoil.atom({
  key: "authToken",
  default: { accessToken: null, refreshToken: null },
});

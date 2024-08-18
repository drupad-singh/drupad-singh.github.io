import Recoil, { RecoilRootProps } from "recoil";
import { CartItem, MenuItem } from "../types/MenuTypes";

export enum NavItem {
  MerchantOnboarding = "merchant_onboarding",
  MerchantList = "merchant_list",
  Nothing = "nothing",
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
  default: {}
})
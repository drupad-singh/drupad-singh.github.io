import Recoil from "recoil";

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

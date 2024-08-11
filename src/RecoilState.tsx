import Recoil from "recoil";

export enum NavItem {
  MerchantOnboarding = "merchant_onboarding",
  MerchantList = "merchant_list",
}

export const LayoutState = Recoil.atom({
  key: "layoutState",
  default: false,
});

export const SelectedNavItem = Recoil.atom({
  key: "selecteNavItem",
  default: NavItem.MerchantOnboarding,
});

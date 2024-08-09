import Recoil from "recoil";

export enum NavItem {
  ClientOnboarding = "client_onboarding",
  ClientList = "client_list",
}

export const LayoutState = Recoil.atom({
  key: "layoutState",
  default: false,
});

export const selectedNavItem = Recoil.atom({
  key: "selecteNavItem",
  default: NavItem.ClientOnboarding,
});

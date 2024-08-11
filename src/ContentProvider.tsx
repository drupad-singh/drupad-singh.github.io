import { useRecoilValue } from "recoil";
import { MerchantOnboarding } from "./MerchantOnboarding/MerchantOnboarding";
import { NavItem, selectedNavItem } from "./RecoilState";
import { MerchantList } from "./MerchantList/MerchantList";
import { useEffect, useState } from "react";

export function ContentProvider() {
  const selectedItem = useRecoilValue(selectedNavItem);
  const [dom, setDom] = useState(<></>);
  console.log("content", selectedItem);
  useEffect(() => {
    console.log("nav selected", selectedItem);
    switch (selectedItem) {
      case NavItem.MerchantOnboarding:
        setDom(<MerchantOnboarding />);
        break;
      case NavItem.MerchantList:
        setDom(<MerchantList />);
        break;
      default:
        setDom(<></>);
    }
  }, [selectedItem]);
  return dom;
}

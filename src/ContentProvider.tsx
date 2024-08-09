import { useRecoilValue } from "recoil";
import { ClientOnboarding } from "./ClientOnboarding/ClientOnboarding";
import { NavItem, selectedNavItem } from "./RecoilState";
import { ClientList } from "./ClientList/ClientList";
import { useEffect, useState } from "react";

export function ContentProvider() {
  const selectedItem = useRecoilValue(selectedNavItem);
  const [dom, setDom] = useState(<></>);
  console.log("content", selectedItem);
  useEffect(() => {
    console.log("nav selected", selectedItem);
    switch (selectedItem) {
      case NavItem.ClientOnboarding:
        setDom(<ClientOnboarding />);
        break;
      case NavItem.ClientList:
        setDom(<ClientList />);
        break;
      default:
        setDom(<></>);
    }
  }, [selectedItem]);
  return dom;
}

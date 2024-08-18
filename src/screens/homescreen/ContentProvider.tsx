import { MerchantList } from "../merchantManagement/MerchantList";
import { useEffect, useState } from "react";
import { MerchantOnboarding } from "../merchantManagement/MerchantOnboarding";
import { MerchantUpdate } from "../merchantManagement/MerchantUpdate";
import { Screen } from "../../Constants";
import MenuItem from "antd/es/menu/MenuItem";
import { Menu } from "../menuScreen/Menu";

export function ContentProvider({ screen }): React.ReactElement<Screen> {
  const [dom, setDom] = useState(<></>);
  useEffect(() => {
    switch (screen) {
      case Screen.MerchantOnboardingScreen:
        setDom(<MerchantOnboarding />);
        break;
      case Screen.MerchantListScreen:
        setDom(<MerchantList />);
        break;
      case Screen.MerchantUpdateScreen:
        setDom(<MerchantUpdate />);
        break;
      case Screen.RestaurantMenuScreen:
        setDom(<Menu />);
        break;
      default:
        setDom(<></>);
    }
  }, [screen]);
  return <div style={{ padding: "20px" }}>{dom}</div>;
}

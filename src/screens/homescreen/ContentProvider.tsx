import { MerchantList } from "../merchantManagement/MerchantList";
import { useEffect, useState } from "react";
import { MerchantOnboarding } from "../merchantManagement/MerchantOnboarding";
import { MerchantUpdate } from "../merchantManagement/MerchantUpdate";
import { Screen } from "../../Constants";

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
      default:
        setDom(<></>);
    }
  }, [screen]);
  return dom;
}

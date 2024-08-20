import { MerchantList } from "../merchantManagement/MerchantList";
import { useEffect, useState } from "react";
import { MerchantOnboarding } from "../merchantManagement/MerchantOnboarding";
import { MerchantUpdate } from "../merchantManagement/MerchantUpdate";
import { Screen } from "../../Constants";
import MenuItem from "antd/es/menu/MenuItem";
import { Menu } from "../menuScreen/Menu";
import { CreateRestaurant } from "../restaurantManagement/CreateRestaurant";
import { UpdateRestaurant } from "../restaurantManagement/UpdateRestaurant";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import NotFound from "../../404";
import { RestaurantList } from "../restaurantManagement/RestaurantList";

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
      case Screen.RestaurantCreateScreen:
        setDom(<CreateRestaurant />);
        break;
      case Screen.RestaurantUpdateScreen:
        setDom(<UpdateRestaurant />);
        break;
      case Screen.RestaurantListScreen:
        setDom(<RestaurantList />);
        break;
      default:
        setDom(<></>);
    }
  }, [screen]);
  return (
    <ErrorBoundary fallback={<NotFound />}>
      {" "}
      <div style={{ padding: "20px" }}>{dom}</div>
    </ErrorBoundary>
  );
}

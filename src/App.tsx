import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Homepage } from "./screens/homescreen/Homepage";
import { RecoilRoot } from "recoil";
import { Screen } from "./Constants";
import { ConfigProvider } from "antd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage screen={Screen.LogInScreen} />,
  },
  {
    path: "/merchant/create",
    element: <Homepage screen={Screen.MerchantOnboardingScreen} />,
  },
  {
    path: "/merchant/list",
    element: <Homepage screen={Screen.MerchantListScreen} />,
  },
  {
    path: "/:merchantId/update",
    element: <Homepage screen={Screen.MerchantUpdateScreen} />,
  },
  {
    path: "/:merchantId/delete",
    element: <Homepage screen={Screen.MerchantDeleteScreen} />,
  },
  {
    path: "/menu",
    element: <Homepage screen={Screen.RestaurantMenuScreen} />,
  },
  {
    path: "/restaurant/create",
    element: <Homepage screen={Screen.RestaurantCreateScreen} />,
  },
  {
    path: "/restaurant/:restaurantId/update",
    element: <Homepage screen={Screen.RestaurantUpdateScreen} />,
  },
  {
    path: "/restaurant/list",
    element: <Homepage screen={Screen.RestaurantListScreen} />,
  },
]);

function App() {
  return (
    <ConfigProvider>
      {" "}
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </ConfigProvider>
  );
}

export default App;

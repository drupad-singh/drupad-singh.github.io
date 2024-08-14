import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Homepage } from "./screens/homescreen/Homepage";
import { RecoilRoot } from "recoil";
import { Screen } from "./Constants";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage screen={Screen.MerchantOnboardingScreen} />,
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
]);

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;

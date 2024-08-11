import { Router, RouterProvider } from "react-router-dom";
import { Homepage } from "./Homepage";
import { RecoilRoot } from "recoil";
import { Screen } from "./types/Screen";

const router = [
  {
    path: "/",
    element: <Homepage screen={Screen.MerchantOnboardingScreen} />,
  },
  {
    path: "/merchant/list",
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
];

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;

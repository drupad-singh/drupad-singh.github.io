import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Homepage } from "./screens/homescreen/Homepage";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { Screen } from "./Constants";
import { ConfigProvider } from "antd";
import { LogIn, SignUp } from "./screens/loginScreen/SignUp";
import { refreshToken, useCallApi, verifyAccessToken } from "./utils/Api";
import { AuthState } from "./storage/RecoilState";
import { useEffect, useMemo, useState } from "react";
import { authTokenStorage } from "./storage/LocalStorage";

const router = (authenticated) => {
  // const location = window.location;
  // if (
  //   !authenticated &&
  //   location.pathname != "/signup" &&
  //   location.pathname != "/login"
  // ) {
  //   window.location.href = "/login";
  // }
  const privateRoute = ({ path, element }) =>
    authenticated ? { path, element } : { path: "*", element: <LogIn /> };
  return createBrowserRouter([
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <LogIn />,
    },
    privateRoute({
      path: "/",
      element: <Homepage screen={Screen.RestaurantMenuScreen} />,
    }),
    privateRoute({
      path: "/merchant/create",
      element: <Homepage screen={Screen.MerchantOnboardingScreen} />,
    }),
    privateRoute({
      path: "/merchant/list",
      element: <Homepage screen={Screen.MerchantListScreen} />,
    }),
    privateRoute({
      path: "/:merchantId/update",
      element: <Homepage screen={Screen.MerchantUpdateScreen} />,
    }),
    privateRoute({
      path: "/:merchantId/delete",
      element: <Homepage screen={Screen.MerchantDeleteScreen} />,
    }),
    privateRoute({
      path: "/menu",
      element: <Homepage screen={Screen.RestaurantMenuScreen} />,
    }),
    privateRoute({
      path: "/restaurant/create",
      element: <Homepage screen={Screen.RestaurantCreateScreen} />,
    }),
    privateRoute({
      path: "/restaurant/:restaurantId/update",
      element: <Homepage screen={Screen.RestaurantUpdateScreen} />,
    }),
    privateRoute({
      path: "/restaurant/list",
      element: <Homepage screen={Screen.RestaurantListScreen} />,
    }),
  ]);
};

function App() {
  const [authToken, setAuthToken] = useRecoilState(AuthState);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const localToken = authTokenStorage.fetch();
      const isValid = verifyAccessToken(localToken);
      if (!isValid) {
        refreshToken(localToken, (token) => {
          console.log("refresh token", token);
          setAuthToken(token);
          authTokenStorage.save(token);
        }).catch((e) => {
          authTokenStorage.save(null);
          console.log(e);
        });
      } else {
        setAuthToken(localToken);
      }
    } catch (e) {
      authTokenStorage.save(null);
      setAuthenticated(false);
      console.error("Local Token is not valid");
    }
  }, []);

  useEffect(() => {
    const isValid = verifyAccessToken(authToken);
    if (isValid) {
      setAuthenticated(true);
    }
  }, [authToken]);

  return (
    <ConfigProvider>
      <RouterProvider router={router(authenticated)} />
    </ConfigProvider>
  );
}

export default App;

import { Layout } from "antd";

import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Heading } from "../../Heading";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  LayoutState,
  NavItem,
  SelectedNavItem,
} from "../../storage/RecoilState";
import { ContentProvider } from "./ContentProvider";
import React, { useEffect, useState } from "react";
import { Screen } from "../../Constants";
import { Navbar } from "./Navbar";

const contentStyle: React.CSSProperties = {
  backgroundColor: "#d9d9d9",
  padding: "25px",
  overflow: "scroll",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
};

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "100%",
  height: "100%",
};
type props = {
  screen: Screen;
};

export const Homepage: React.FC<props> = ({ screen }) => {
  const [_, setSelectedNavItem] = useRecoilState(SelectedNavItem);
  const [collapsed, setCollpased] = useRecoilState(LayoutState);
  useEffect(() => {
    // TODO: update url when navitem changes
    // set navbar state on routing changes
    switch (screen) {
      case Screen.MerchantDeleteScreen:
        break;
      case Screen.MerchantOnboardingScreen:
        setSelectedNavItem(NavItem.MerchantOnboarding);
        break;
      case Screen.MerchantListScreen:
        setSelectedNavItem(NavItem.MerchantList);
        break;
      case Screen.RestaurantCreateScreen:
        setSelectedNavItem(NavItem.RestaurantCreate);
        break;
      case Screen.RestaurantListScreen:
        setSelectedNavItem(NavItem.RestaurantList);
        break;
      case Screen.RestaurantMenuScreen:
        setSelectedNavItem(NavItem.MenuDemo);
        break;
      default:
        setSelectedNavItem(NavItem.Nothing);
    }
  }, [screen]);

  return (
    <Layout style={layoutStyle}>
      <Heading />
      <Layout>
        <Sider
          width={"300px"}
          style={siderStyle}
          collapsed={collapsed}
          onCollapse={(isCollpased) => setCollpased(isCollpased)}
          collapsible={true}
          trigger={null}
          collapsedWidth={"100px"}
          onMouseEnter={(ev) => {
            setCollpased(false);
            ev.stopPropagation();
          }}
          onMouseLeave={(ev) => {
            setCollpased(true);
            ev.stopPropagation();
          }}
        >
          <Navbar />
        </Sider>
        <Content style={contentStyle}>
          <ContentProvider screen={screen} />
        </Content>
      </Layout>
    </Layout>
  );
};

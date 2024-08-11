import { Layout } from "antd";
import { Navbar } from "./Navbar";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Heading } from "./Heading";
import { geekblue } from "@ant-design/colors";
import { useRecoilState, useRecoilValue } from "recoil";
import { LayoutState, NavItem, SelectedNavItem } from "./RecoilState";
import { ContentProvider } from "./ContentProvider";
import { Screen } from "./types/Screen";
import React, { Component, PropsWithChildren, useEffect } from "react";

const contentStyle: React.CSSProperties = {
  backgroundColor: geekblue[0],
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
  const [selectedNavItem, setSelectedNavItem] = useRecoilState(SelectedNavItem);
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
      case Screen.MerchantUpdateScreen:
        setSelectedNavItem(NavItem.MerchantOnboarding);
    }
  }, [screen, setSelectedNavItem]);
  const isCollapsed = useRecoilValue(LayoutState);
  return (
    <Layout style={layoutStyle}>
      <Heading />
      <Layout>
        <Sider
          width="300px"
          style={siderStyle}
          collapsible={true}
          trigger={null}
          collapsedWidth={0}
          collapsed={isCollapsed}
        >
          <Navbar />
        </Sider>
        <Content style={contentStyle}>
          <ContentProvider />
        </Content>
      </Layout>
    </Layout>
  );
};

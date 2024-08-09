import { Layout } from "antd";
import { Navbar } from "./Navbar";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Heading } from "./Heading";
import { geekblue } from "@ant-design/colors";
import { useRecoilValue } from "recoil";
import { LayoutState, selectedNavItem } from "./RecoilState";
import { ContentProvider } from "./ContentProvider";

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

export function Homepage() {
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
}

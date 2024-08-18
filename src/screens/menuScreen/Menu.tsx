import { useRecoilValue } from "recoil";
import { MenuItemComponent } from "./MenuItem";
import SampleItems from "./SampleItems.json";
import { CurrentCartItem } from "../../storage/RecoilState";
import { Affix, Badge, Button, Divider, FloatButton, Space } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { theme } from "antd";

const appPrimaryColor = "#001529";

const { useToken } = theme;

export const Menu = () => {
  const currentCartItems = useRecoilValue(CurrentCartItem);
  const cartItemCount = Object.keys(currentCartItems).length;
  const { token } = useToken();
  return (
    <>
      <Space direction="vertical" size={"middle"} style={{ width: "100%" }}>
        {SampleItems.map((item, index) => (
          <>
            <MenuItemComponent item={item} />
            {index < SampleItems.length - 1 && <Divider />}
          </>
        ))}
      </Space>
      {currentCartItems ? (
        <Affix style={{ position: "fixed", bottom: 40, right: 40 }}>
          <Badge count={cartItemCount} color={appPrimaryColor}>
            <Button
              type={"primary"}
              size={"large"}
              shape={"round"}
              style={{
                backgroundColor: "#001529",
                padding: 20,
              }}
            >
              <Space>
                <ShoppingCartOutlined />
                {"Cart"}
              </Space>
            </Button>
          </Badge>
        </Affix>
      ) : (
        <></>
      )}
    </>
  );
};

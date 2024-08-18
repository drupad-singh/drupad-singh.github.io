import { useRecoilValue } from "recoil";
import { MenuItemComponent } from "./MenuItem";
import ItemsJSON from "./SampleItems.json";
import { CurrentCartItem } from "../../storage/RecoilState";
import { Affix, Badge, Button, Divider, Space } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { MenuItem } from "../../types/MenuTypes";

//@ts-ignore
const SampleItems: MenuItem[] = ItemsJSON;

const appPrimaryColor = "#001529";

export const Menu = () => {
  const currentCartItems = useRecoilValue(CurrentCartItem);
  const cartItemCount = Object.keys(currentCartItems).length;
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

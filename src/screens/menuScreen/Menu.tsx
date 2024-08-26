import { useRecoilValue } from "recoil";
import { MenuItemComponent } from "./MenuItem";
import ItemsJSON from "./SampleItems.json";
import { CurrentCartItem } from "../../storage/RecoilState";
import { Affix, Badge, Button, Card, Divider, Space } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { MenuItem } from "../../types/MenuTypes";
import { useState } from "react";
import { Cart } from "./Cart";

//@ts-ignore
const SampleItems: MenuItem[] = ItemsJSON;

const appPrimaryColor = "#001529";

export const Menu = () => {
  const [openCart, setOpenCart] = useState(false);
  const currentCartItems = useRecoilValue(CurrentCartItem);
  const cartItemCount = Object.keys(currentCartItems).length;

  const shoppingCartButton = cartItemCount ? (
    <Affix style={{ position: "fixed", bottom: 40, right: 40 }}>
      <Badge count={cartItemCount} color={appPrimaryColor}>
        <Button
          onClick={() => setOpenCart(true)}
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
  );

  return (
    <>
      <Card style={{ background: "" }}>
        <Space
          direction="vertical"
          size={"middle"}
          style={{ width: "100%", padding: "0px" }}
        >
          {SampleItems.map((item, index) => (
            <div key={index}>
              <MenuItemComponent item={item} />
              <Divider
                plain
                style={{
                  background: "#f1f1f1",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />
            </div>
          ))}
        </Space>
      </Card>
      {openCart ? (
        <Cart cart={currentCartItems} closeDrawer={() => setOpenCart(false)} />
      ) : (
        <></>
      )}
      {shoppingCartButton}
    </>
  );
};

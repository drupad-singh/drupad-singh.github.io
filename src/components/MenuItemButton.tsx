import React from "react";
import { MenuItem } from "../types/MenuTypes";
import { Button, Space, Typography } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { CurrentCartItem } from "../storage/RecoilState";
import { theme } from "antd";

const { getDesignToken } = theme;

export const MenuItemButton: React.FC<{ item: MenuItem }> = ({ item }) => {
  const [cartItems, setCartItems] = useRecoilState(CurrentCartItem);
  const currentCartItem = cartItems[item.id];

  const onItemAdd = () => {
    if (currentCartItem) {
      setCartItems({
        ...cartItems,
        [item.id]: {
          ...currentCartItem,
          quantity: currentCartItem.quantity + 1,
        },
      });
    } else {
      setCartItems({
        ...cartItems,
        [item.id]: { item: item, quantity: 1 },
      });
    }
  };
  const onItemDelete = () => {
    const cartItem = cartItems[item.id];
    if (cartItem.quantity == 1) {
      const newCartItems = { ...cartItems };
      delete newCartItems[item.id];
      setCartItems(newCartItems);
    } else if (cartItem) {
      setCartItems({
        ...cartItems,
        [item.id]: {
          ...currentCartItem,
          quantity: currentCartItem.quantity - 1,
        },
      });
    }
  };
  console.log("cartItems", cartItems);
  const token = getDesignToken();
  return currentCartItem ? (
    <Space direction="horizontal">
      <Button
        size="middle"
        type={"text"}
        style={{ backgroundColor: "rgb(0,0,0,0.1)", padding: 2 }}
      >
        <Button
          type={"default"}
          danger
          size={"small"}
          style={{ border: "none" }}
          onClick={() => onItemDelete()}
        >
          <MinusOutlined />
        </Button>
        {currentCartItem.quantity}
        <Button
          type={"default"}
          size={"small"}
          onClick={() => onItemAdd()}
          style={{ border: "none" }}
        >
          <PlusOutlined onClick={(_) => onItemAdd()} style={{}} />
        </Button>
      </Button>
    </Space>
  ) : (
    <Space>
      <Button onClick={(_) => onItemAdd()} type={"primary"}>
        <Space>
          {"Add"}
          <PlusOutlined style={{ color: "#f1f1f1" }} />
        </Space>
      </Button>
    </Space>
  );
};

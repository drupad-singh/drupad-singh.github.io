import React, { useState } from "react";
import { CartItem } from "../../types/MenuTypes";
import { Button, Col, Drawer, Image, List, Row, Space, Typography } from "antd";
import { MenuItemButton } from "../../components/MenuItemButton";
import { DeleteFilled, DeleteOutlined } from "@ant-design/icons";
import { theme } from "antd";

const { getDesignToken } = theme;

export const CartItemComponent: React.FC<{
  cartItem: CartItem;
}> = ({ cartItem }) => {
  const designToken = getDesignToken();
  return (
    <Row justify={"space-between"}>
      <Space>
        <Image src={cartItem.item.image} width={40} height={40} />
        <Typography.Text>{cartItem.item.name}</Typography.Text>
      </Space>
      <Space size="large">
        <MenuItemButton item={cartItem.item} />
        <Button danger type={"default"} style={{ border: "none" }}>
          <DeleteFilled style={{ color: designToken.colorError }} />
        </Button>
      </Space>
    </Row>
  );
};

export const OrderButton = ({ onClick }) => {
  return (
    <Button type="primary" onClick={onClick}>
      {"Place Order & Pay"}
    </Button>
  );
};

export const Cart: React.FC<{
  cart: { [key: string]: CartItem };
  closeDrawer: () => void;
}> = ({ cart, closeDrawer }) => {
  const cartAmount = Object.values(cart)
    .reduce((acc, v) => acc + v.item.price, 0)
    .toFixed(2);

  const itemsInCart = Object.values(cart).length;
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  return (
    <Drawer
      open={true}
      title={`Items In Your Cart (${itemsInCart})`}
      onClose={closeDrawer}
      placement={"bottom"}
    >
      {showOrderSuccess ? (
        <Row justify={"center"}>
          <Space
            direction="vertical"
            style={{ alignItems: "center", justifyItems: "center" }}
          >
            <Image src="./order_success.png" height={200} width={300} />
            <Typography.Text strong type={"success"}>
              {"Ooo la la Ooo la laah, your Order is Successful !!"}
            </Typography.Text>
          </Space>
        </Row>
      ) : (
        <Space direction={"vertical"} size={40} style={{ width: "100%" }}>
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            {Object.values(cart).map((item) => (
              <CartItemComponent cartItem={item} />
            ))}
          </Space>
          <Row justify={"space-between"}>
            <Typography.Text>{"Total Amount (including GST) "}</Typography.Text>
            <Typography.Text strong>{"₹ " + cartAmount}</Typography.Text>
          </Row>
          <Row justify={"end"}>
            <OrderButton onClick={() => setShowOrderSuccess(true)} />
          </Row>
        </Space>
      )}
    </Drawer>
  );
};

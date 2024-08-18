import { Button, Col, Image, Row, Space, Typography } from "antd";
import {
  MinusOutlined,
  PlusOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { CurrentCartItem } from "../../storage/RecoilState";
import { MenuItem } from "../../types/MenuTypes";
import { useMemo } from "react";
import { theme } from "antd";
const { useToken } = theme;

export const MenuItemComponent: React.FC<{ item: MenuItem }> = ({ item }) => {
  const ratingLogo = useMemo(
    () =>
      new Array(5).fill(0).map((_, i) => {
        const rating = Math.floor(item.rating);
        return i + 1 > rating ? (
          <StarOutlined style={{ color: "#FFD700" }} />
        ) : (
          <StarFilled style={{ color: "#FFD700" }} />
        );
      }),
    [item]
  );

  const [cartItems, setCartItems] = useRecoilState(CurrentCartItem);
  const itemInCart = cartItems[item.id];

  console.log(cartItems);

  const quantity = itemInCart ? itemInCart.quantity : 0;

  const onItemAdd = () => {
    const cartItem = cartItems[item.id];
    if (cartItem) {
      setCartItems({
        ...cartItems,
        [item.id]: { ...cartItem, quantity: cartItem.quantity + 1 },
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
    if (cartItem) {
      setCartItems({
        ...cartItems,
        [item.id]: { ...cartItem, quantity: cartItem.quantity - 1 },
      });
    }
  };
  const { token } = useToken();
  const AddButton = quantity ? (
    <Space direction="horizontal">
      <Button
        type={"primary"}
        onClick={(_) => onItemAdd()}
        style={{ border: "none", outline: "none" }}
      >
        <PlusOutlined />
      </Button>
      {quantity}
      <Button type="primary" onClick={(_) => onItemDelete()}>
        <MinusOutlined />
      </Button>
    </Space>
  ) : (
    <Button onClick={(_) => onItemAdd()} type={"primary"}>
      <Space>
        {"Add"}
        <PlusOutlined style={{ color: "#f1f1f1" }} />
      </Space>
    </Button>
  );
  return (
    <Col>
      <Row justify={"space-between"}>
        <Row justify={"start"} align={"middle"} gutter={16}>
          <Col>
            <Image src={item.image} width={50} height={50} />
          </Col>
          <Col>
            <Space direction="vertical" size={0}>
              <Typography.Text strong style={{ fontSize: "16px" }}>
                {item.name}
              </Typography.Text>
              <Typography.Text strong>{item.price + " ₹"}</Typography.Text>
              <Space>
                <div>{ratingLogo}</div>
                <Typography.Text strong>{item.rating}</Typography.Text>
              </Space>
            </Space>
          </Col>
        </Row>
        {AddButton}
      </Row>
      <Typography.Paragraph>{item.description}</Typography.Paragraph>
    </Col>
  );
};

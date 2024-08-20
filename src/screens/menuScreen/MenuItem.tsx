import {
  Button,
  Col,
  Collapse,
  CollapseProps,
  ConfigProvider,
  Divider,
  Image,
  Row,
  Space,
  Typography,
} from "antd";
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
import { NutritionDetails } from "./NutritionDetails";
import { RatingComponent, ReviewComponent } from "../../components/Reviews";
import { MenuItemButton } from "../../components/MenuItemButton";
const { useToken } = theme;

export const MenuItemComponent: React.FC<{ item: MenuItem }> = ({ item }) => {
  const ratingLogo = useMemo(
    () =>
      new Array(5).fill(0).map((_, i) => {
        const rating = Math.floor(item.rating);
        return i + 1 > rating ? (
          <StarOutlined style={{ color: "#ccb647" }} />
        ) : (
          <StarFilled style={{ color: "#ccb647" }} />
        );
      }),
    [item]
  );

  const { token } = useToken();

  const items: CollapseProps["items"] = useMemo(
    () => [
      {
        key: item.id,
        label: "Nutrition Details & reviews",
        children: (
          <div>
            <Row>
              {item.nutrients.map((nutrition) => (
                <NutritionDetails nutrition={nutrition} />
              ))}
            </Row>

            <ReviewComponent reviews={item.reviews} />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <Col>
      <Space direction="vertical" style={{ width: "100%" }} size={20}>
        <Row justify={"space-between"}>
          <Row justify={"start"} align={"middle"} gutter={16}>
            <Col>
              <Image src={item.image} width={80} height={80} />
            </Col>
            <Col>
              <Space direction="vertical" size={10}>
                <Space direction="vertical" size={0}>
                  <Typography.Text strong style={{ fontSize: "16px" }}>
                    {item.name}
                  </Typography.Text>
                  <Space>
                    <RatingComponent rating={item.rating} />
                    <Typography.Text strong>{item.rating}</Typography.Text>
                  </Space>
                </Space>
                <Typography.Text strong>{"₹ " + item.price}</Typography.Text>
              </Space>
            </Col>
          </Row>
          <MenuItemButton item={item} />
        </Row>
        <Typography.Paragraph>{item.description}</Typography.Paragraph>
      </Space>
      <Collapse bordered={false} items={items} size={"small"}></Collapse>
    </Col>
  );
};

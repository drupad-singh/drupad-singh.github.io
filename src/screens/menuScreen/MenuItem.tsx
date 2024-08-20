import {
  Col,
  Collapse,
  CollapseProps,
  Image,
  Row,
  Space,
  Typography,
} from "antd";
import { MenuItem } from "../../types/MenuTypes";
import { useMemo } from "react";
import { NutritionDetails } from "./NutritionDetails";
import { RatingComponent, ReviewComponent } from "../../components/Reviews";
import { MenuItemButton } from "../../components/MenuItemButton";
import { FormDimens } from "../../Constants";
import { useDeviceType } from "../../utils/Device";
import { Device } from "../../types/Common";

export const MenuItemComponent: React.FC<{ item: MenuItem }> = ({ item }) => {
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

  const device = useDeviceType();

  return (
    <Col>
      <Space direction="vertical" style={{ width: "100%" }} size={20}>
        <Row justify={"space-between"} gutter={[0, 20]}>
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
          <Col span={device == Device.Mobile ? 24 : undefined}>
            <MenuItemButton item={item} />
          </Col>
        </Row>
        <Typography.Paragraph>{item.description}</Typography.Paragraph>
      </Space>
      <Collapse bordered={false} items={items} size={"small"}></Collapse>
    </Col>
  );
};

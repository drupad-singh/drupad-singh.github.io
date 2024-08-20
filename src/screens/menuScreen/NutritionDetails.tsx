import { Col, Row, Space, Typography } from "antd";
import { Nutrient } from "../../types/MenuTypes";
import React from "react";

export const NutritionDetails: React.FC<{ nutrition: Nutrient }> = ({
  nutrition,
}) => {
  return [
    <Col span={18}>
      <Typography.Text strong>{nutrition.name}</Typography.Text>
    </Col>,
    <Col span={6}>
      <Typography.Text>
        {nutrition.quantity + " " + nutrition.unit}
      </Typography.Text>
    </Col>,
  ];
};

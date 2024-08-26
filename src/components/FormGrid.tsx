import { Col, Grid, Row } from "antd";
import { FormDimens } from "../Constants";
import { useDeviceType } from "../utils/Device";
import { Device } from "../types/Common";

export function FormGrid({
  columns,
  colspan,
}: {
  columns: JSX.Element[];
  colspan?: number;
}) {
  const device = useDeviceType();
  return (
    <Row
      gutter={[
        { xs: 8, sm: 16, md: 24, lg: 100 },
        { xs: 8, sm: 16, md: 24, lg: 32 },
      ]}
      wrap
    >
      {columns.map((c, i) => (
        <Col
          key={i}
          span={
            device == Device.Desktop && colspan ? colspan : FormDimens.colSpan
          }
        >
          {c}
        </Col>
      ))}
    </Row>
  );
}

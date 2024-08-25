import { Col, Grid, Row } from "antd";
import { FormDimens } from "../Constants";

export function FormGrid({
  columns,
  colspan,
}: {
  columns: JSX.Element[];
  colspan?: number;
}) {
  return (
    <Row
      gutter={[
        { xs: 8, sm: 16, md: 24, lg: 100 },
        { xs: 8, sm: 16, md: 24, lg: 32 },
      ]}
      wrap
    >
      {columns.map((c, i) => (
        <Col key={i} span={colspan ? colspan : FormDimens.colSpan}>
          {c}
        </Col>
      ))}
    </Row>
  );
}

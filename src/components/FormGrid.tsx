import { Col, Grid, Row } from "antd";
import { FormDimens } from "../Constants";

export function FormGrid({ columns }: { columns: JSX.Element[] }) {
  return (
    <Row
      gutter={[
        { xs: 8, sm: 16, md: 24, lg: 32 },
        { xs: 8, sm: 16, md: 24, lg: 32 },
      ]}
      wrap
    >
      {columns.map((c, i) => (
        <Col key={i} span={FormDimens.colSpan}>
          {c}
        </Col>
      ))}
    </Row>
  );
}

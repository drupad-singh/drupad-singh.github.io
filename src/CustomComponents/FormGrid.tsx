import { Col, Row } from "antd";
import { FormDimens } from "../Constants";

export function FormGrid({ columns }: { columns: JSX.Element[] }) {
  return (
    <Row gutter={[FormDimens.gutterSizeX, FormDimens.gutterSizeY]}>
      {columns.map((c, i) => (
        <Col key={i} span={FormDimens.colSpan}>
          {c}
        </Col>
      ))}
    </Row>
  );
}

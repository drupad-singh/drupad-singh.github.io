import { red } from "@ant-design/colors";
import { DribbbleOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import { useRecoilState } from "recoil";
import { LayoutState } from "./storage/RecoilState";

const { Title } = Typography;
export function Heading() {
  const [collapsed, setCollpased] = useRecoilState(LayoutState);
  return (
    <Row style={{ backgroundColor: "#001529", border: "1px solid #000" }}>
      <Col span={2} style={{ height: "100%" }}>
        <Row
          style={{ padding: "10px", height: "100%" }}
          align={"middle"}
          justify={"start"}
        >
          <UnorderedListOutlined
            onClick={(ev) => {
              setCollpased(!collapsed);
              ev.preventDefault();
              ev.stopPropagation();
            }}
          />
        </Row>
      </Col>
      <Col span={20}>
        <Row
          align={"middle"}
          justify={"center"}
          style={{ padding: "10px" }}
          gutter={[8, 8]}
        >
          <Col>
            <DribbbleOutlined style={{ color: red[3] }} />
          </Col>
          <Col>
            <Title
              level={2}
              style={{ color: red[4], margin: "0px" }}
              className="gutter-row"
            >
              {"Dashdine"}
            </Title>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

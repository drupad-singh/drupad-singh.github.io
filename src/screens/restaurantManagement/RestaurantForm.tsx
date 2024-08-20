import { Button, Collapse, Row, Space } from "antd";
import { Form } from "react-final-form";
import {
  RestaurantAccordions,
  RestaurantDetails,
} from "../../types/RestaurantTypes";
import { useEffect, useMemo, useState } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { AddressDetails } from "../../components/AddressDetails";
import { BasicDetails } from "./BasicDetails";

type props = {
  handleFormSubmit: (m: RestaurantDetails) => undefined;
  merchantDetails: JSON;
};

export const RestaurantForm = ({
  restaurantDetails,
  handleFormSubmit,
  ctaText,
}): React.ReactElement<props> => {
  const [selectedAccordion, setSelectedAccordion] = useState(
    RestaurantAccordions.BasicDetails
  );

  const allAccordionItems = useMemo(() => {
    const handleDelete = (key) => {
      setVisibleAccordions((allAccordionItems) =>
        allAccordionItems.filter((k) => k.key != key)
      );
      setSelectedAccordion((item) =>
        item == key ? RestaurantAccordions.BasicDetails : item
      );
    };
    const deleteButton = (key: RestaurantAccordions) => (
      <Button
        type="default"
        danger
        onClick={(ev) => {
          handleDelete(key);
          ev.stopPropagation();
        }}
      >
        <DeleteOutlined />
      </Button>
    );
    return [
      {
        key: RestaurantAccordions.BasicDetails,
        label: "Basic Details",
        children: <BasicDetails />,
        visibility: true,
      },
      {
        key: RestaurantAccordions.AddressDetails,
        label: "Address Details",
        children: <AddressDetails />,
        extra: deleteButton(RestaurantAccordions.AddressDetails),
        visibility: restaurantDetails["address"] != undefined,
      },
      {
        key: RestaurantAccordions.AppDetails,
        label: "App Details",
        children: <></>,
        extra: deleteButton(RestaurantAccordions.AppDetails),
        visibility: restaurantDetails["appMetadata"] != undefined,
      },
    ];
  }, [restaurantDetails]);

  const [visibleAccordions, setVisibleAccordions] = useState([]);

  useEffect(() => {
    setVisibleAccordions(allAccordionItems.filter((item) => item.visibility));
  }, [allAccordionItems]);

  const addDetailsButton = () =>
    visibleAccordions.length != allAccordionItems.length ? (
      <Button
        onClick={() =>
          setVisibleAccordions(
            allAccordionItems.slice(0, visibleAccordions.length + 1)
          )
        }
      >
        {<PlusOutlined />}
        {"Add " +
          allAccordionItems.find(
            (x) => !visibleAccordions.find((y) => x.key == y.key)
          ).label}
      </Button>
    ) : (
      <></>
    );

  return (
    <Form
      onSubmit={handleFormSubmit}
      initialValues={{ id: "1", countryCode: "+91 (India)" }}
    >
      {(prop) => (
        <form onSubmit={prop.handleSubmit}>
          <Space direction="vertical" size={"large"}>
            <Collapse
              style={{ width: "100%" }}
              size="large"
              accordion={true}
              items={visibleAccordions}
              defaultActiveKey={[selectedAccordion]}
              activeKey={selectedAccordion}
              onChange={(key: string | string[]) => {
                if (Array.isArray(key)) {
                  key = key[0] || "1";
                }
                setSelectedAccordion(parseInt(key));
              }}
            />
            <Row justify={"space-between"}>
              {addDetailsButton()}
              <Button type="primary" onClick={prop.handleSubmit}>
                {ctaText}
              </Button>
            </Row>
          </Space>
        </form>
      )}
    </Form>
  );
};

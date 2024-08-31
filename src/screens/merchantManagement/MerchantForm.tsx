import { useEffect, useMemo, useState } from "react";
import { Details, Merchant } from "../../types/Merchant";
import { Button, Collapse, Row, Space } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { TaxDetails } from "./TaxDetails";
import { BankDetails } from "./BankDetails";
import { validateError } from "../../types/FormTypes";
import { Maybe } from "../../utils/Core";
import { Form } from "react-final-form";
import { PersonalDetails } from "./PersonalDetails";
import { AddressDetails } from "../../components/AddressDetails";

type props = {
  handleFormSubmit: (m: Merchant) => undefined;
  merchantDetails: JSON;
  ctaText: string;
  showPrimaryButtonLoader?: boolean;
};

export function MerchantForm({
  handleFormSubmit,
  merchantDetails,
  ctaText,
  showPrimaryButtonLoader = false,
}): React.ReactElement<props> {
  const [selectedAccordion, setSelectedAccordion] = useState(
    Details.PersonalDetails
  );

  const allAccordionItems = useMemo(() => {
    const handleDelete = (key) => {
      setVisibleAccordions((allAccordionItems) =>
        allAccordionItems.filter((k) => k.key != key)
      );
      setSelectedAccordion((item) =>
        item == key ? Details.PersonalDetails : item
      );
    };
    const deleteButton = (key: Details) => (
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
        key: Details.PersonalDetails,
        label: "Personal Details",
        children: <PersonalDetails />,
        visibility: true,
      },
      {
        key: Details.AddressDetails,
        label: (
          <Row justify="space-between">
            {"Address Details"}
            <div style={{ color: "#bd3333" }}>{"* required"}</div>
          </Row>
        ),
        children: <AddressDetails />,
        forceRender: true,
        visibility: true,
      },
      {
        key: Details.TaxDetails,
        label: "Tax Details",
        children: <TaxDetails />,
        extra: deleteButton(Details.TaxDetails),
        visibility:
          merchantDetails["details"] &&
          merchantDetails["details"]["taxDetails"],
      },
      {
        key: Details.BankDetails,
        label: "Bank Details",
        children: <BankDetails />,
        extra: deleteButton(Details.BankDetails),
        visibility:
          merchantDetails["details"] &&
          merchantDetails["details"]["bankDetails"],
      },
    ];
  }, [merchantDetails]);

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

  const formValidator = (values: Merchant) => {
    const errors: validateError = {};
    console.log("form values", values);
    if (
      Maybe.isNotEmpty(values.phoneNumber) &&
      !/^\d{10}$/.test(values.phoneNumber)
    ) {
      errors["phoneNumber"] = "Phone number should be of 10 digits";
    }
    return errors;
  };

  return (
    <Form
      onSubmit={handleFormSubmit}
      initialValues={merchantDetails}
      validate={formValidator}
    >
      {(prop) => (
        <form onSubmit={prop.handleSubmit}>
          <Space direction="vertical" size="large">
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
            <Row justify="space-between">
              {addDetailsButton()}
              <Button
                type="primary"
                onClick={prop.handleSubmit}
                loading={showPrimaryButtonLoader}
                disabled={prop.hasValidationErrors}
              >
                {ctaText}
              </Button>
            </Row>
          </Space>
        </form>
      )}
    </Form>
  );
}

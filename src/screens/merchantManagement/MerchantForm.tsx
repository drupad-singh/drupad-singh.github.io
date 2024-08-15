import { useEffect, useMemo, useState } from "react";
import { Details, Merchant } from "../../types/Merchant";
import { PersonalDetails } from "./PersonalDetails";
import { Button, Card, Collapse, Row, Space } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { AddressDetails } from "./AddressDetails";
import { FinancialDetails } from "./FinancialDetails";
import { BankDetails } from "./BankDetails";
import { validateError } from "../../types/FormTypes";
import { Maybe } from "../../utils/Core";
import { Form } from "react-final-form";

type props = {
  handleFormSubmit: (m: Merchant) => undefined;
  merchantDetails: JSON;
};

export function MerchantForm({
  handleFormSubmit,
  merchantDetails,
  ctaText,
}): React.ReactElement<props> {
  const [selectedAccordion, setSelectedAccordion] = useState(
    Details.PersonalDetails
  );

  const accordionItems = useMemo(() => {
    const handleDelete = (key) => {
      setCurrentAccordions((accordionItems) =>
        accordionItems.filter((k) => k.key != key)
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
        label: "Address Details",
        children: <AddressDetails />,
        extra: deleteButton(Details.AddressDetails),
        visibility: merchantDetails["address"] != undefined,
      },
      {
        key: Details.FinancialDetails,
        label: "Financial Details",
        children: <FinancialDetails />,
        extra: deleteButton(Details.FinancialDetails),
        visibility: merchantDetails["financialDetails"] != undefined,
      },
      {
        key: Details.BankDetails,
        label: "Bank Details",
        children: <BankDetails />,
        extra: deleteButton(Details.BankDetails),
        visibility: merchantDetails["bankDetails"] != undefined,
      },
    ];
  }, [merchantDetails]);

  const [currentAccordions, setCurrentAccordions] = useState([]);
  useEffect(() => {
    setCurrentAccordions(accordionItems.filter((item) => item.visibility));
  }, [accordionItems]);
  console.log(
    "currentAccordions",
    currentAccordions,
    merchantDetails,
    accordionItems
  );

  const addDetailsButton = () =>
    currentAccordions.length != accordionItems.length ? (
      <Button
        onClick={() =>
          setCurrentAccordions(
            accordionItems.slice(0, currentAccordions.length + 1)
          )
        }
      >
        {<PlusOutlined />}
        {"Add " +
          accordionItems.find(
            (x) => !currentAccordions.find((y) => x.key == y.key)
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
          <Card>
            <Space direction="vertical" size="large">
              <Collapse
                style={{ width: "100%" }}
                size="large"
                accordion={true}
                items={currentAccordions}
                defaultActiveKey={[selectedAccordion]}
                activeKey={selectedAccordion}
                onChange={(key: string | string[]) => {
                  console.log("accordion onchange", key);
                  if (Array.isArray(key)) {
                    key = key[0] || "1";
                  }
                  setSelectedAccordion(parseInt(key));
                }}
              />
              <Row justify="space-between">
                {addDetailsButton()}
                <Button type="primary" onClick={prop.handleSubmit}>
                  {ctaText}
                </Button>
              </Row>
            </Space>
          </Card>
        </form>
      )}
    </Form>
  );
}

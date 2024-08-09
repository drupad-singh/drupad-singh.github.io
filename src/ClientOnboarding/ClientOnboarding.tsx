import { Form, useFormState } from "react-final-form";
import { Merchant } from "../types/Client";
import {} from "../CustomComponents/FormComponents";
import { Button, Card, Collapse, Row, Space } from "antd";
import { PersonalDetails } from "./PersonalDetails";
import { AddressDetails } from "./AddressDetails";
import { useState } from "react";
import { ClientDetailsStorage } from "../Storage/LocalStorage";
import { Maybe } from "../CustomComponents/Core";
import { FinancialDetails } from "./FinancialDetails";
import { BankDetails } from "./BankDetails";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

function FormStateDisplay() {
  const formState = useFormState();
  console.log("formState", formState);
  return <> </>;
}

enum Details {
  AddressDetails,
  PersonalDetails,
  FinancialDetails,
  BankDetails,
}

export function ClientOnboarding() {
  const [currentSection, setCurrentSection] = useState(Details.PersonalDetails);
  const [clientDetails, setClientDetails] = useState({ countryCode: "+91" });
  const [currentItems, setCurrentItems] = useState([
    {
      key: Details.PersonalDetails,
      label: "Personal Details",
      children: <PersonalDetails />,
    },
  ]);
  const handleDelete = (key) => {
    setCurrentItems((items) => items.filter((k) => k.key != key));
    setCurrentSection((section) =>
      section == key ? Details.PersonalDetails : section
    );
  };

  const deleteButton = (key) => (
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

  const items = [
    {
      key: Details.PersonalDetails,
      label: "Personal Details",
      children: <PersonalDetails />,
    },
    {
      key: Details.AddressDetails,
      label: "Address Details",
      children: <AddressDetails />,
      extra: deleteButton(Details.AddressDetails),
    },
    {
      key: Details.FinancialDetails,
      label: "Website Details",
      children: <FinancialDetails />,
      extra: deleteButton(Details.FinancialDetails),
    },
    {
      key: Details.BankDetails,
      label: "Bank Details",
      children: <BankDetails />,
      extra: deleteButton(Details.BankDetails),
    },
  ];

  const handleFormSubmit = (values: Merchant) => {
    setClientDetails(values);
    const savedClientDetails = ClientDetailsStorage.fetch();
    if (savedClientDetails != null) {
      savedClientDetails.push(values);
      ClientDetailsStorage.save(savedClientDetails);
    } else {
      ClientDetailsStorage.save([values]);
    }
  };

  type validateError = { [key: string]: string };

  const formValidator = (values: Merchant) => {
    const errors: validateError = {};
    console.log("here", values.phoneNumber);
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
      initialValues={clientDetails}
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
                items={currentItems}
                defaultActiveKey={[currentSection]}
                activeKey={currentSection}
                onChange={(key: string | string[]) => {
                  console.log("onchange ", key);
                  if (Array.isArray(key)) {
                    key = key[0] || "1";
                  }
                  setCurrentSection(parseInt(key));
                }}
              />
              <Row justify="space-between">
                {currentItems.length != items.length ? (
                  <Button
                    onClick={() =>
                      setCurrentItems(items.slice(0, currentItems.length + 1))
                    }
                  >
                    {<PlusOutlined />}
                    {"Add " +
                      items.find(
                        (x) => !currentItems.find((y) => x.key == y.key)
                      ).label}
                  </Button>
                ) : (
                  <></>
                )}
                <Button type="primary" onClick={prop.handleSubmit}>
                  {" "}
                  Create Merchant{" "}
                </Button>
              </Row>
            </Space>
          </Card>
        </form>
      )}
    </Form>
  );
}

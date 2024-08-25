import { Button, Card, Row, Space } from "antd";
import { Form } from "../../components/Form";
import {
  PasswordInputField,
  PhoneInputField,
  TextInputField,
} from "../../components/FormComponents";
import { FormGrid } from "../../components/FormGrid";
import { ArrowRightOutlined } from "@ant-design/icons";

export const LogIn = () => {
  const handleFormSubmit = (values) => {
    console.log("form submitted ", values);
  };
  return (
    <SignInWrapper title={"Member Log In"}>
      <Form
        handleFormSubmit={handleFormSubmit}
        initialValues={{ countryCode: "+91 (India)" }}
      >
        {(prop) => (
          <Space direction="vertical">
            <FormGrid
              columns={[
                ...PhoneInputField({
                  label: "Phone Number",
                  name: "phoneNumber",
                  countryCodeFieldName: "countryCode",
                  required: true,
                }),
                PasswordInputField({
                  label: "Password",
                  name: "password",
                  required: true,
                }),
              ]}
              colspan={12}
            />
            <Row justify={"end"}>
              <Button size="middle" type="primary">
                {"Log In"}
                <ArrowRightOutlined />
              </Button>
            </Row>
          </Space>
        )}
      </Form>
    </SignInWrapper>
  );
};

export const SignInWrapper = ({ title, children }) => {
  return (
    <Row
      justify={"center"}
      align={"middle"}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Card
        title={title}
        style={{
          width: "70%",
          padding: "40px",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        {children}
      </Card>
    </Row>
  );
};

export const SignUp = () => {
  const handleFormSubmit = (values) => {
    console.log("form submitted", values);
    // call api here
  };
  return (
    <SignInWrapper title="Create Account">
      <Form
        handleFormSubmit={handleFormSubmit}
        initialValues={{ countryCode: "+91 (India)" }}
      >
        {(props) => (
          <Space direction="vertical">
            <FormGrid
              columns={[
                TextInputField({
                  label: "User Name",
                  name: "name",
                  required: true,
                  width: "100%",
                }),
                ...PhoneInputField({
                  label: "Phone Number",
                  name: "phoneNumber",
                  countryCodeFieldName: "countryCode",
                  required: true,
                  width: "100%",
                }),
                PasswordInputField({
                  label: "Password",
                  name: "password",
                  required: true,
                  width: "100%",
                }),
                PasswordInputField({
                  label: "Confirm Password",
                  name: "confirmPassword",
                  required: true,
                  width: "100%",
                }),
              ]}
              colspan={12}
            />
            <Row justify={"end"}>
              <Button
                type={"primary"}
                onClick={props.handleSubmit}
                size={"middle"}
              >
                {"Sign Up"}
              </Button>
            </Row>
          </Space>
        )}
      </Form>
    </SignInWrapper>
  );
};

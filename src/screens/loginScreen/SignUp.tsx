import { Button, Card, Row, Space } from "antd";
import { Form } from "../../components/Form";
import {
  FormSpy,
  PasswordInputField,
  PhoneInputField,
  TextInputField,
} from "../../components/FormComponents";
import { FormGrid } from "../../components/FormGrid";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallApi } from "../../utils/Api";
import { Endpoints } from "../../Constants";
import { AllCountryCodes } from "../../types/Merchant";
import { useRecoilState } from "recoil";
import { AuthState, AuthToken } from "../../storage/RecoilState";
import { authTokenStorage } from "../../storage/LocalStorage";

const brandNameStyles = {
  fontFamily: "Arial, sans-serif",
  fontSize: "3.5rem",
  fontWeight: "bold",
  color: "#d42a13", // White color for contrast on black background
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Slightly more pronounced shadow
  margin: 0,
  padding: 0,
  transition: "color 0.3s ease",
};

export const SignInWrapper = ({ title, children }) => {
  return (
    <Row
      justify={"center"}
      align={"middle"}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Space direction="vertical" style={{ alignItems: "center" }} size={30}>
        <h1 style={brandNameStyles}>{"Dashdine"}</h1>
        <Card
          title={title}
          style={{
            padding: "40px",
            maxWidth: "800px",
            justifyContent: "center",
            background: "#ffffff",
          }}
        >
          {children}
        </Card>
      </Space>
    </Row>
  );
};

export const LogIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const callApi = useCallApi<AuthToken>();
  const [_, setAuthToken] = useRecoilState(AuthState);
  const handleFormSubmit = (values) => {
    callApi({
      ...Endpoints.userLogin(),
      options: { body: values },
      useAuth: false,
    }).then((apiResponse) => {
      setAuthToken(apiResponse.data);
      authTokenStorage.save(apiResponse.data);
      // route forward on successful Login
      if (location.pathname == "/login") {
        navigate("/");
      } else {
        navigate(location.pathname);
      }
    });
  };
  const onSignupClick = () => {
    navigate("/signup");
  };
  return (
    <SignInWrapper title={"Member Log In"}>
      <Form
        handleFormSubmit={handleFormSubmit}
        initialValues={{ countryCode: "+91" }}
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
            <Row justify={"space-between"} style={{ marginTop: "40px" }}>
              <Button
                size="middle"
                type="default"
                onClick={(ev) => {
                  onSignupClick();
                  ev.preventDefault();
                  ev.stopPropagation();
                }}
              >
                {"Not a user? Sign Up"}
              </Button>
              <Button size="middle" type="primary" onClick={prop.handleSubmit}>
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

export const SignUp = () => {
  const handleFormSubmit = (values) => {
    // call api here
  };
  return (
    <SignInWrapper title="Create Account">
      <Form
        handleFormSubmit={handleFormSubmit}
        initialValues={{ countryCode: "+91" }}
      >
        {(props) => (
          <Space direction="vertical">
            <FormGrid
              columns={[
                ...PhoneInputField({
                  label: "Phone Number",
                  name: "phoneNumber",
                  countryCodeFieldName: "countryCode",
                  required: true,
                  parse: (value) => value.split(" ")[0],
                  format: (value) => {
                    const obj = AllCountryCodes.find(
                      (e) => e.dial_code == value
                    );
                    return obj.dial_code + " " + obj.name;
                  },
                }),
                TextInputField({
                  label: "User Name",
                  name: "name",
                  required: true,
                }),
                PasswordInputField({
                  label: "Password",
                  name: "password",
                  required: true,
                }),
                PasswordInputField({
                  label: "Confirm Password",
                  name: "confirmPassword",
                  required: true,
                }),
              ]}
              colspan={12}
            />
            <Row justify={"end"} style={{ marginTop: "40px" }}>
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

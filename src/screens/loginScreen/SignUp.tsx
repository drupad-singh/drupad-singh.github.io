import { Form } from "../../components/Form";
import {
  PasswordInputField,
  PhoneInputField,
  TextInputField,
} from "../../components/FormComponents";
import { FormGrid } from "../../components/FormGrid";

export const LogIn = () => {
  const handleFormSubmit = (values) => {
    console.log("form submitted ", values);
  };
  return (
    <Form handleFormSubmit={handleFormSubmit}>
      {
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
        />
      }
    </Form>
  );
};

export const SignUp = () => {
  const handleFormSubmit = (values) => {
    console.log("form submitted", values);
    // call api here
  };
  return (
    <Form handleFormSubmit={handleFormSubmit}>
      {
        <FormGrid
          columns={[
            TextInputField({
              label: "User Name",
              name: "name",
              required: true,
            }),
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
            PasswordInputField({
              label: "Confirm Password",
              name: "confirmPassword",
              required: true,
            }),
          ]}
        />
      }
    </Form>
  );
};

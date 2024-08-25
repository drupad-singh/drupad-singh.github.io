import React from "react";
import { Form as FinalForm, FormRenderProps } from "react-final-form";
import { validateError } from "../types/FormTypes";
import { FormProps } from "antd";

export const Form: (props: FormRenderProps<JSON>) => React.ReactNode = ({
  handleFormSubmit,
  initialValues = null,
  validate,
  children,
}: {
  handleFormSubmit: (json: JSON) => void;
  initialValues?: JSON;
  validate?: ((json: JSON) => validateError) | undefined;
  children?: (prop: FormRenderProps<JSON>) => React.ReactNode;
}) => {
  return (
    <FinalForm
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validate={validate}
    >
      {(prop) => <form onSubmit={prop.handleSubmit}>{children(prop)}</form>}
    </FinalForm>
  );
};

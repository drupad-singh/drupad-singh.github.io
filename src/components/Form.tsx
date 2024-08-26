import React from "react";
import { Form as FinalForm, FormRenderProps } from "react-final-form";
import { validateError } from "../types/FormTypes";

interface FormValues {
  [key: string]: any;
}

interface FormProps {
  handleFormSubmit: (values: FormValues) => void;
  initialValues?: FormValues;
  validate?: (values: FormValues) => validateError;
  children?: (props: FormRenderProps<FormValues>) => React.ReactNode;
}

export const Form: (props: FormProps) => React.ReactNode = ({
  handleFormSubmit,
  initialValues = {},
  validate,
  children,
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

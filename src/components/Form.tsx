import React from "react";
import { Form as FinalForm } from "react-final-form";
import { validateError } from "../types/FormTypes";

export const Form: React.FC<{
  handleFormSubmit: (json: JSON) => void;
  initialValues?: Object;
  validate?: ((json: JSON) => validateError) | undefined;
  children?: React.ReactNode;
}> = ({ handleFormSubmit, initialValues = {}, validate, children }) => {
  return (
    <FinalForm
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validate={validate}
    >
      {(prop) => <form onSubmit={prop.handleSubmit}>{children}</form>}
    </FinalForm>
  );
};

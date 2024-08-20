import { useField, useForm } from "react-final-form";
import pincodeDir from "india-pincode-lookup";
import { useEffect } from "react";
import { TextInputField } from "./FormComponents";
import { FormGrid } from "./FormGrid";

export const AddressDetails = () => {
  const form = useForm();
  const pinCode = useField("address.pinCode").input.value;
  useEffect(() => {
    const numeric = parseInt(pinCode);
    if (!isNaN(numeric) && pinCode.length == 6) {
      const formState = form.getState();
      const { districtName, stateName } = pincodeDir.lookup(pinCode)[0];
      formState.values.address.state = stateName;
      formState.values.address.city = districtName;
    }
  }, [pinCode]);
  return (
    <FormGrid
      columns={[
        TextInputField({
          label: "Address Line 1",
          name: "address.address1",
          required: true,
        }),
        TextInputField({
          label: "Address Line 2",
          name: "address.address2",
        }),
        TextInputField({
          label: "Landmark",
          name: "address.landmark",
        }),
        TextInputField({
          label: "Pin Code",
          name: "address.pinCode",
          required: true,
        }),
        TextInputField({
          label: "State",
          name: "address.state",
          required: true,
          disabled: true,
        }),
        TextInputField({
          label: "City",
          name: "address.city",
          required: true,
          disabled: true,
        }),
        TextInputField({
          label: "Country",
          name: "address.country",
          required: true,
          disabled: true,
        }),
      ]}
    />
  );
};

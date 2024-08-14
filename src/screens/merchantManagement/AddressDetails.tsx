import { useField, useForm } from "react-final-form";
import pincodeDir from "india-pincode-lookup";
import { useEffect } from "react";
import { FormGrid } from "../../components/FormGrid";
import {
  NumberInputField,
  TextInputField,
} from "../../components/FormComponents";

export function AddressDetails() {
  const form = useForm();
  const pinCode = useField("address.pinCode").input.value;
  useEffect(() => {
    let numeric = parseInt(pinCode);
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
        TextInputField({ label: "Address Line 2", name: "address.address2" }),
        TextInputField({
          label: "Country",
          name: "address.country",
          required: true,
        }),
        TextInputField({
          label: "City",
          name: "address.city",
          required: true,
          disabled: true,
        }),
        TextInputField({
          label: "State",
          name: "address.state",
          required: true,
          disabled: true,
        }),
        NumberInputField({
          label: "Pin Code",
          name: "address.pinCode",
          required: true,
        }),
        TextInputField({ label: "Landmark", name: "address.landmark" }),
      ]}
    />
  );
}

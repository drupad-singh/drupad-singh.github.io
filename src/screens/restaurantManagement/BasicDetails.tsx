import {
  EmailInput,
  NumberInputField,
  SelectInput,
  TextInputField,
} from "../../components/FormComponents";
import { FormGrid } from "../../components/FormGrid";
import { AllCountryCodes } from "../../types/Merchant";

export function BasicDetails() {
  return (
    <FormGrid
      columns={[
        TextInputField({
          label: "Restaurant Name",
          name: "name",
          required: true,
        }),
        EmailInput({
          label: "Email",
          name: "email",
          required: true,
        }),
        TextInputField({
          label: "Telephone",
          name: "telephone",
          required: true,
        }),
        TextInputField({
          label: "Email",
          name: "email",
          required: true,
        }),
        SelectInput({
          label: "Country Code",
          name: "countryCode",
          defaultValue: "+91 (India)",
          width: 150,
          options: AllCountryCodes.map((c) => {
            return {
              label: `${c.dial_code} (${c.name})`,
              value: `${c.dial_code} (${c.name})`,
              rowData: c,
            };
          }),
          required: true,
        }),
        NumberInputField({
          label: "Phone Number",
          name: "phoneNumber",
          required: true,
        }),
        TextInputField({
          label: "Slug",
          name: "slug",
          required: true,
        }),
      ]}
    />
  );
}

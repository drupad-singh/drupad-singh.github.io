import {
  EmailInput,
  NumberInputField,
  SelectInput,
  TextInputField,
} from "../CustomComponents/FormComponents";
import { AllCountryCodes } from "../types/Merchant";
import { FormGrid } from "../CustomComponents/FormGrid";

export function PersonalDetails() {
  return (
    <FormGrid
      columns={[
        TextInputField({
          label: "Business Name",
          name: "name",
          required: true,
        }),
        EmailInput({
          label: "Email",
          name: "email",
          required: true,
        }),
        SelectInput({
          label: "Country Code",
          name: "countryCode",
          defaultValue: "+91",
          width: 200,
          options: AllCountryCodes.map((c) => {
            return {
              label: c.dial_code,
              value: c.dial_code,
              rowData: c,
            };
          }),
          optionRender: (opt) => {
            return (
              <span>{`${opt.data.rowData.name} (${opt.data.value})`}</span>
            );
          },
          required: true,
        }),
        NumberInputField({
          label: "Phone Number",
          name: "phoneNumber",
          required: true,
        }),
      ]}
    />
  );
}

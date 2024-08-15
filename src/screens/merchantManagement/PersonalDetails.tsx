import { Space } from "antd";
import {
  EmailInput,
  NumberInputField,
  SelectInput,
  TextInputField,
} from "../../components/FormComponents";
import { FormGrid } from "../../components/FormGrid";
import { AllCountryCodes } from "../../types/Merchant";

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
        <Space>
          {[
            SelectInput({
              label: "Country Code",
              name: "countryCode",
              defaultValue: "+91",
              width: 100,
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
        </Space>,
      ]}
    />
  );
}

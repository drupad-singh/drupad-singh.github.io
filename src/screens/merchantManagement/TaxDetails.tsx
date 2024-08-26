import { TextInputField } from "../../components/FormComponents";
import { FormGrid } from "../../components/FormGrid";

export function TaxDetails() {
  return (
    <FormGrid
      columns={[
        TextInputField({
          label: "GST Number",
          name: "details.taxDetails.gstNumber",
        }),
        TextInputField({
          label: "TAN Number",
          name: "details.taxDetails.tinNumber",
        }),
        TextInputField({
          label: "CIN Number",
          name: "details.taxDetails.cinNumber",
        }),
        TextInputField({
          label: "PAN Number",
          name: "details.taxDetails.panNumber",
          required: true,
        }),
      ]}
    />
  );
}

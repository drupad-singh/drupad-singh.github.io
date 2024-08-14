import { TextInputField } from "../../components/FormComponents";
import { FormGrid } from "../../components/FormGrid";

export function FinancialDetails() {
  return (
    <FormGrid
      columns={[
        TextInputField({
          label: "GST Number",
          name: "financialDetails.gstNumber",
          required: true,
        }),
        TextInputField({
          label: "TAN Number",
          name: "financialDetails.tanNumber",
          required: true,
        }),
        TextInputField({
          label: "CIN Number",
          name: "financialDetails.cinNumber",
          required: true,
        }),
        TextInputField({
          label: "PAN Name",
          name: "financialDetails.panName",
          required: true,
        }),
        TextInputField({
          label: "PAN Number",
          name: "financialDetails.panNumber",
          required: true,
        }),
      ]}
    />
  );
}

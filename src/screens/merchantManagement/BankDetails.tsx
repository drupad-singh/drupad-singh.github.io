import {
  NumberInputField,
  TextInputField,
} from "../../components/FormComponents";
import { FormGrid } from "../../components/FormGrid";

export function BankDetails() {
  return (
    <FormGrid
      columns={[
        NumberInputField({
          label: "Account Number",
          name: "bankDetails.accountNumber",
          required: true,
        }),
        TextInputField({ label: "IFSC Code", name: "bankDetails.ifscCode" }),
        TextInputField({
          label: "Bank Name",
          name: "bankDetails.bankName",
          required: true,
        }),
        TextInputField({
          label: "Branch Name",
          name: "bankDetails.branchName",
          required: true,
        }),
      ]}
    />
  );
}

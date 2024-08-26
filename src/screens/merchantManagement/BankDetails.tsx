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
          name: "details.bankDetails.accountNumber",
          required: true,
        }),
        TextInputField({ label: "IFSC Code", name: "bankDetails.ifscCode" }),
        TextInputField({
          label: "Bank Name",
          name: "details.bankDetails.bankName",
          required: true,
        }),
        TextInputField({
          label: "Branch Name",
          name: "details.bankDetails.branchName",
          required: true,
        }),
      ]}
    />
  );
}

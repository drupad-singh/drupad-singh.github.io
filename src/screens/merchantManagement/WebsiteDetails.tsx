import { Button, GetProp, message, Upload, UploadProps } from "antd";
import { ImageUpload, TextInputField } from "../../components/FormComponents";
import { FormGrid } from "../../components/FormGrid";

export function WebsiteDetails() {
  return (
    <FormGrid
      columns={[
        TextInputField({ label: "Website Title", name: "websiteTitle" }),
        TextInputField({ label: "Banner Heading", name: "bannerHeading" }),
        TextInputField({ label: "Banner Text", name: "bannerText" }),
        ImageUpload({ label: "Shop Logo", name: "shopLogo" }),
        ImageUpload({ label: "Banner Image", name: "bannerImage" }),
      ]}
    />
  );
}

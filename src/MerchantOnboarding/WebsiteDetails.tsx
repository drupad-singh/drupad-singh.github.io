import { Button, GetProp, message, Upload, UploadProps } from "antd";
import {
  ImageUpload,
  TextInputField,
} from "../CustomComponents/FormComponents";
import { FormGrid } from "../CustomComponents/FormGrid";
import {
  CloudUploadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { blueDark } from "@ant-design/colors";

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

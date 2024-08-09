import { blueDark } from "@ant-design/colors";
import {
  GetProp,
  Input,
  message,
  Select,
  Space,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import { useState } from "react";
import { Field, FieldRenderProps } from "react-final-form";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Maybe } from "./Core";

type fieldError = string;

type fieldOption<DataType> = {
  label: string;
  value: string;
  rowData: DataType;
};

type validateFn = (value: string) => fieldError;
type CustomFieldProps<FieldSpecificProps extends object = {}> = {
  label: string;
  name: string;
  placeholder?: string | undefined;
  required?: boolean;
  disabled?: boolean;
  validate?: undefined | validateFn;
  format?: (value: any, name: string) => any;
  parse?: (value: any, name: string) => any;
} & FieldSpecificProps;

type CustomField = (a: CustomFieldProps) => JSX.Element;

type FieldRenderer<FieldType> = (
  props: FieldRenderProps<FieldType>
) => JSX.Element;

function ErrorMessage(props: { msg: string }) {
  return <Typography.Text type="danger">{props.msg}</Typography.Text>;
}

const composeValidators =
  (...validators) =>
  (values, allValues, meta) => {
    return validators
      .filter((v) => v)
      .reduce((error, validator) => {
        return error || validator(values, allValues, meta);
      }, undefined);
  };
const required = (value) =>
  value == "" || Maybe.isEmpty(value) ? "This field is required" : undefined;

function makeCustomField<FieldType>(
  props: CustomFieldProps,
  renderer: FieldRenderer<FieldType>
) {
  return (
    <Field
      name={props.name}
      validate={(values, allValues, meta) => {
        return (
          props.required
            ? composeValidators(required, props.validate)
            : composeValidators(props.validate)
        )(values, allValues, meta);
      }}
    >
      {(fieldProps) => (
        <Space size="small" direction="vertical">
          {
            <Typography.Text>
              {" "}
              {props.label} {props.required ? "*" : ""}
            </Typography.Text>
          }
          {renderer(fieldProps)}
          {fieldProps.meta.touched || fieldProps.meta.modified ? (
            <ErrorMessage msg={fieldProps.meta.error} />
          ) : (
            <></>
          )}
        </Space>
      )}
    </Field>
  );
}

function statusFromProps<FieldType>(props: FieldRenderProps<FieldType>) {
  return props.meta.error && (props.meta.touched || props.meta.modified)
    ? "error"
    : undefined;
}

export const TextInputField: CustomField = (customProps: CustomFieldProps) => {
  return makeCustomField(customProps, (props: FieldRenderProps<string>) => (
    <Input
      {...props.input}
      status={statusFromProps(props)}
      size={"middle"}
      allowClear={true}
      disabled={customProps.disabled}
    />
  ));
};

export const NumberInputField = (customProps: CustomFieldProps) => {
  let validateInteger = (value: string) => {
    const isValid = /^\s*[0-9]+\s*$/.test(value);
    return !isValid
      ? "Please Enter Numeric value ( numbers between 0-9 )"
      : undefined;
  };
  return makeCustomField(
    { ...customProps, validate: validateInteger },
    (props: FieldRenderProps<string>) => (
      <Input
        {...props.input}
        disabled={customProps.disabled}
        status={statusFromProps(props)}
        size={"middle"}
        allowClear={true}
      />
    )
  );
};

export const EmailInput: CustomField = (customProps: CustomFieldProps) => {
  const validateEmail = (value: string) => {
    const isValid = /^\S+@\S+\.\S+$/.test(value);
    return isValid ? undefined : "Email should be in format john@doe.gmail.com";
  };
  return makeCustomField(
    { ...customProps, validate: validateEmail },
    (props: FieldRenderProps<string>) => (
      <Input
        {...props.input}
        disabled={customProps.disabled}
        status={statusFromProps(props)}
        size="middle"
        allowClear={true}
      />
    )
  );
};
type OptionRender<DataType> = (opt: {
  data: fieldOption<DataType>;
}) => JSX.Element;

export function SelectInput<DataType>(
  customProps: CustomFieldProps<{
    options: fieldOption<DataType>[];
    defaultValue?: string;
    width?: number;
    optionRender?: OptionRender<DataType>;
  }>
): JSX.Element {
  return makeCustomField(customProps, (props: FieldRenderProps<string>) => (
    <Select
      style={{ width: customProps.width || 120 }}
      defaultValue="+91"
      {...props.input}
      options={customProps.options}
      optionRender={customProps.optionRender}
    />
  ));
}

export function ImageUpload(
  customProps: CustomFieldProps<{
    // loading: boolean;
    // setLoading: (prev: boolean) => boolean;
  }>
) {
  const [loading, setLoading] = useState(false);
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <div
      style={{
        border: 0,
        background: "none",
        color: blueDark[1],
        padding: "10px",
      }}
      onMouseEnter={() => {}}
    >
      {loading ? <CloudUploadOutlined /> : <CloudUploadOutlined />}
      <div style={{ marginTop: 8 }}>{"Upload Image"}</div>
    </div>
  );

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
      });
    }
  };
  return makeCustomField(customProps, (props: FieldRenderProps<string>) => (
    <Upload
      disabled={props.disabled}
      name="shopLogo"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="https://60d9c72f5f7bf10017547748.mockapi.io/api/upload"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {props.input.value ? (
        <img src={props.input.value} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  ));
}

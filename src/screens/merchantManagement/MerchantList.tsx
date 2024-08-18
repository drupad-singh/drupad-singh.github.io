import { useEffect, useState } from "react";
import { merchantDetailsStorage } from "../../storage/LocalStorage";
import { Address, Merchant } from "../../types/Merchant";
import {
  Button,
  Empty,
  Skeleton,
  Space,
  Table,
  TableProps,
  Typography,
} from "antd";
import { maybe } from "../../utils/Core";
import { CodeBlock, dracula } from "react-code-blocks";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/es/table";

const columns = (
  editAction: (m: Merchant) => void,
  deleteAction: (m: Merchant) => void
): ColumnsType<Merchant> => [
  {
    dataIndex: "name",
    title: "Name",
  },
  {
    dataIndex: "email",
    title: "Email Address",
  },
  {
    dataIndex: "countryCode",
    title: "Country Code",
  },
  {
    dataIndex: "phoneNumber",
    title: "Phone",
    render: (num) => <Typography.Text>{num.toString()}</Typography.Text>,
  },
  {
    dataIndex: "address",
    title: "Address",
    render: (item: Address) =>
      item
        ? `${item.address1} ${item.address2 || ""}, ${item.city} ${
            item.state
          }, ${item.country}`
        : "",
  },
  {
    title: "Action",
    key: "action",
    fixed: "right",
    width: 100,
    render: (_, record) => {
      return (
        <Space>
          <Button onClick={() => editAction(record)}>Edit </Button>
          <Button onClick={() => deleteAction(record)}>Delete</Button>
        </Space>
      );
    },
  },
];

export function MerchantList() {
  const [merchantDetails, setMerchantDetails] = useState<Merchant[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  let navigate = useNavigate();
  const expandedRowRender = (merchantDetails) => {
    return (
      <CodeBlock
        theme={dracula}
        text={JSON.stringify(merchantDetails, undefined, 4)}
        showLineNumbers
        language="json"
      />
    );
  };

  const onEditAction = (merchant: Merchant) => {
    navigate(`/${merchant.id}/update`);
  };
  const onDeleteAction = (merchant: Merchant) => {};

  useEffect(() => {
    const _merchantDetails = merchantDetailsStorage.fetch();
    if (_merchantDetails != null) {
      setMerchantDetails(_merchantDetails);
    }
    setShowLoader(false);
  }, []);
  let tableDom = <></>;
  if (!showLoader) {
    tableDom = (
      <Table
        columns={columns(onEditAction, onDeleteAction)}
        dataSource={merchantDetails}
        expandable={{
          expandedRowRender,
        }}
        rowKey={(record) => record.id}
      />
    );
  }
  return (
    <>
      <Skeleton active loading={showLoader} />
      {showLoader}
      {tableDom}
    </>
  );
}

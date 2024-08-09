import { useEffect, useState } from "react";
import { ClientDetailsStorage } from "../Storage/LocalStorage";
import { Address, Merchant } from "../types/Client";
import { Empty, Skeleton, Table, TableProps, Typography } from "antd";
import { maybe } from "../CustomComponents/Core";

const columns: TableProps<Merchant>["columns"] = [
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
      `${item.address1} ${item.address2 || ""}, ${item.city} ${item.state}, ${
        item.country
      }`,
  },
];

export function ClientList() {
  const [clientDetails, setClientDetails] = useState<Merchant[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  console.log("clientList ", clientDetails);
  useEffect(() => {
    const _clientDetails = ClientDetailsStorage.fetch();
    if (_clientDetails != null) {
      setClientDetails(_clientDetails);
    }
    setShowLoader(false);
  }, []);
  let tableDom = <></>;
  if (!showLoader) {
    tableDom = <Table columns={columns} dataSource={clientDetails} />;
  }
  return (
    <>
      <Skeleton active loading={showLoader} />
      {showLoader}
      {tableDom}
    </>
  );
}

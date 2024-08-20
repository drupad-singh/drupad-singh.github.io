import Table, { ColumnsType } from "antd/es/table";
import { RestaurantDetails } from "../../types/RestaurantTypes";
import { Address } from "../../types/Common";
import { Button, Skeleton, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CodeBlock, dracula } from "react-code-blocks";
import { restaurantsStorage } from "../../storage/LocalStorage";

const columns = (
  editAction: (r: RestaurantDetails) => void,
  deleteAction: (r: RestaurantDetails) => void
): ColumnsType<RestaurantDetails> => [
  { dataIndex: "name", title: "Name" },
  { dataIndex: "email", title: "Email" },
  { dataIndex: "phoneNumber", title: "Phone Number" },
  { dataIndex: "slug", title: "Slug" },
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

export const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState<RestaurantDetails[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const navigate = useNavigate();
  const expandedRowRender = (restaurant) => {
    return (
      <CodeBlock
        theme={dracula}
        text={JSON.stringify(restaurant, undefined, 4)}
        showLineNumbers
        language="json"
      />
    );
  };

  const onEditAction = (restaurant: RestaurantDetails) => {
    navigate(`/restaurant/${restaurant.id}/update`);
  };
  const onDeleteAction = (restaurant: RestaurantDetails) => {};

  useEffect(() => {
    const savedRestaurants = restaurantsStorage.fetch();
    if (savedRestaurants != null) {
      setRestaurants(savedRestaurants);
    }
    setShowLoader(false);
  }, []);
  let tableDom = <></>;
  if (!showLoader) {
    tableDom = (
      <Table
        columns={columns(onEditAction, onDeleteAction)}
        dataSource={restaurants}
        expandable={{ expandedRowRender }}
        rowKey={(record) => record.id}
      />
    );
  }
  return (
    <>
      <Skeleton active loading={showLoader} />
      {tableDom}
    </>
  );
};

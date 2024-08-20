import React, { useMemo } from "react";
import { Review } from "../types/Common";
import { Card, ConfigProvider, Divider, List, Space, Typography } from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Constants } from "../Constants";

export const ReviewComponent: React.FC<{ reviews: Review[] }> = ({
  reviews,
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            padding: 10,
            paddingLG: 10,
          },
          List: {},
          Pagination: {
            colorPrimary: "rgb(0,0,0,0.6)",
            colorPrimaryHover: "rgb(0,0,0,0.9)",
          },
        },
      }}
    >
      <Card
        title="Reviews"
        bordered={true}
        style={{
          marginTop: "20px",
          borderColor: "rgb(0,0,0,0.1)",
        }}
      >
        <Divider
          style={{
            margin: 0,
            borderColor: "rgb(0,0,0,0.1)",
          }}
        />
        <List
          size="small"
          itemLayout="horizontal"
          dataSource={reviews}
          pagination={{
            size: "small",
            pageSize: Constants.reviewListPageSize,
          }}
          renderItem={(review, index) => (
            <List.Item>
              <List.Item.Meta
                description={review.content}
                title={
                  <Space>
                    <Typography.Text strong>
                      {" "}
                      {"@" + review.reviewer}
                    </Typography.Text>
                    <RatingComponent rating={parseInt(review.rating)} />
                  </Space>
                }
              />
            </List.Item>
          )}
        ></List>
      </Card>
    </ConfigProvider>
  );

  //   return (

  //         {reviews.map((review) => (
  //           <Space
  //             size="small"
  //             direction="vertical"
  //             style={{ marginTop: "20px" }}
  //           >
  //             <Space size={"small"}>
  //                 //             </Space>
  //             <Typography.Text>{review.content}</Typography.Text>
  //           </Space>
  //         ))}
  //       </Card>
  //   );
};

export const RatingComponent: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div>
      {new Array(5).fill(0).map((_, i) => {
        const integerRating = Math.floor(rating);
        return i + 1 > integerRating ? (
          <StarOutlined style={{ color: "#ccb647" }} />
        ) : (
          <StarFilled style={{ color: "#ccb647" }} />
        );
      })}{" "}
    </div>
  );
};

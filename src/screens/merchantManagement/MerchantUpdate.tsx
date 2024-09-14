import { MerchantForm } from "./MerchantForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCallApi } from "../../utils/Api";
import { Endpoints } from "../../Constants";
import ShimmerLoader from "../../components/Shimmer";
import { ScreenWrapper } from "../../components/ScreenWrapper";
import { notification } from "antd";

export const MerchantUpdate: React.FC<object> = () => {
  const [merchant, setMerchant] = useState(null);
  const { merchantId } = useParams();
  const callApi = useCallApi();

  useEffect(() => {
    // fetch merchant
    callApi({
      ...Endpoints.searchMerchant({ queryParams: { merchantId } }),
    })
      .then((response) => {
        console.log("response ", response);
        if (response.success) {
          setMerchant(response.data.items.find((m) => m.id == merchantId));
        } else {
          throw response;
        }
      })
      .catch((e) => console.error(e));
  }, []);

  const handleFormSubmit = (merchantDetails) => {
    // update merchant
    const endpoint = Endpoints.updateMerchant({ pathParams: { merchantId } });
    callApi({
      ...endpoint,
      options: {
        body: merchantDetails,
      },
    })
      .then((response) => {
        if (response.success) {
          setMerchant(response.data);
          notification.open({
            type: "success",
            message: "merchant Updated Successfully",
            placement: "bottomRight",
          });
        } else {
          throw response;
        }
      })
      .catch((e) => console.error(e));
  };
  return (
    <>
      {merchant == null ? (
        <ShimmerLoader />
      ) : (
        <ScreenWrapper>
          <MerchantForm
            merchantDetails={merchant}
            handleFormSubmit={handleFormSubmit}
            ctaText="Update Merchant"
          />
        </ScreenWrapper>
      )}
    </>
  );
};

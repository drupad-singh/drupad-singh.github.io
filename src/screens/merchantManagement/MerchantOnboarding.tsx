import { v4 as uuidv4 } from "uuid";
import { Merchant } from "../../types/Merchant";
import { MerchantForm } from "./MerchantForm";
import { merchantsStorage } from "../../storage/LocalStorage";
import { useCallApi } from "../../utils/Api";
import { Endpoints } from "../../Constants";
import { ScreenWrapper } from "../../components/ScreenWrapper";
import { useEffect, useState } from "react";
import { notification } from "antd";

export function MerchantOnboarding() {
  const [merchantDetails, setMerchantDetails] = useState({
    countryCode: "+91",
  });

  const callApi = useCallApi();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const details = merchantsStorage.fetch();
    if (details != null) {
      setMerchantDetails(details);
    }
  }, []);

  const handleFormSubmit = (updatedMerchantDetails: Merchant, props) => {
    console.log("props");
    setShowLoader(true);
    setMerchantDetails(updatedMerchantDetails);
    merchantsStorage.save(updatedMerchantDetails);
    const endpoint = Endpoints.createMerchant();
    notification.open({ message: "calling api", placement: "bottomRight" });
    callApi({ ...endpoint, options: { body: updatedMerchantDetails } })
      .then((_) => {
        setShowLoader(false);
        notification.open({
          type: "success",
          message: "Successfully Created new merchant",
          placement: "bottomRight",
        });
      })
      .catch((e) => {
        console.error("api error", e);
        setShowLoader(false);
        notification.error({
          message: "Unable to create new merchant",
          placement: "bottomRight",
        });
      });
  };
  return (
    <ScreenWrapper>
      <MerchantForm
        handleFormSubmit={handleFormSubmit}
        merchantDetails={merchantDetails}
        ctaText={"Create Merchant"}
        showPrimaryButtonLoader={showLoader}
      />
    </ScreenWrapper>
  );
}

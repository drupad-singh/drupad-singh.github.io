import { MerchantForm } from "./MerchantForm";
import { DynamicComponent } from "../../components/DynamicComponent";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import ShimmerLoader from "../../components/Shimmer";
import { merchantsStorage } from "../../storage/LocalStorage";

export const MerchantUpdate: React.FC<object> = () => {
  const { merchantId } = useParams();
  const handleFormSubmit = (merchantDetails) => {
    const savedMerchantDetails = merchantsStorage.fetch();
    if (savedMerchantDetails != null) {
      const updatedMerchantDetails = savedMerchantDetails.filter(
        (m) => m.id != merchantId
      );
      updatedMerchantDetails.push(merchantDetails);
      merchantsStorage.save(updatedMerchantDetails);
    } else {
      merchantsStorage.save([merchantDetails]);
    }
  };

  const dom = useMemo(
    () => (
      <DynamicComponent
        apiCall={async () => {
          const merchants = merchantsStorage.fetch();
          const merchant = merchants.find((m) => m.id == merchantId);
          return merchant
            ? Promise.resolve(merchant)
            : Promise.reject("Merchant not found");
        }}
        render={(merchant) => (
          <MerchantForm
            merchantDetails={merchant}
            handleFormSubmit={handleFormSubmit}
            ctaText="Update Merchant"
          />
        )}
      />
    ),
    [merchantId]
  );
  return dom;
};

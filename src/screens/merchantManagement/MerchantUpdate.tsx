import { MerchantForm } from "./MerchantForm";
import { DynamicComponent } from "../../components/DynamicComponent";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import ShimmerLoader from "../../components/Shimmer";
import { merchantDetailsStorage } from "../../storage/LocalStorage";

export const delay = async (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const MerchantUpdate: React.FC<object> = () => {
  const { merchantId } = useParams();
  console.log("merchantId update", merchantId);
  const dom = useMemo(
    () => (
      <DynamicComponent
        apiCall={async () => {
          const merchants = merchantDetailsStorage.fetch();
          const merchant = merchants.find((m) => m.id == merchantId);
          await delay(5000);
          return merchant
            ? Promise.resolve(merchant)
            : Promise.reject("Merchant not found");
        }}
        render={(merchant) => (
          <MerchantForm
            merchantDetails={merchant}
            handleFormSubmit={() => {}}
            ctaText="Update Merchant"
          />
        )}
      />
    ),
    [merchantId]
  );
  return dom;
};

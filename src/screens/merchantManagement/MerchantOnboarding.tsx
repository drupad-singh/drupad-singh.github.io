import { v4 as uuidv4 } from "uuid";
import { Merchant } from "../../types/Merchant";
import { MerchantForm } from "./MerchantForm";
import { merchantsStorage } from "../../storage/LocalStorage";
import { useCallApi } from "../../utils/Api";
import { Endpoints } from "../../Constants";
import { ScreenWrapper } from "../../components/ScreenWrapper";

export function MerchantOnboarding() {
  const merchantDetails = {
    countryCode: "+91 (India)",
  };
  const callApi = useCallApi();
  const handleFormSubmit = (updatedMerchantDetails: Merchant) => {
    // const merchant: Merchant = { id: uuidv4(), ...updatedMerchantDetails };
    // const savedMerchantDetails = merchantsStorage.fetch();
    // if (savedMerchantDetails != null) {
    //   savedMerchantDetails.push(merchant);
    //   merchantsStorage.save(savedMerchantDetails);
    // } else {
    //   merchantsStorage.save([merchant]);
    // }
    const endpoint = Endpoints.createMerchant();
    callApi(endpoint);
  };
  return (
    <ScreenWrapper>
      <MerchantForm
        handleFormSubmit={handleFormSubmit}
        merchantDetails={merchantDetails}
        ctaText={"Create Merchant"}
      />
    </ScreenWrapper>
  );
}

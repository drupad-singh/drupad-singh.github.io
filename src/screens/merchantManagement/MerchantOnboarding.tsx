import { v4 as uuidv4 } from "uuid";
import { Merchant } from "../../types/Merchant";
import { MerchantForm } from "./MerchantForm";
import { merchantDetailsStorage } from "../../storage/LocalStorage";

export function MerchantOnboarding() {
  const merchantDetails = {
    countryCode: "+91",
  };

  const handleFormSubmit = (updatedMerchantDetails: Merchant) => {
    const merchant: Merchant = { id: uuidv4(), ...updatedMerchantDetails };
    const savedMerchantDetails = merchantDetailsStorage.fetch();
    if (savedMerchantDetails != null) {
      savedMerchantDetails.push(merchant);
      merchantDetailsStorage.save(savedMerchantDetails);
    } else {
      merchantDetailsStorage.save([merchant]);
    }
  };
  return (
    <MerchantForm
      handleFormSubmit={handleFormSubmit}
      merchantDetails={merchantDetails}
      ctaText={"Create Merchant"}
    />
  );
}

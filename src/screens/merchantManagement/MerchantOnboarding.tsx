import { v4 as uuidv4 } from "uuid";
import { Merchant } from "../../types/Merchant";
import { MerchantForm } from "./MerchantForm";
import { merchantsStorage } from "../../storage/LocalStorage";

export function MerchantOnboarding() {
  const merchantDetails = {
    countryCode: "+91 (India)",
  };

  const handleFormSubmit = (updatedMerchantDetails: Merchant) => {
    const merchant: Merchant = { id: uuidv4(), ...updatedMerchantDetails };
    const savedMerchantDetails = merchantsStorage.fetch();
    if (savedMerchantDetails != null) {
      savedMerchantDetails.push(merchant);
      merchantsStorage.save(savedMerchantDetails);
    } else {
      merchantsStorage.save([merchant]);
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

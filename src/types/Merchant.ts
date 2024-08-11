import CountryCodes from "../assets/countryCode.json"
import { Maybe, maybe } from "../CustomComponents/Core"

export type CountryCode = {
  name: string,
  dial_code: string,
  code: string
}

//@ts-ignore
export const AllCountryCodes: CountryCode[] = CountryCodes
const indiaCode: CountryCode = Maybe.fromMaybe(CountryCodes.find(c => c.name=="India") ,{
  name: "India",
  dial_code: "+91",
  code: "IN"
})

/**
 * {
    "name": "",
    "phone_number": "",
    "country_code": "",
    "email": "",
    "address": {
        "address1": "",
        "address2": "", // optional,
        "landmark": "", // optional,
        "city": "",
        "state": "",
        "country": "",
        "pin_code": ""
    },
    "financial_details": {
        "gst_number": "",
        "tan_number": "", // tan
        "cin_number": "", // cin
        "pan_number": "",
        "pan_name": ""
    },
    "bank_details": { // optional
        "account_name": "",
        "account_number": ,
        "ifsc_code": "",
        "bank_name": "",
        "branch_name": ""
    }
}
 */


export type Address = {
  pinCode: string,
  state: string,
  country: string,
  city: string,
  address1: string,
  address2: maybe<string>,
  landmark: maybe<string>
}

type FinancialDetails = {
  gstNumber: string,
  tanNumber: string,
  cinNumber: string,
  panNumber: string,
  panName: string
}

type Image = {
  url: string
}

// export type WebsiteDetails = {
//   shopLogo: Image,
//   websiteTitle: string,
//   bannerImage: Image,
//   bannerHeading: string,
//   bannerText: string
// }

export type BankDetails = {
  accountName: string,
  accountNumber: string,
  ifscCode: string,
  bankName: string,
  branchName: string
}

export type Merchant = {
  id: string,
  name: string,
  phoneNumber: string,
  countryCode: string,
  email: string,
  address: Address | undefined,
  financialDetails: FinancialDetails | undefined,
  bankDetails: BankDetails | undefined
}

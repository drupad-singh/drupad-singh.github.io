import { Address, Review } from "./Common"


export type AppMetadata = {
    logo: string,
    cuisine: string[],
    banner?: string,
    bannerText?: string
}

export type RestaurantDetails = {
    id: string,
    name: string,
    address: Address,
    slug: string,
    isActive: string,
    phoneNumber: string,
    countryCode: string,
    merchantId: string,
    appMetadata?: AppMetadata,
    email: string,
    telephone?: string,
    reviews?: {
        rating: number,
        reviews: Review[]
    }
}

export enum RestaurantAccordions {
    BasicDetails,
    AddressDetails,
    AppDetails
}
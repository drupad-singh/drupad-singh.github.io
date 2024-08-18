import { Review } from "./Common"

export type Address = {
    address1: string,
    address2?: string,
    landmark?: string,
    pinCode: string
    geoHash: string,
    state: string,
    city: string,
    country: string
}

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
    appMetadata: AppMetadata,
    email: string,
    telephone: string,
    reviews: {
        rating: number,
        reviews: Review[]
    }
}
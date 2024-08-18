// Item: {
//     // extensible keys
//     itemName: string
//     is_available: boolean
//     itemDescription: MDX
//     ratings: Rating[]
//     reviews: Review[]
//     servingSize: number
//     quantity: number
//     price: float
//     logo: url //(or svg for faster rendering)
//     customizations: CustomizationId[]
//   }

import { MenuItemType } from "antd/es/menu/interface"
import { maybe } from "../utils/Core"
import { Review } from "./Common"

type MdxString = string
type imageUrl = string


export type CartItem = {
    item: MenuItem,
    quantity: number,
    customization?: Customization
}

export type Ingredient = {
    name: string,
    quantity: string,
    unit: string
}

export type Nutrient = {
    name: string,
    quantity: string,
    unit: string
}

export type CustomizationItem = {
    name: string,
    price: string,
    image?: imageUrl,
    isAvailable: string,
    metadata?: object
}

export type Customization = {
    category: string,
    items: CustomizationItem[],
    maxAddons?: number
}

export type MenuItem = {
    id: string,
    name: string,
    isAvailable: boolean,
    description?: MdxString,
    nutrients?: Nutrient[],
    calorieCount?: string,
    calorieUnit?: string,
    servingSize: number,
    price: number,
    image: imageUrl,
    customizations?: Customization[],
    rating?: number,
    reviews?: Review[]
}

export type ItemCategory = {
    name: string,
    categoryId: maybe<string>,
    foodItems: maybe<MenuItem[]>
}
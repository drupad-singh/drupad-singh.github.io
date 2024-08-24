export type User = {
    name: string,
    isVerified: boolean,
    createdAt: string,
    updatedAt: string 
} & Login

export type SignUp = {
    confirmPassword: string
} & User

export type Login = {
    phoneNumber: string,
    password: string,
    countryCode: string,
    email?: string
} 
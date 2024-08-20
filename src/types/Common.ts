export enum MediaType{
    Image = "Image",
    Video = "Video"
}


export type Reply = {
    repliedBy: string,
    content: string
}

export type Media = {
    link: string,
    type: MediaType
}

export type Review = {
    replies: Reply[],
    reviewer: string,
    rate: string,
    content: string,
    medias: Media[]
}


export type Address = {
    address1: string;
    address2?: string;
    landmark?: string;
    pinCode: string;
    geoHash: string;
    state: string;
    city: string;
    country: string;
  };
  
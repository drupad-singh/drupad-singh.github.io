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
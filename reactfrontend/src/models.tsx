export interface IProduct {
    id: number
    image: string | undefined
    title: string
    description: string
    author: string
    date: string
}

export interface ITagItem{
    id: number
    name: string
}

export interface IComment{
    id: number
    user: string
    username: string
    post: number
    content: string
    created_at: string
}
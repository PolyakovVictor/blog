export interface IProduct {
    id: number
    image: string | undefined
    title: string
    description: string
    author: {
        id: number
        username: string
    }
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

export interface IUserData{
    id: number
    email: string
    username: string
}


export interface FavoriteButtonProps {
    post_id: number;
}

export interface UploadProfileImageModalProps{
    show: boolean;
    handleClose: () => void;
}
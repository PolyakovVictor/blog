import { IProduct } from "../models"


interface ProductProps {
    product: IProduct
}


export function Product(props: ProductProps) {
    console.log(props)
    return (
        <div
        className="border py-2 px-4 rounded flex flex-col items-center mb-2"
        >
            { props.product.title }
        </div>
    )
}
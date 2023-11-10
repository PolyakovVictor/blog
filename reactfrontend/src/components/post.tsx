import { IProduct } from "../models"
import '../style/post.css'


interface ProductProps {
    product: IProduct
}


export function Post(props: ProductProps) {
    console.log(props)
    return (
        <div className="col">
            <div className="card shadow-sm">
            <img
                className="bd-placeholder-img card-img-top"
                src={props.product.image}
                alt={props.product.title}
                width="100%"
                height="225"
                role="img"
                aria-label="Placeholder: Thumbnail"
                />
                <div className="card-body">
                    <p className="card-text">{ props.product.description }</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                        </div>
                        <small className="text-body-secondary">{ props.product.date }</small>
                    </div>
                </div>
            </div>
        </div>
    )
}
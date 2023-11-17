import { Link } from "react-router-dom"
import { IProduct } from "../models"
import '../style/post.css'


interface ProductProps {
    product: IProduct
}


export function Post(props: ProductProps) {
    return (
        <div className="col">
            <div key={props.product.id} className="card shadow-sm">
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
                            <Link to={`/detail-post/${props.product.id}`} className='text-decoration-none flex mr-3'>
                                <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                            </Link>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                        </div>
                        <small className="text-body-secondary">{ props.product.date }</small>
                    </div>
                </div>
            </div>
        </div>
    )
}
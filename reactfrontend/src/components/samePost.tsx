import { Link } from "react-router-dom"
import { IProduct } from "../models"
import '../style/post.css'


interface ProductProps {
    product: IProduct
}


export function SamePost(props: ProductProps) {
    console.log(props);
    return (
        <div className='same-posts'>
            <Link to={`/detail-post/${props.product.id}`}>
                <div className="bg-image hover-overlay ripple mb-2 d-flex justify-content-center align-items-center">
                    <img
                    src={props.product.image}
                    className="img-fluid" />
                    <a href="https://mdbootstrap.com/docs/standard/" target="_blank">
                    <div className="mask"></div>
                    </a>
                </div>
            </Link>
        </div>
    )
}
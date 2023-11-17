import '../style/comment.css';
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";
import { IComment } from '../models';


interface CommentProps {
    comment: IComment
}

export function Comment(data: CommentProps) {
    const formattedDate = new Date(data.comment.created_at).toLocaleString();
    return (
        <div className="row mb-4 bg-dark rounded-4">
            <div className="col-2">
                <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(24).jpg"
                className="img-fluid shadow-1-strong rounded-5 mt-2 mb-2" alt="" />
            </div>
            
            <div className="col-10 mt-2">
                <p className="mb-2"><strong>{data.comment.username}</strong></p>
                <p>{data.comment.content}</p>
                <p className="text-right mb-1">{formattedDate}</p>
            </div>
        </div>
  );
};

export default Comment;
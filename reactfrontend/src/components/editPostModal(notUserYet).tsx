import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IProduct } from '../models';

interface ProductProps{
    product: IProduct
}

export function EditPostModal(post: ProductProps){
    const [show, setShow] = useState(false);
    const [editedPost, setEditedPost] = useState(post);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSave = () => {

        console.log('Saved:', editedPost);
        handleClose();
    };

    const handleChange = (e : any) => {
        const { name, value } = e.target;
        setEditedPost({ ...editedPost, [name]: value });
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Редактировать пост
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактировать пост</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="title">Заголовок</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={editedPost.product.title}
                            onChange={handleChange}
                        />
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Сохранить изменения
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditPostModal;

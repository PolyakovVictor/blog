import React, { useState, ChangeEvent } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { UploadProfileImageModalProps } from '../models';


const UploadProfileImageModal: React.FC<UploadProfileImageModalProps> = ({ show, handleClose }) => {
    const [image, setImage] = useState<File | null>(null);
    const auth_token = localStorage.getItem('auth_token');

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const handleImageUpload = async () => {
        if (!image) return;

        const formData = new FormData();
        formData.append('profile_image', image);

        try {
            const response = await axios.put('http://localhost:8000/api/profile_image/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${auth_token}`
                },
            });
            console.log('Image uploaded:', response.data);
            handleClose();
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Upload Profile Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formFile">
                    <Form.Label>Choose an image</Form.Label>
                    <Form.Control type="file" onChange={handleImageChange} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleImageUpload}>
                    Upload
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UploadProfileImageModal;

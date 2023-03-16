import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ILivro } from '../../module/Livro/Livro.type';
import Form from 'react-bootstrap/Form';


interface IProps {
    livro: ILivro;
}


const ExibirModal = (props: IProps) => {

    const { livro } = props;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>Exibir</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{livro.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Resumo</Form.Label>
                        <Form.Control placeholder={livro.resumo} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Editora</Form.Label>
                        <Form.Control placeholder={livro.editora} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Autor</Form.Label>
                        <Form.Control placeholder={livro.autor} disabled />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ExibirModal;
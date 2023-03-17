import React from "react";
import { Container, Form, Col, Row, Button } from "react-bootstrap";

import firebaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const ArgegarCategoria = ({ correoUsuario, setArrayCategorias, arrayCategorias, open, onClose }) => {
    async function añadirCategoria(e) {
        e.preventDefault();
        const descripcion = e.target.formDescripcion.value;
        const tipoCategoria = e.target.formCategoria.value;
        // crear nuevo array de tareas
        const nvoArrayTareas = [
            ...arrayCategorias,
            {
                id: +new Date(),
                descripcion: descripcion,
                tipoCategoria: tipoCategoria,
            },
        ];
        // actualizar base de datos
        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docuRef, { categorias: [...nvoArrayTareas] });
        //actualizar estado
        setArrayCategorias(nvoArrayTareas);
        // limpiar form
        e.target.formDescripcion.value = "";
        e.target.formCategoria.value = "";
    }
    if (!open) return null;
    return (
        <div className="card-img-overlay">
            <div className="modal-content">
                <div className="modalRight">
                    <p className="closeBtn" onClick={onClose}>
                        X
                    </p>
                </div>
                <Form onSubmit={añadirCategoria}>
                    <Row className="mb-5">
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Describe tu categoria"
                                id="formDescripcion"
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Describe tu tipo de categoria"
                                id="formCategoria"
                            />
                        </Col>
                        <Col>
                            <Button type="submit"> Agregar Categoría</Button>
                        </Col>
                    </Row>
                </Form>
                <hr />
            </div>

        </div>
    );
};

export default ArgegarCategoria;

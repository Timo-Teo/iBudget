import React from "react";
import { Container, Form, Col, Row, Button } from "react-bootstrap";

import firebaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const ArgegarCategoria = ({ correoUsuario, setArrayCategorias, arrayCategorias }) => {
    async function añadirTarea(e) {
        e.preventDefault();
        const descripcion = e.target.formDescripcion.value;
        // crear nuevo array de tareas
        const nvoArrayTareas = [
            ...arrayCategorias,
            {
                id: +new Date(),
                descripcion: descripcion,
            },
        ];
        // actualizar base de datos
        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docuRef, { categorias: [...nvoArrayTareas] });
        //actualizar estado
        setArrayCategorias(nvoArrayTareas);
        // limpiar form
        e.target.formDescripcion.value = "";
    }

    return (
        <Container>
            <Form onSubmit={añadirTarea}>
                <Row className="mb-5">
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Describe tu tarea"
                            id="formDescripcion"
                        />
                    </Col>
                    <Col>
                        <Button type="submit"> AgregarTarea</Button>
                    </Col>
                </Row>
            </Form>
            <hr />
        </Container>
    );
};

export default ArgegarCategoria;

import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";

import firebaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
const firestore = getFirestore(firebaseApp);
const ArgegarMeta = ({correoUsuario, setArrayMeta, arrayMeta, open, onClose }) => {
    async function añadirMeta(e) {
        e.preventDefault();
        const descripcion = e.target.formMeta.value;
        const monto = e.target.formMontoMeta.value;
        // crear nuevo array de tareas
        const nvoArrayMeta = [
            ...arrayMeta,
            {
                id: +new Date(),
                descripcion: descripcion,
                monto: monto,
                montoPorPagar: 0.0,
                montoPagado: 0.0,
            },
        ];
        // actualizar base de datos
        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docuRef, { metas: [...nvoArrayMeta] });
        //actualizar estado
        setArrayMeta(nvoArrayMeta);
        // limpiar form
        e.target.formMeta.value = "";
        e.target.formMontoMeta.value = "";
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
                <Form onSubmit={añadirMeta}>
                    <Row className="mb-5">
                        <Form.Group className="mb-3">
                           <Form.Label>Nombre de la meta</Form.Label>
                           <Form.Control type="text" placeholder="Descripcion de la Meta" id="formMeta"/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nombre de la meta</Form.Label>
                            <Form.Control type="text" placeholder="Descripcion del Monto" id="formMontoMeta"/>
                        </Form.Group>

                        <Button type="submit"> Añadir meta</Button>

                    </Row>
                </Form>
                <hr />
            </div>

        </div>
    );
};

export default ArgegarMeta;
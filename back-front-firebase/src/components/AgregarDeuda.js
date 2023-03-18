import React, {useRef, useState} from "react";
import { Form, Col, Row, Button } from "react-bootstrap";

import firebaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
const firestore = getFirestore(firebaseApp);
const ArgegarDeuda = ({correoUsuario, setArrayDeudas, arrayDeudas, open, onClose }) => {
    const [date, setDate] = useState(null);
    const dateInputRef = useRef(null);
    async function añadirDeuda(e) {
        e.preventDefault();
        const razon = e.target.formRazon.value;
        const descripcion = e.target.formDescripcion.value;
        const monto = e.target.formMonto.value;
        const fecha = e.target.formFecha.value;
        console.log("fecha")
        const acreedor = e.target.formAcreedor.value;
        const email = e.target.formCorreo.value;
        // crear nuevo array de tareas
        const nvoArrayDeuda = [
            ...arrayDeudas,
            {
                id: +new Date(),
                razon: razon,
                fecha: fecha,
                descripcion: descripcion,
                monto: monto,
                acreedor:acreedor,
                email:email,
                montoPorPagar: 0.0,
                montoPagado: 0.0,
            },
        ];
        // actualizar base de datos
        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docuRef, { deudas: [...nvoArrayDeuda] });
        //actualizar estado
        setArrayDeudas(nvoArrayDeuda);
        // limpiar form
        e.target.formRazon.value ="";
        e.target.formDescripcion.value = "";
        e.target.formMonto.value = "";
        e.target.formAcreedor.value = "";
        e.target.formCorreo.value = "";
    }
    const handleChange = (e) => {
        setDate(e.target.value);
    };
    if (!open) return null;
    return (
        <div className="card-img-overlay">
            <div className="modal-content">
                <div className="modalRight">
                    <p className="closeBtn" onClick={onClose}>
                        X
                    </p>
                </div>
                <Form onSubmit={añadirDeuda}>
                    <Row className="mb-5">
                        <Form.Group className="mb-3">
                            <Form.Label>Razón de la deuda</Form.Label>
                            <Form.Control type="text" placeholder="Razón de la deuda" id="formRazon"/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control type="text" placeholder="Descripción" id="formDescripcion"/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Col>
                                <Form.Label>Monto</Form.Label>
                                <Form.Control type="text" placeholder="Monto" id="formMonto"/>
                            </Col>
                            <Col>
                                <Form.Label>Fecha máxima</Form.Label>
                                <input
                                    type="date"
                                    onChange={handleChange}
                                    ref={dateInputRef}
                                    id="formFecha"
                                    name="formFecha"
                                    defaultValue={date}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Acreedor</Form.Label>
                            <Form.Control type="text" placeholder="Nombre del acreedor" id="formAcreedor"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="text" placeholder="E-mail" id="formCorreo"/>
                        </Form.Group>

                        <Button type="submit"> Añadir meta</Button>

                    </Row>
                </Form>
                <hr />
            </div>

        </div>
    );
};

export default ArgegarDeuda;
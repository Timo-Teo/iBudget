import React, {useEffect, useState} from "react";
import { Form, Col, Row, Button } from "react-bootstrap";

import firebaseApp from "../credenciales";
import {getFirestore, updateDoc, doc, getDoc} from "firebase/firestore";
const firestore = getFirestore(firebaseApp);
const AgregarMontoDeuda = ({correoUsuario, setArrayDeudas, deuda,arrayDeudas, open, onClose }) => {
    var [arrayDeuda, setArrayDeuda] = useState([])
    async function eliminarDeuda(idDeudaAEliminar) {
        // crear nuevo array de tareas
        const nvoArrayDeuda = arrayDeudas.filter(
            (objetoDeuda) => objetoDeuda.id != idDeudaAEliminar
        );
        // actualizar base de datos
        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docuRef, { deudas: [...nvoArrayDeuda] });
        //actualizar state
        arrayDeuda = nvoArrayDeuda;
    }

    async function update(e) {
        await eliminarDeuda(deuda.id)
        e.preventDefault();
        const monto = e.target.formMonto.value;
        const montoPagado = parseFloat(deuda.montoPagado)+parseFloat(monto)
        // crear nuevo array de tareas
        const nvoArrayDeuda = [
            ...arrayDeuda,
            {
                id: +new Date(),
                razon: deuda.razon,
                fecha: deuda.fecha,
                descripcion: deuda.descripcion,
                monto: deuda.monto,
                acreedor:deuda.acreedor,
                email:deuda.email,
                montoPorPagar: (parseFloat(deuda.monto)-montoPagado),
                montoPagado: montoPagado,
            },
        ];
        // actualizar base de datos
        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docuRef, { deudas: [...nvoArrayDeuda] });
        setArrayDeudas(nvoArrayDeuda)
        // limpiar form
        e.target.formMonto.value = "";
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
                <Form onSubmit={update}>
                    <Row className="mb-5">
                        <Form.Group className="mb-3">
                            <Form.Label>Monto</Form.Label>
                            <Form.Control type="text" placeholder="Monto" id="formMonto"/>
                        </Form.Group>

                        <Button type="submit"> Añadir monto</Button>

                    </Row>
                </Form>
                <hr />
            </div>

        </div>
    );
};

export default AgregarMontoDeuda;
import React, {useEffect, useState} from "react";
import { Form, Col, Row, Button } from "react-bootstrap";

import firebaseApp from "../credenciales";
import {getFirestore, updateDoc, doc, getDoc} from "firebase/firestore";
const firestore = getFirestore(firebaseApp);
const AgregarMonto = ({correoUsuario, setArrayMonto, meta,arrayMonto, open, onClose }) => {

    var [arrayMetas, setArrayMetas] = useState([])
    async function eliminarMeta(idMetaAEliminar) {
        // crear nuevo array de tareas
        const nvoArrayMeta = arrayMonto.filter(
            (objetoMeta) => objetoMeta.id != idMetaAEliminar
        );
        // actualizar base de datos
        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docuRef, { metas: [...nvoArrayMeta] });

        //actualizar state
        arrayMetas = nvoArrayMeta;
    }

    async function update(e) {
        await eliminarMeta(meta.id)
        e.preventDefault();
        const monto = e.target.formMonto.value;
        const montoPagado = parseFloat(meta.montoPagado)+parseFloat(monto)
        // crear nuevo array de tareas
        const nvoArrayMeta = [
            ...arrayMetas,
            {
                id: +new Date(),
                descripcion: meta.descripcion,
                monto: meta.monto,
                montoPorPagar: (parseFloat(meta.monto)-montoPagado),
                montoPagado: montoPagado,
            },
        ];
        // actualizar base de datos
        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docuRef, { metas: [...nvoArrayMeta] });
        setArrayMonto(nvoArrayMeta)
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

export default AgregarMonto;
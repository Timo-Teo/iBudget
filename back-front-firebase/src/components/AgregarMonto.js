import React, {useEffect, useState} from "react";
import { Form, Col, Row, Button } from "react-bootstrap";

import firebaseApp from "../credenciales";
import {getFirestore, updateDoc, doc, getDoc} from "firebase/firestore";
import {forEach} from "react-bootstrap/ElementChildren";
const firestore = getFirestore(firebaseApp);
const AgregarMonto = ({correoUsuario, setArrayMonto, meta,arrayMonto,montoId, open, onClose }) => {

    const [arrayMetas, setArrayMetas] = useState([])
    console.log("id", arrayMonto, meta.id)
    async function eliminarMeta(idMetaAEliminar) {
        // crear nuevo array de tareas
        const nvoArrayMeta = arrayMonto.filter(
            (objetoMeta) => objetoMeta.id != idMetaAEliminar
        );
        console.log("q",nvoArrayMeta)
        // actualizar base de datos
        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docuRef, { metas: [...nvoArrayMeta] });
        //actualizar state
        setArrayMetas(nvoArrayMeta);
    }

    async function update(e) {
        eliminarMeta(meta.id)
        e.preventDefault();
        const monto = e.target.formMonto.value;
        const montoPagado = parseInt(meta.montoPagado)+parseInt(monto)
        // crear nuevo array de tareas
        const nvoArrayMeta = [
            ...arrayMetas,
            {
                id: meta.id,
                descripcion: meta.descripcion,
                monto: meta.monto,
                montoPorPagar: (parseInt(meta.monto)-montoPagado),
                montoPagado: montoPagado,
            },
        ];
        // actualizar base de datos
        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docuRef, { metas: [...nvoArrayMeta] });
        //actualizar estado
        //setArrayMonto(nvoArrayMeta);
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
                            <Form.Label>Nombre de la meta</Form.Label>
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
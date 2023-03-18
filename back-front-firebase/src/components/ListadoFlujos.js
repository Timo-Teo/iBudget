import React from "react";
import { Stack, Container, Row, Col, Button } from "react-bootstrap";

import firebaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
const firestore = getFirestore(firebaseApp);

const ListadoFlujos = ({ arrayIngresos, arrayEgresos }) => {
    return (
        <Container>
            <Stack>
                <h1>Mis Flujos</h1>
                <div>
                    <Row >
                        <Col>Categoria</Col>
                        <Col>Fecha</Col>
                        <Col>Monto</Col>
                    </Row>
                    <hr />
                </div>
                {arrayIngresos.map((objetoIngreso) => {

                    return (
                        <div key={objetoIngreso.id}>
                            <Row >
                                <Col>{objetoIngreso.categoria}</Col>
                                <Col>{objetoIngreso.fecha}</Col>
                                <Col>{objetoIngreso.monto}</Col>
                            </Row>
                            <hr />
                        </div>
                    );
                })}
                {arrayEgresos.map((objetoEgreso) => {

                    return (
                        <div key={objetoEgreso.id}>
                            <Row >
                                <Col>{objetoEgreso.categoria}</Col>
                                <Col>{objetoEgreso.fecha}</Col>
                                <Col>{objetoEgreso.monto}</Col>
                            </Row>
                            <hr />
                        </div>
                    );
                })}
            </Stack>
        </Container>
    );
};

export default ListadoFlujos;
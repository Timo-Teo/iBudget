import React from "react";
import { Stack, Container, Row, Col, Button } from "react-bootstrap";

import firebaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import {faCircleMinus, faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import "../styles/styles.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const firestore = getFirestore(firebaseApp);

const ListadoFlujos = ({ arrayIngresos, arrayEgresos }) => {
    return (
        <Container>
            <Stack>
                <h3>Mis Flujos</h3>
                <div className="cajaSombra">
                    <div>
                        <Row >
                            <Col></Col>
                            <Col className="center">Categoria</Col>
                            <Col className="center">Fecha</Col>
                            <Col className="center">Monto</Col>
                        </Row>
                        <hr />
                    </div>
                    {arrayIngresos.map((objetoIngreso) => {

                        return (
                            <div key={objetoIngreso.id}>
                                <Row >
                                    <Col className="center"><FontAwesomeIcon icon={faCircleMinus} color="#FF6E6E" /></Col>
                                    <Col className="center">{objetoIngreso.categoria}</Col>
                                    <Col className="center">{objetoIngreso.fecha}</Col>
                                    <Col className="center">{objetoIngreso.monto}</Col>
                                </Row>
                                <hr />
                            </div>
                        );
                    })}
                    {arrayEgresos.map((objetoEgreso) => {

                        return (
                            <div key={objetoEgreso.id}>
                                <Row >
                                    <Col className="center"><FontAwesomeIcon icon={faCirclePlus} color="#63D1C4" /></Col>
                                    <Col className="center">{objetoEgreso.categoria}</Col>
                                    <Col className="center">{objetoEgreso.fecha}</Col>
                                    <Col className="center">{objetoEgreso.monto}</Col>
                                </Row>
                                <hr />
                            </div>
                        );
                    })}
                </div>
            </Stack>
        </Container>
    );
};

export default ListadoFlujos;
import React, {useState} from "react";
import { Stack, Container, Row, Col, Button } from "react-bootstrap";
import AgregarMontoDeuda from "./AgregarMontoDeuda";
import {faCalendarCheck, faEnvelope} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ListadoDeudas = ({ deuda,correoUsuario,arrayDeudas,setArrayDeudas}) => {
    const [agregarDeuda, setAgregarDeuda]=useState(false)
    return (
        <Container>
            <Stack>
                <div>
                    <div>
                        <Row className="textBold">{deuda.razon}</Row>
                        <Row>
                            <div className="d-inline-block "><p className="float-start textBold mb-0">Categoria:</p><p className="mb-0">{deuda.descripcion}</p></div>
                        </Row>
                    </div>
                    <hr />
                    <Row >
                        <div><p className="center">Monto a pagar</p></div>
                        <h2 className="center">${deuda.monto}</h2>
                    </Row>
                    <Row>
                        <Col className="center verde"><h4 className="subtitulo">Conseguido:{deuda.montoPagado}</h4></Col>
                        <Col className="center rojo"><h4 className="subtitulo">Por pagar: {deuda.montoPorPagar}</h4></Col>
                    </Row>
                    <Row>
                        <button className="boton bg-white text-black" onClick={()=>setAgregarDeuda(true)}>Agregar monto</button>
                    </Row>
                    <Row><Col className="center"><FontAwesomeIcon icon={faCalendarCheck}/>Fecha límite: {deuda.fecha}</Col></Row>
                    <Row className="mt-5 mb-4">
                        <Row><Col><p className="textBold float-start">Acreedor:</p> {deuda.acreedor}</Col></Row>
                        <Row><Col><FontAwesomeIcon icon={faEnvelope}/>{deuda.email}</Col></Row>
                    </Row>
                </div>
                <AgregarMontoDeuda
                    deuda={deuda}
                    arrayDeudas={arrayDeudas}
                    setArrayDeudas={setArrayDeudas}
                    correoUsuario={correoUsuario}
                    open={agregarDeuda}
                    onClose={() => setAgregarDeuda(false)} />
            </Stack>
        </Container>
    );
};

export default ListadoDeudas;
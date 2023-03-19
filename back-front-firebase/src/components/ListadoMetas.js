import React, {useState} from "react";
import { Stack, Container, Row, Col, Button } from "react-bootstrap";
import AgregarMonto from "./AgregarMonto";
import "../styles/styles.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
const ListadoMetas = ({ meta,correoUsuario,arrayMeta,setArrayMeta, }) => {
    const [agregarMonto, setAgregarMonto]=useState(false)
    return (
        <Container>
            <Stack>
                <div>
                    <div>
                        <Row>{meta.descripcion}</Row>
                    </div>
                    <hr />
                    <Row >
                        <div><p className="center">Meta a ahorrar</p></div>
                        <h2 className="center">$ {meta.monto}</h2>
                    </Row>
                    <Row>
                        <Col className="center verde"><h4 className="subtitulo">Conseguido: {meta.montoPagado}</h4></Col>
                        <Col className="center rojo"><h4 className="subtitulo">Por pagar: {meta.montoPorPagar}</h4></Col>
                    </Row>
                    <Row>
                        <div className="center mb-4 mt-4"><button className="boton bg-white text-black" onClick={()=>setAgregarMonto(true)}>
                            <div className="center"><FontAwesomeIcon icon={faCirclePlus} color="#63D1C4" className="tamañoBotonIE"/></div>
                            Agregar monto</button></div>
                    </Row>

                </div>
                <AgregarMonto
                    meta={meta}
                    arrayMonto={arrayMeta}
                    setArrayMonto={setArrayMeta}
                    correoUsuario={correoUsuario}
                    open={agregarMonto}
                    onClose={() => setAgregarMonto(false)} />
            </Stack>
        </Container>
    );
};

export default ListadoMetas;
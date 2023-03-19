import React, {useState} from "react";
import { Stack, Container, Row, Col, Button } from "react-bootstrap";
import AgregarMonto from "./AgregarMonto";
import "../styles/styles.css"
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
                        <button className="boton bg-white text-black" onClick={()=>setAgregarMonto(true)}>Agregar monto</button>
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
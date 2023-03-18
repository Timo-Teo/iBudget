import React, {useState} from "react";
import { Stack, Container, Row, Col, Button } from "react-bootstrap";
import AgregarMonto from "./AgregarMonto";

const ListadoMetas = ({ meta,correoUsuario,arrayMeta,setArrayMeta, }) => {
    const [agregarMonto, setAgregarMonto]=useState(false)
    return (
        <Container>
            <Stack>
                <div>
                    <Row>{meta.descripcion}</Row>
                    <Row >
                        <Col>{meta.monto}</Col>
                    </Row>
                    <Row>
                        <Col>Conseguido: {meta.montoPagado}</Col>
                        <Col>Por pagar: {meta.montoPorPagar}</Col>
                    </Row>
                    <Row>
                        <Button onClick={()=>setAgregarMonto(true)}>Agregar monto</Button>
                    </Row>
                <hr />
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
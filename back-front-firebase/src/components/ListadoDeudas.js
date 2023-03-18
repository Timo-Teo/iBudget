import React, {useState} from "react";
import { Stack, Container, Row, Col, Button } from "react-bootstrap";
import AgregarMontoDeuda from "./AgregarMontoDeuda";

const ListadoDeudas = ({ deuda,correoUsuario,arrayDeudas,setArrayDeudas}) => {
    const [agregarDeuda, setAgregarDeuda]=useState(false)
    return (
        <Container>
            <Stack>
                <div>
                    <Row>{deuda.razon}</Row>
                    <Row>{deuda.descripcion}</Row>
                    <Row >
                        <Col>{deuda.monto}</Col>
                    </Row>
                    <Row>
                        <Col>Conseguido: {deuda.montoPagado}</Col>
                        <Col>Por pagar: {deuda.montoPorPagar}</Col>
                    </Row>
                    <Row>
                        <Button onClick={()=>setAgregarDeuda(true)}>Agregar monto</Button>
                    </Row>
                    <Row>Fecha límite: {deuda.fecha}</Row>
                    <Row>Acreedor: {deuda.acreedor}</Row>
                    <Row>{deuda.email}</Row>
                    <hr />
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
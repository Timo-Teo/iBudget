import React from "react";
import { Stack, Container, Row, Col, Button } from "react-bootstrap";

import firebaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
const firestore = getFirestore(firebaseApp);

const ListadoCategorias = ({ arrayCategorias, correoUsuario, setArrayCategoras }) => {
    async function eliminarTarea(idTareaAEliminar) {
        // crear nuevo array de tareas
        const nvoArrayTareas = arrayCategorias.filter(
            (objetoTarea) => objetoTarea.id !== idTareaAEliminar
        );
        // actualizar base de datos
        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docuRef, { categorias: [...nvoArrayTareas] });
        //actualizar state
        setArrayCategoras(nvoArrayTareas);
    }
    return (
        <Container>
            <Stack>
                {arrayCategorias.map((objetoTarea) => {
                    return (
                        <div key={objetoTarea.id}>
                            <Row key={objetoTarea.id}>
                                <Col>{objetoTarea.descripcion}</Col>
                                <Col>
                                    <Button
                                        variant="danger"
                                        onClick={() => eliminarTarea(objetoTarea.id)}
                                    >
                                        Eliminar Tarea
                                    </Button>
                                </Col>
                            </Row>
                            <hr />
                        </div>
                    );
                })}
            </Stack>
        </Container>
    );
};

export default ListadoCategorias;
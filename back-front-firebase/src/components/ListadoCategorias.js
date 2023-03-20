import React from "react";
import { Stack, Container, Row, Col, Button } from "react-bootstrap";
import firebaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import "../styles/styles.css"
const firestore = getFirestore(firebaseApp);

const ListadoCategorias = ({ arrayCategorias, correoUsuario, setArrayCategorias }) => {
    async function eliminarTarea(idTareaAEliminar) {
        // crear nuevo array de tareas
        const nvoArrayTareas = arrayCategorias.filter(
            (objetoTarea) => objetoTarea.id !== idTareaAEliminar
        );
        // actualizar base de datos
        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docuRef, { categorias: [...nvoArrayTareas] });
        //actualizar state
        setArrayCategorias(nvoArrayTareas);
    }
    return (
        <Container>
            <Row>
                <Col>
                    <p className="center">Mis categorías de ingresos</p>
                    <div className="cajaSombra">
                        {arrayCategorias.map((objetoTarea) => {
                            if(objetoTarea.tipoCategoria == "Ingreso"){
                                return (
                                    <div key={objetoTarea.id}>
                                        <Row key={objetoTarea.id}>
                                            <Col className="center">{objetoTarea.descripcion}</Col>
                                            <Col>
                                                <button className="boton text-danger bg-white"

                                                        onClick={() => eliminarTarea(objetoTarea.id)}
                                                >
                                                    Eliminar Categorias
                                                </button>
                                            </Col>
                                        </Row>
                                        <hr />
                                    </div>
                                );
                            }
                        })}
                    </div>

                </Col>
                <Col>
                    <p className="center">Mis categorías de egresos</p>
                    <div className="cajaSombra">
                        {arrayCategorias.map((objetoTarea) => {
                            if(objetoTarea.tipoCategoria == "Egreso"){
                                return (
                                    <div key={objetoTarea.id}>
                                        <Row key={objetoTarea.id}>
                                            <Col className="center">{objetoTarea.descripcion}</Col>
                                            <Col>
                                                <button className="boton text-danger bg-white"
                                                        onClick={() => eliminarTarea(objetoTarea.id)}
                                                >
                                                    Eliminar Tarea
                                                </button>
                                            </Col>
                                        </Row>
                                        <hr />
                                    </div>
                                );
                            }
                        })}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ListadoCategorias;
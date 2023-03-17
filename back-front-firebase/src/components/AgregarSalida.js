import React, {useState} from "react";
import { Container, Form, Col, Row, Button } from "react-bootstrap";

import firebaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const ArgegarSalida = ({arrayCategoria ,correoUsuario, setArraySalida, arraySalida, open, onClose }) => {
    const [categoria, setCategoria] = useState("")
    async function añadirSalida(e) {
        e.preventDefault();
        const categoria = e.target.categoria.value;
        const monto = e.target.formMonto.value;
        // crear nuevo array de tareas
        const nvoArrayTareas = [
            ...arraySalida,
            {
                id: +new Date(),
                categoria: categoria,
                monto: monto,
            },
        ];
        // actualizar base de datos
        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docuRef, { egresos: [...nvoArrayTareas] });
        //actualizar estado
        setArraySalida(nvoArrayTareas);
        // limpiar form
        e.target.categoria.value = "";
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
                <Form onSubmit={añadirSalida}>
                    <Row className="mb-5">
                        <Col>
                            <div className="">
                                {arrayCategoria.length ?(
                                    <select id="categoria" value={categoria} name="caegoria" onChange={(event)=>setCategoria(event.target.value)} className="form-control border-2 border-black">
                                        <option>Selecciona una categoria</option>
                                        {arrayCategoria.filter(categoria=>categoria.tipoCategoria==="Egreso").map( c => (
                                            <option key={c.id} value={c.descripcion}>{c.descripcion}</option>
                                        ))}
                                    </select>
                                ):(<p> No existe CATEGORIAS</p>)}

                            </div>
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Monto"
                                id="formMonto"
                            />
                        </Col>
                        <Col>
                            <Button type="submit"> Agregar Salida</Button>
                        </Col>
                    </Row>
                </Form>
                <hr />
            </div>

        </div>
    );
};

export default ArgegarSalida;
import React, {useState} from "react";
import { Container, Form, Col, Row, Button } from "react-bootstrap";

import firebaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Home from "./Home";
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const ArgegarIngreso = ({ arrayCategoria, correoUsuario, setIngreso,saldoTotal, setSaldoTotal,setArrayIngresos, arrayIngreso, open, onClose }) => {
    const [categoria, setCategoria] = useState("")
    var [saldoIngresos,setSaldoIngreso] = useState(0.0);
    var fecha = new Date()
    fecha = fecha.getDate()+"-"+fecha.getMonth()+"-"+fecha.getFullYear()

    async function añadirIngreso(e) {
        e.preventDefault();
        const categoria = e.target.categoria.value;
        const monto = e.target.formMonto.value;
        // crear nuevo array de tareas
        const nvoArrayIngreso = [
            ...arrayIngreso,
            {
                id: +new Date(),
                categoria: categoria,
                monto: monto,
                fecha: fecha,

            },
        ];
        // actualizar base de datos
        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docuRef, { ingresos: [...nvoArrayIngreso] });
        //actualizar estado
        setArrayIngresos(nvoArrayIngreso);
        //actualizar ingresos
        nvoArrayIngreso.map(ingreso=>(
            saldoIngresos += parseFloat(ingreso.monto)
        ))
        setIngreso(parseFloat(saldoIngresos))
        //actualizar saldo total
        setSaldoTotal(parseFloat(saldoTotal)+parseFloat(monto))
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
                <Form onSubmit={añadirIngreso}>
                    <Row className="mb-5">
                        <Col>
                            <div className="">
                                {arrayCategoria.length ?(
                                    <select id="categoria" value={categoria} name="caegoria" onChange={(event)=>setCategoria(event.target.value)} className="form-control border-2 border-black">
                                        <option>Selecciona una categoria</option>
                                        {arrayCategoria.filter(categoria=>categoria.tipoCategoria==="Ingreso").map( c => (
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
                            <Button type="submit"> Agregar Monto</Button>
                        </Col>
                    </Row>
                </Form>
                <hr />
            </div>

        </div>
    );
};

export default ArgegarIngreso;
import React, { useState, useEffect } from "react";

import firebaseApp from "../credenciales";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

import {Container, Button, Col} from "react-bootstrap";

import ListadoCategorias from "./ListadoCategorias";
import AgregarCategoria from "./AgregarCategoria";
import ListadoFlujos from "./ListadoFlujos";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const Configuracion = ({ correoUsuario, arrayIngreso, arraySalida }) => {
    const [arrayCategorias, setArrayCategorias] = useState(null);

    const [agregarCategoria, setAgregarCategoria] = useState(false);
    async function buscarCategoriaDocumentOrCrearDocumento(idDocumento) {
        //crear referencia al documento
        const docuRef = doc(firestore, `usuarios/${idDocumento}`);
        // buscar documento
        const consulta = await getDoc(docuRef);
        // si sí existe
        const infoDocu = consulta.data();
        return [infoDocu.categorias, infoDocu.ingresos, infoDocu.egresos];
    }

    useEffect(() => {
        async function fetchTareas() {
            const [categoriasFetchada, ingresosFetchada, egresosFetchada] = await buscarCategoriaDocumentOrCrearDocumento(
                correoUsuario
            );
            setArrayCategorias(categoriasFetchada);
        }

        fetchTareas();
    }, []);
    return(
        <div className="contenedorOpciones bg-white">
            <h2><FontAwesomeIcon icon={faGear}/> Configuración</h2>
            <hr/>
            <h3>Mis categorías</h3>
            {arrayCategorias ? (
                <ListadoCategorias
                    arrayCategorias={arrayCategorias}
                    setArrayCategorias={setArrayCategorias}
                    correoUsuario={correoUsuario}
                />
            ) : null}
            <button className="boton bg-white" onClick={()=>setAgregarCategoria(true)}>Agregar</button>
            <AgregarCategoria
                arrayCategorias={arrayCategorias}
                setArrayCategorias={setArrayCategorias}
                correoUsuario={correoUsuario}
                open={agregarCategoria}
                onClose={() => setAgregarCategoria(false)} />
            <hr/>
            <ListadoFlujos
                arrayIngresos={arrayIngreso}
                arrayEgresos={arraySalida}
            />

        </div>
    )
}
export default Configuracion;
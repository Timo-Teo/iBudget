import React, { useState, useEffect } from "react";

import firebaseApp from "../credenciales";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

import { Container, Button } from "react-bootstrap";

import ListadoCategorias from "./ListadoCategorias";
import AgregarCategoria from "./AgregarCategoria";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const Configuracion = ({ correoUsuario }) => {

    const [arrayCategorias, setArrayCategorias] = useState(null);
    const fakeData = [
    ];
    const [agregarCategoria, setAgregarCategoria] = useState(false);
    async function buscarCategoriaDocumentOrCrearDocumento(idDocumento) {
        //crear referencia al documento
        const docuRef = doc(firestore, `usuarios/${idDocumento}`);
        // buscar documento
        const consulta = await getDoc(docuRef);
        // revisar si existe
        if (consulta.exists()) {
            // si sí existe
            const infoDocu = consulta.data();
            return infoDocu.categorias;
        } else {
            // si no existe
            await setDoc(docuRef, { categorias: [...fakeData] });
            const consulta = await getDoc(docuRef);
            const infoDocu = consulta.data();
            return infoDocu.categorias;
        }
    }

    useEffect(() => {
        async function fetchTareas() {
            const tareasFetchadas = await buscarCategoriaDocumentOrCrearDocumento(
                correoUsuario
            );
            setArrayCategorias(tareasFetchadas);
        }

        fetchTareas();
    }, []);
    return(
        <Container>
            {arrayCategorias ? (
                <ListadoCategorias
                    arrayCategorias={arrayCategorias}
                    setArrayCategorias={setArrayCategorias}
                    correoUsuario={correoUsuario}
                />
            ) : null}
            <Button onClick={()=>setAgregarCategoria(true)}>Agregar</Button>
            <AgregarCategoria
                arrayCategorias={arrayCategorias}
                setArrayCategorias={setArrayCategorias}
                correoUsuario={correoUsuario}
                open={agregarCategoria}
                onClose={() => setAgregarCategoria(false)} />

        </Container>
    )
}
export default Configuracion;
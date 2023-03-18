import React, { useState, useEffect } from "react";
import firebaseApp from "../credenciales";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { Container, Button } from "react-bootstrap";
import Configuracion from "./Configuracion";
import AgregarIngreso from "./AgregarIngreso";
import AgregarSalida from "./AgregarSalida";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Home = ({ correoUsuario }) => {
  const [arrayCategorias, setArrayCategorias] = useState(null);
  const [arrayIngresos, setArrayIngresos] = useState(null);
  var [arraySalida, setArraySalida] = useState(null);
  const [agregarIngreso, setAgregarIngreso] = useState(false);
  const [agregarSalida, setAgregarSalida] = useState(false);
  var [saldoIngresos,setIngresos] = useState(0.0);
  var [saldoEgresos,setEgresos] = useState(0.0);
  const [saldoTotal, setSaldoTotal] = useState(0.0)
  const [configuracion, setConfiguracion] = useState(false);
  const [miBilletera, setMiBilletera] = useState(true);
  const fakeData = [
  ];


    async function buscarCategoriaDocumentOrCrearDocumento(idDocumento) {
        //crear referencia al documento
        const docuRef = doc(firestore, `usuarios/${idDocumento}`);
        // buscar documento
        const consulta = await getDoc(docuRef);
        // revisar si existe
        if (consulta.exists()) {
            // si sí existe
            const infoDocu = consulta.data();
            return [infoDocu.categorias, infoDocu.ingresos, infoDocu.egresos];
        } else {
            // si no existe
            await setDoc(docuRef, { categorias: [...fakeData], ingresos:[...fakeData], egresos:[...fakeData] });
            const consulta = await getDoc(docuRef);
            const infoDocu = consulta.data();
            return [infoDocu.categorias, infoDocu.ingresos, infoDocu.egresos];
        }
    }

  useEffect(() => {
    async function fetchTareas() {
      const [categoriasFetchada, ingresosFetchada, egresosFetchada] = await buscarCategoriaDocumentOrCrearDocumento(
        correoUsuario
      );
      setArrayCategorias(categoriasFetchada);
      setArraySalida(egresosFetchada);
      setArrayIngresos(ingresosFetchada)
        ingresosFetchada.map(ingreso=>(
            saldoIngresos += parseFloat(ingreso.monto)

        ))
        setIngresos(saldoIngresos)
        egresosFetchada.map(salida=>(
            saldoEgresos-=parseFloat(salida.monto)

        ))
        setEgresos(saldoEgresos)
        setSaldoTotal(saldoIngresos+saldoEgresos)
        console.log("c", arrayCategorias)
        console.log("i",arrayIngresos)
        console.log("arraySalida",arraySalida)
    }

    fetchTareas();
  }, []);

  return (
    <Container>

      <h4>hola, sesión iniciada</h4>
      <Button onClick={()=>(setConfiguracion(true),setMiBilletera(false))}>Configuración</Button>
        <Button onClick={()=>(setMiBilletera(true),setConfiguracion(false))}>Mi billetera</Button>
        <Button onClick={() => signOut(auth)}>Cerrar sesión</Button>

      <hr />
        {configuracion?(
            <Configuracion
                correoUsuario={correoUsuario}
                arrayIngreso={arrayIngresos}
                arraySalida={arraySalida}
            />
        ):(
            <>
                {miBilletera?(
                    <div>
                        <h1>{saldoTotal}</h1>

                        <h1>Ingresos: {saldoIngresos}</h1>
                        <h1>Egresos: {saldoEgresos}</h1>
                        <Button onClick={()=>setAgregarIngreso(true)}>Ingreso de dinero</Button>
                        <Button onClick={()=>setAgregarSalida(true)}>Salida de dinero</Button>
                        <AgregarIngreso
                            arrayCategoria={arrayCategorias}
                            arrayIngreso={arrayIngresos}
                            setArrayIngresos={setArrayIngresos}
                            correoUsuario={correoUsuario}
                            open={agregarIngreso}
                            onClose={() => setAgregarIngreso(false)} />
                        <AgregarSalida
                            arrayCategoria = {arrayCategorias}
                            arraySalida={arraySalida}
                            setArraySalida={setArraySalida}
                            correoUsuario={correoUsuario}
                            open={agregarSalida}
                            onClose={() => setAgregarSalida(false)} />
                    </div>
                ):(
                    <></>
                )}
            </>
        )}

    </Container>
  );
};

export default Home;

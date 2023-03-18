import React, { useState, useEffect } from "react";
import firebaseApp from "../credenciales";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { Container, Button, Row, Col } from "react-bootstrap";
import Configuracion from "./Configuracion";
import AgregarIngreso from "./AgregarIngreso";
import AgregarSalida from "./AgregarSalida";
import AgregarMeta from "./AgregarMeta";
import ListadoMetas from "./ListadoMetas";
import ListadoDeudas from "./ListadoDeudas";
import AgregarDeuda from "./AgregarDeuda";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Home = ({ correoUsuario }) => {
  const [arrayCategorias, setArrayCategorias] = useState([]);
  const [arrayIngresos, setArrayIngresos] = useState([]);
  const [arraySalida, setArraySalida] = useState([]);
  const [arrayMetas, setArrayMetas] = useState([]);
  const [arrayDeudas, setArrayDeudas] = useState(null);
  const [agregarIngreso, setAgregarIngreso] = useState(false);
  const [agregarSalida, setAgregarSalida] = useState(false);
  var [saldoIngresos,setIngresos] = useState(0.0);
  var [saldoEgresos,setEgresos] = useState(0.0);
  const [saldoTotal, setSaldoTotal] = useState(0.0)
  const [configuracion, setConfiguracion] = useState(false);
  const [miBilletera, setMiBilletera] = useState(true);
  const [agregarMeta, setAgregarMeta] = useState(false)
  const [agregarDeuda, setAgregarDeuda] = useState(false);

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
            return [infoDocu.categorias, infoDocu.ingresos, infoDocu.egresos, infoDocu.metas, infoDocu.deudas];
        } else {
            // si no existe
            await setDoc(docuRef, { categorias: [...fakeData], ingresos:[...fakeData], egresos:[...fakeData], metas:[...fakeData], deudas:[...fakeData]});
            const consulta = await getDoc(docuRef);
            const infoDocu = consulta.data();
            return [infoDocu.categorias, infoDocu.ingresos, infoDocu.egresos, infoDocu.metas, infoDocu.deudas];
        }
    }

  useEffect(() => {
    async function fetchTareas() {
      const [categoriasFetchada, ingresosFetchada, egresosFetchada, metasFetchada, deudasFetchadas] = await buscarCategoriaDocumentOrCrearDocumento(
        correoUsuario
      );
      setArrayCategorias(categoriasFetchada);
      setArraySalida(egresosFetchada);
      setArrayIngresos(ingresosFetchada);
      setArrayMetas(metasFetchada);
      setArrayDeudas(deudasFetchadas);
        ingresosFetchada.map(ingreso=>(
            saldoIngresos += parseFloat(ingreso.monto)

        ))
        setIngresos(saldoIngresos)
        egresosFetchada.map(salida=>(
            saldoEgresos-=parseFloat(salida.monto)

        ))
        setEgresos(saldoEgresos)
        setSaldoTotal(saldoIngresos+saldoEgresos)
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
                        <Row>
                            <div>
                                <h1>Regla 50/30/20</h1>
                                <Row>
                                    <Col><h2>Necesidades básicas:{saldoTotal*0.5}</h2></Col>
                                    <Col><h2>Para gastos prescindibles:{saldoTotal*0.3}</h2></Col>
                                    <Col><h2>Para el ahorro o deuda:{saldoTotal*0.2}</h2></Col>
                                </Row>
                            </div>
                        </Row>
                        <Row>
                            <Row>
                                <Col><h1>Tus metas de ahorro</h1></Col>
                                <Col>
                                    <Button onClick={()=>setAgregarMeta(true)}>Agregar</Button>
                                </Col>
                            </Row>
                            <Row>
                                {arrayMetas?(
                                    <div>
                                        {arrayMetas.map((objetoMeta) => {
                                            return(
                                                <ListadoMetas
                                                    key={objetoMeta.id}
                                                    meta={objetoMeta}
                                                    correoUsuario = {correoUsuario}
                                                    arrayMeta={arrayMetas}
                                                    setArrayMeta={setArrayMetas}
                                                />
                                            );
                                        })}
                                    </div>
                                ):(<p>No existen metas</p>)}
                            </Row>
                            <AgregarMeta
                                arrayMeta={arrayMetas}
                                setArrayMeta={setArrayMetas}
                                correoUsuario={correoUsuario}
                                open={agregarMeta}
                                onClose={() => setAgregarMeta(false)}
                            />
                        </Row>
                        <Row>
                            <Row>
                                <Col><h1>Deudas por pagar</h1></Col>
                                <Col>
                                    <Button onClick={()=>setAgregarDeuda(true)}>Agregar</Button>
                                </Col>
                            </Row>
                            <Row>
                                {arrayDeudas?(
                                    <div>
                                        {arrayDeudas.map((objetoDeuda) => {
                                            return(
                                                <ListadoDeudas
                                                    key={objetoDeuda.id}
                                                    deuda={objetoDeuda}
                                                    correoUsuario = {correoUsuario}
                                                    arrayDeudas={arrayDeudas}
                                                    setArrayDeudas={setArrayDeudas}
                                                />
                                            );
                                        })}
                                    </div>
                                ):(<p>No existen deudas</p>)}
                            </Row>
                            <AgregarDeuda
                                arrayDeudas={arrayDeudas}
                                setArrayDeudas={setArrayDeudas}
                                correoUsuario={correoUsuario}
                                open={agregarDeuda}
                                onClose={() => setAgregarDeuda(false)}
                            />
                        </Row>


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

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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear, faWallet, faUser, faCalendarCheck, faClockRotateLeft, faCirclePlus} from "@fortawesome/free-solid-svg-icons"
import "../styles/styles.css"

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Home = ({ correoUsuario }) => {
  const [arrayCategorias, setArrayCategorias] = useState([]);
  const [arrayIngresos, setArrayIngresos] = useState([]);
  const [arraySalida, setArraySalida] = useState([]);
  const [arrayMetas, setArrayMetas] = useState([]);
  const [arrayDeudas, setArrayDeudas] = useState([]);
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
    <>
        <Row>
            <div className="contenedorMenu">
                <div></div>
                <Col className="menu bg-white rounded pt-3 pb-3">
                    <div className="menu">
                        <div className="center"><FontAwesomeIcon icon={faUser} color="#2B478B" /></div>
                        <div><button className="boton bg-white" onClick={() => signOut(auth)}>Cerrar sesión</button></div>
                    </div>
                    <div className="menu">
                        <div className="center"><FontAwesomeIcon icon={faWallet} color="#2B478B" /></div>
                        <div><button className="boton bg-white" onClick={()=>(setMiBilletera(true),setConfiguracion(false))}>Mi billetera</button></div>
                    </div>
                    <div className="menu">
                        <div className="center"><FontAwesomeIcon icon={faGear} color="#2B478B" /></div>
                        <div><button className="boton bg-white" onClick={()=>(setConfiguracion(true),setMiBilletera(false))}>Configuración</button></div>
                    </div>
                </Col>
            </div>
        </Row>
        {configuracion?(
            <Configuracion
                correoUsuario={correoUsuario}
                arrayIngreso={arrayIngresos}
                arraySalida={arraySalida}
            />
        ):(
            <>
                {miBilletera?(
                    <>
                        <div className="contenedorOpciones">
                            <h2>Mi billetera</h2>
                            <div className="cajaSombra">
                                <Row className="p-3">
                                    <Col className="center"><FontAwesomeIcon icon={faCalendarCheck}/> Marzo 2022</Col>
                                    <Col className="center">Tu saldo actual</Col>
                                    <Col className="center"><FontAwesomeIcon icon={faClockRotateLeft}/></Col>
                                </Row>
                                <Row className="p-2">
                                    <h1 className="center">$  {saldoTotal}</h1>
                                </Row>
                                <Row className="p-4">
                                    <Col className="center verde">Ingresos: +{saldoIngresos}</Col>
                                    <Col className="center rojo">Egresos: {saldoEgresos}</Col>
                                </Row>
                            </div>
                            <Button onClick={()=>setAgregarIngreso(true)}>Ingreso de dinero</Button>
                            <Button onClick={()=>setAgregarSalida(true)}>Salida de dinero</Button>
                            <AgregarIngreso
                                arrayCategoria={arrayCategorias}
                                arrayIngreso={arrayIngresos}
                                setArrayIngresos={setArrayIngresos}
                                saldoTotal={saldoTotal}
                                setSaldoTotal={setSaldoTotal}
                                correoUsuario={correoUsuario}
                                setIngreso={setIngresos}
                                open={agregarIngreso}
                                onClose={() => setAgregarIngreso(false)} />
                            <AgregarSalida
                                arrayCategoria = {arrayCategorias}
                                arraySalida={arraySalida}
                                setArraySalida={setArraySalida}
                                saldoTotal={saldoTotal}
                                setSaldoTotal={setSaldoTotal}
                                setEgreso={setEgresos}
                                correoUsuario={correoUsuario}
                                open={agregarSalida}
                                onClose={() => setAgregarSalida(false)} />
                        </div>
                        <div className="contenedorOpciones">
                            <Row>
                                <div>
                                    <h2>Regla 50/30/20</h2>
                                    <p>La regla 50 30 20 simplifica la administración financiera dividiendo tus ingresos netos en tres categorías de gasto: necesidades básicas, gastos prescindibles y ahorro o deuda.</p>
                                    <Row className="center">
                                        <Col className="cajaSombra me-5 ms-2 p-0">
                                            <div className="center mt-3 mb-3">
                                                <div className="circle rounded-circle">50%</div>
                                                <div className="d-inline-block "><p className="center mb-0 ms-3">Necesidades básicas</p></div>
                                            </div>
                                            <h2 className="center mt-5 mb-5">$ {saldoTotal*0.5}</h2>
                                        </Col>
                                        <Col className="cajaSombra me-5 p-0">
                                            <div className="center mt-3 mb-3">
                                                <div className="circle rounded-circle">30%</div>
                                                <div className="d-inline-block "><p className="center mb-0 ms-3">Para gastos prescindibles</p></div>
                                            </div>
                                            <h2 className="center mt-5 mb-5">$ {saldoTotal*0.3}</h2>
                                        </Col>
                                        <Col className="cajaSombra me-3 p-0">
                                            <div className="center mt-3 mb-3">
                                                <div className="circle rounded-circle">20%</div>
                                                <div className="d-inline-block "><p className="center mb-0 ms-3">Para el ahorro o deuda</p></div>
                                            </div>
                                            <h2 className="center mt-5 mb-5">$ {saldoTotal*0.2}</h2>
                                        </Col>
                                    </Row>
                                </div>
                            </Row>
                        </div>
                        <div className="contenedorOpciones">
                            <Row>
                                <Row>
                                    <Col><h2>Tus metas de ahorro</h2></Col>
                                    <Col>
                                        <div className="menu">
                                            <button className="boton" onClick={()=>setAgregarMeta(true)}>Agregar <FontAwesomeIcon icon={faCirclePlus}/></button>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    {arrayMetas?(
                                        <div>
                                            {arrayMetas.map((objetoMeta) => {
                                                return(
                                                    <div className="cajaSombra me-5 ms-2 float-start">
                                                        <ListadoMetas
                                                            key={objetoMeta.id}
                                                            meta={objetoMeta}
                                                            correoUsuario = {correoUsuario}
                                                            arrayMeta={arrayMetas}
                                                            setArrayMeta={setArrayMetas}
                                                        />
                                                    </div>

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
                        </div>
                        <div className="contenedorOpciones">
                            <Row>

                                <Row>
                                    <Col><h2>Deudas por pagar</h2></Col>
                                    <Col>
                                        <div className="menu">
                                            <button className="boton" onClick={()=>setAgregarDeuda(true)}>Agregar <FontAwesomeIcon icon={faCirclePlus}/></button>
                                        </div>

                                    </Col>
                                </Row>
                                <Row>
                                    {arrayDeudas?(
                                        <div>
                                            {arrayDeudas.map((objetoDeuda) => {
                                                return(
                                                    <div className="cajaSombra me-5 ms-2 center float-start">
                                                        <ListadoDeudas
                                                            key={objetoDeuda.id}
                                                            deuda={objetoDeuda}
                                                            correoUsuario = {correoUsuario}
                                                            arrayDeudas={arrayDeudas}
                                                            setArrayDeudas={setArrayDeudas}
                                                        />
                                                    </div>
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

                    </>
                ):(
                    <></>
                )}
            </>
        )}

    </>
  );
};

export default Home;
